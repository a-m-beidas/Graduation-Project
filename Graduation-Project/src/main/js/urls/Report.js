import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { Container, Card, Badge, Button, ListGroup, Collapse } from 'react-bootstrap';
import AlertExport from "./Alert";
import ReactToPdf from 'react-to-pdf';
import ReactDOM from 'react-dom';
import jwt from '../utils/JWTPayload';
import axios from 'axios';


const processReport = (report) => {
    if (report.alerts === undefined)
        return;
    report.count = { high: 0, medium: 0, low: 0 }
    report.alerts.map((alert, index) => {
        alert.date = report.date;
        if (!alert.path.startsWith(report.targetURL))
            alert.path = report.targetURL + alert.path
        ++report.count[severity[alert.severity].text]
    })
    return;
}

const severity = {
    1: {
        color: "danger",
        text: "High"
        // text: "high"
    },
    2: {
        color: "warning",
        text: "Medium"
        // text: "medium"
    },
    3: {
        color: "info",
        text: "Low"
        // text: "low"
    },
    4: {
        color: "success",
        text: "Secure"
        // text: "secure"
    }
}


function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const Report = (props) => {
    const [report, setReport] = useState(props.location.state === undefined ? {} : props.location.state.report);
    const [status, setStatus] = useState(props.location.state === undefined ? "" : { value: 200 });
    const config = {
        headers:
            { Authorization: 'Bearer ' + localStorage.getItem('bearer-token') }
    };
    if (report.targetURL === undefined) {
        axios.get('/api/report' + props.location.search, config)
            .then(response => {
                if (response.status === 200) {
                    setReport(response.data);
                    setStatus({ value: response.status });
                } else {
                    throw response;
                }
            })
            .catch(error => {
                setStatus({ value: error.response.status, text: error.response.data })
            });
    }
    const onPrint = props.onPrint !== undefined;
    const ref = React.useRef();

    const printReport = () => {
        const clone = React.cloneElement(<Report onPrint />, { location: { state: { report: report } } });
        ReactDOM.render(clone, document.getElementById("print-div"));
        ref.current = document.getElementById("print-div");
    };

    return (
        <>
            {
                status.value === undefined ? "..."
                    :
                    status.value !== 200 ?
                        <Redirect to={{ pathname: "/error", state: { message: status.text } }} />
                        :

                        <div>
                            {processReport(report)}
                            <Container style={{ paddingLeft: "0px", marginLeft: "0px" }}>
                                <div className="px-4 py-4">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h3>Test.com</h3>
                                            <h4><a href={report.targetURL}>{report.targetURL}</a></h4>
                                        </div>
                                        {
                                            onPrint ? "" :
                                                <div className="export-btn-div">
                                                    <ReactToPdf x={"12"} filename={"Report"} targetRef={ref}>
                                                        {({ toPdf }) => (
                                                            <Button className="export-btn" onClick={() => { printReport(); toPdf() }}>Export

                                                                {/* <svg width="41" height="36" viewBox="0 0 41 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M28.0368 12.885L20.4877 19.755L12.9386 12.885L10.6196 15L20.4877 24L30.3558 15L28.0368 12.885Z" fill="black" />
                                                            </svg> */}
                                                            </Button>
                                                        )}
                                                    </ReactToPdf>
                                                </div>
                                        }
                                    </div>
                                    <div className="d-flex justify-content-between px-4">
                                        <div style={{ textAlign: "center" }}>
                                            <div className="d-flex justify-content-center">
                                                <Badge className="severity-badge" pill variant="danger" >{report.count.high}</Badge>
                                            </div>
                                            High Severities
                                        </div>
                                        <div style={{ textAlign: "center" }}><div className="d-flex justify-content-center"><Badge className="severity-badge" pill variant="warning" >{report.count.medium}</Badge></div>Medium Severities</div>
                                        <div style={{ textAlign: "center" }}><div className="d-flex justify-content-center"><Badge className="severity-badge" pill variant="info" >{report.count.low}</Badge></div>Low Severities</div>
                                    </div>
                                </div>
                                {/* <ListGroup variant="flush">
                <Card.Header classNam   e="scan-header-app">
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
            </ListGroup> */}
                                {report.alerts.map((alert, index) => <Alert key={index} onPrint={onPrint} alert={alert} />)}
                                {report.alerts.length == 0 ?
                                    [<h2>No Threats Found!</h2>, <br />,
                                    <h4>Visited Urls:</h4>, <br />,
                                    report.urls.map((url, index) => <Alert key={index} onPrint={onPrint} alert={{ "path": url, "type": "Secure", "severity": 4 }} />)]
                                    : ""
                                }
                            </Container>
                            <br />
                        </div>}
        </>)
}

export const Alert = (props) => {
    const alert = props.alert;
    const [open, setOpen] = useState(false);
    const alertRef = React.useRef();
    const onPrint = props.onPrint;
    let history = useHistory();
    const viewAlert = () => {

        history.push({
            pathname: '/alert',
            state: { alert: alert }
        });
    }

    const printAlert = () => {
        const clone = React.cloneElement(<AlertExport onPrint />, { location: { state: { alert: alert } } });
        ReactDOM.render(clone, document.getElementById("print-div"));
        alertRef.current = document.getElementById("print-div");
    }

    return (
        <div ref={alertRef} className="my-2 alert-main-div-app">
            <Container fluid className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <Badge pill variant={severity[alert.severity].color}
                        className="alert-badge-app alert-badge-width responsive-font"
                        style={{ "--fontsize": "20px" }}>
                        {severity[alert.severity].text}
                    </Badge>
                </div>
                <Container className="d-flex justify-content-center text-left">
                    <div>
                        <h5 className="responsive-font" style={{ "--fontsize": "18px" }}>
                            Reflected cross site scripting
                        </h5>
                        <div className="d-flex">
                            <p className="responsive-font" style={{ "--fontsize": "14px" }}>
                                {'~' + alert.path}
                            </p>
                        </div>
                    </div>
                </Container>
                <div style={{ visibility: onPrint ? "hidden" : "visible" }}
                    className="d-flex align-items-center justify-content-between">
                    <div>
                        <Button className="alert-bottom-app" onClick={viewAlert}>
                            <p className="responsive-font" style={{ "--fontsize": "17px" }}>
                                View
                            </p>
                        </Button>
                    </div>
                    <div>
                        <ReactToPdf x={"12"} filename={"Report"} targetRef={alertRef}>
                            {({ toPdf }) => (
                                <Button className="alert-bottom-app" onClick={() => { printAlert(); toPdf() }}>
                                    <p className="responsive-font" style={{ "--fontsize": "17px" }}>
                                        Export
                                    </p>
                                </Button>
                            )}
                        </ReactToPdf>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Report