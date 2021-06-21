import React, { useState} from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { Container, Card, Badge, Button, ListGroup, Collapse } from 'react-bootstrap';
import ReactToPdf from 'react-to-pdf';
import jwt from '../utils/JWTPayload';
import axios from 'axios';


const severity = {
    1: {
        color: "danger",
        text: "High"
    },
    2: {
        color: "warning",
        text: "Medium"
    },
    3: {
        color: "info",
        text: "Low"
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const Report = (props) => {
    console.log(props);
    const [report, setReport] = useState(props.location.state === undefined ? {} : props.location.state.report);
    const [status, setStatus] = useState(props.location.state === undefined ? "" : props.location.state.status);
    const config = {
        headers:
          { Authorization: 'Bearer ' + localStorage.getItem('bearer-token') }
    };
    if (report.targetURL === undefined) {
        axios.get('/api/report' + props.location.search, config)
            .then(response => {
                if (response.status === 200) {
                    setReport(response.data);
                    setStatus({value: response.status});
                } else {
                    throw response;
                }
            })
            .catch(error => {
                setStatus({value: error.response.status, text: error.response.data})
            });
    }
    const [onPrint, setOnPrint] = useState(false);
    const ref = React.useRef();
    const options = {
    };

    const issuePrint = () => {
        setOnPrint(true);
    };

    const completePrint = () => {
        setOnPrint(false);
    };
    return(
    <>
    {
    status.value === undefined ? "..."
        :
    status.value !== 200 ?
    <Redirect to={{pathname: "/error", state: { message: status.text }}} />
        :
    <div>
        <Container style={{paddingLeft: "0px", marginLeft: "0px", maxWidth: 700}} fluid ref={ref}>
            <ListGroup variant="flush">
                <Card.Header className="scan-header-app">
                    <Card.Title>
                        <Badge style={{fontSize: "1.25rem"}} variant="secondary">{capitalize(report.type)}</Badge> Scan Report
                    </Card.Title>
                    <Card.Text>
                        <strong>Target URL: </strong>{report.targetURL}<br/>
                        <strong>Done by: </strong>{jwt("sub")}<br/>
                        <strong>Done in: </strong>{report.date}
                    </Card.Text>
                </Card.Header>
                <br/>
            </ListGroup>
            { report.alerts.map((alert, index) => <Alert key={index} onPrint={onPrint} alert={alert}/>) }
        </Container>
        <br/>
        <ReactToPdf x={"12"} filename={"Report"} targetRef={ref} options={options} onComplete={completePrint}>
          {({toPdf}) =>  (
            <Button onClick={ () => {issuePrint();toPdf();}}>To PDF</Button>
          )}
        </ReactToPdf>
    </div>}
    </>)
}

export const Alert = (props) => {
    const alert = props.alert;
    const [open, setOpen] = useState(false);
    const ref = React.useRef();
    const onPrint = props.onPrint;
    let history = useHistory();
    const exportAlert = () => {
        history.push({
            pathname: '/alert',
            state: { alert: alert }
        });
    }
    return(
        <div className="my-2 alert-main-div-app">
            <Container fluid className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <Badge pill variant={severity[alert.severity].color}
                           className="alert-badge-app alert-badge-width responsive-font"
                           style={{"--fontsize": "20px"}}>
                        {severity[alert.severity].text}
                    </Badge>
                </div>
                <Container className="d-flex justify-content-center text-left">
                    <div>
                        <h5 className="responsive-font" style={{"--fontsize": "18px"}}>
                            Reflected cross site scripting
                        </h5>
                        <div className="d-flex">
                            <p className="responsive-font" style={{"--fontsize": "14px"}}>
                                {'~' + alert.url}
                            </p>
                        </div>
                    </div>
                </Container>
                <div style={{visibility: onPrint ? "hidden": "visible"}} 
                           className="d-flex align-items-center justify-content-between">
                    <div>
                        <Button className="alert-bottom-app" onClick={() => setOpen(!open)}>
                            <p className="responsive-font" style={{"--fontsize": "17px"}}>
                                View
                            </p>
                        </Button>
                    </div>
                    <div>
                        <Button className="alert-bottom-app" onClick={exportAlert}>
                            <p className="responsive-font" style={{"--fontsize": "17px"}}>
                                Export
                            </p>
                        </Button>
                    </div>
                </div>
            </Container>
            <Collapse in={open || onPrint}>
                <div ref={ref} className="alert-transition-app">
                    <br/><br/>
                    (((Information, more details about the alert)))
                    <br/><br/>
                </div>
            </Collapse>
        </div>
        )
}

export default Report