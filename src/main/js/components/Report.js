import React, { useState } from 'react';
import { Container, Card, Badge, Button, ListGroup, Collapse } from 'react-bootstrap';
import ReactToPdf from 'react-to-pdf'

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
export const Alert = (props) => {
    const [open, setOpen] = useState(false);
    const ref = React.createRef();
    const onPrint = props.onPrint;
    return(
        <div style={{borderBottom: "1.2px solid"}}>
            <Container fluid className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <Badge pill style={{width: "6rem", fontSize: "120%", borderRadius: "0.5rem", fontWeight: 400, color: "white"}} variant={severity[props.alert.severity].color}>
                        {severity[props.alert.severity].text}
                    </Badge>
                </div>
                <Container className="d-flex justify-content-center text-left">
                    <div>
                        <h5>Reflected cross site scripting</h5>
                        <div style={{marginBottom: "1rem"}} className="d-flex">
                            {'~' + props.alert.url}
                        </div>
                    </div>
                </Container>
                <Container style={{width: "40%", visibility: onPrint ? "hidden": "visible"}} 
                           className="d-flex align-items-center justify-content-between">
                    <div>
                        <Button style={{backgroundColor: 'unset', borderColor: 'white', color: 'black'}}
                                onClick={() => setOpen(!open)}>
                            View
                        </Button>
                    </div>
                    <div>
                        <Button style={{backgroundColor: 'unset', borderColor: 'white', color: 'black'}}>
                            Export
                        </Button>
                    </div>
                </Container>
            </Container>
            <Collapse nodeRef={ref} in={open || onPrint}>
                <div ref={ref} style={{textAlign: "left", paddingLeft: "1rem"}}>
                    <br/><br/>
                    (((Information, more details about the alert)))
                    <br/><br/>
                </div>
            </Collapse>
        </div>
        )
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
        <Container style={{paddingLeft: "0px", maxWidth: 700}} fluid ref={ref}>
            <br/>
            <br/>
                <ListGroup variant="flush">
                    <Card.Header style={{"backgroundColor": "1px solid rgba(0,0,0,.25)"}}>
                        <Card.Title>
                            <div className="px-2 d-flex justify-content-between">
                            {props.result.targetURL}
                            <Badge variant="secondary">{props.result.type + " scan"}</Badge>
                            </div>
                        </Card.Title>
                        <Card.Text style={{textAlign: "end"}}>
                            <br/><br/><br/>
                            Done in: {' ' + props.result.date}
                        </Card.Text>
                    </Card.Header>
                    <br/>
                    { props.result.alerts.map((alert, index) => <Alert key={index} onPrint={onPrint} alert={alert}/>) }
                </ListGroup>
        </Container>
        <br/>
        <ReactToPdf x={"12"} filename={"Report"} targetRef={ref} options={options} onComplete={completePrint}>
          {({toPdf}) =>  (
            <Button onClick={ () => {issuePrint();toPdf();}}>To PDF</Button>
          )}
        </ReactToPdf>
    </div>)
}



export default Report