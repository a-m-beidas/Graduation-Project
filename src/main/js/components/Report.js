import React, { useState } from 'react';
import { Container, Card, Badge, Button, ListGroup, Collapse } from 'react-bootstrap';
import ReactToPdf from 'react-to-pdf';
import jwt from '../utils/JWTPayload';

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
    const [onPrint, setOnPrint] = useState(false);
    const ref = React.createRef();
    const options = {
    };

    const issuePrint = () => {
        setOnPrint(true);
    };

    const completePrint = () => {
        setOnPrint(false);
    };
    return( 
    <div>
        <Container style={{paddingLeft: "0px", marginLeft: "0px", maxWidth: 700}} fluid ref={ref}>
            <br/>
            <br/>
            <ListGroup variant="flush">
                <Card.Header className="scan-header-app">
                    <Card.Title>
                        <Badge style={{fontSize: "1.25rem"}} variant="secondary">{capitalize(props.result.type)}</Badge> Scan Report
                    </Card.Title>
                    <Card.Text>
                        <strong>Target URL: </strong>{props.result.targetURL}<br/>
                        <strong>Done by: </strong>{jwt("sub")}<br/>
                        <strong>Done in: </strong>{props.result.date}
                    </Card.Text>
                </Card.Header>
                <br/>
            </ListGroup>
            { props.result.alerts.map((alert, index) => <Alert key={index} onPrint={onPrint} alert={alert}/>) }
        </Container>
        <br/>
        <ReactToPdf x={"12"} filename={"Report"} targetRef={ref} options={options} onComplete={completePrint}>
          {({toPdf}) =>  (
            <Button onClick={ () => {issuePrint();toPdf();}}>To PDF</Button>
          )}
        </ReactToPdf>
    </div>)
}

export const Alert = (props) => {
    const [open, setOpen] = useState(false);
    const ref = React.createRef();
    const onPrint = props.onPrint;
    return(
        <div className="my-2 alert-main-div-app">
            <Container fluid className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <Badge pill variant={severity[props.alert.severity].color}
                           className="alert-badge-app alert-badge-width responsive-font"
                           style={{"--fontsize": "20px"}}>
                        {severity[props.alert.severity].text}
                    </Badge>
                </div>
                <Container className="d-flex justify-content-center text-left">
                    <div>
                        <h5 className="responsive-font" style={{"--fontsize": "18px"}}>
                            Reflected cross site scripting
                        </h5>
                        <div className="d-flex">
                            <p className="responsive-font" style={{"--fontsize": "14px"}}>
                                {'~' + props.alert.url}
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
                        <Button className="alert-bottom-app">
                            <p className="responsive-font" style={{"--fontsize": "17px"}}>
                                Export
                            </p>
                        </Button>
                    </div>
                </div>
            </Container>
            <Collapse nodeRef={ref} in={open || onPrint}>
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