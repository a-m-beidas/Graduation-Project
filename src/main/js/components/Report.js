import React from 'react';
import { Container, Card, Badge, Button, ListGroup } from 'react-bootstrap';
import ReactToPdf from 'react-to-pdf'

export const Alert = (props) => {

    return(
        <ListGroup.Item>
            <Card.Title >
                <div className="p-4 d-flex justify-content-between">
                {props.alert.url}
                <Badge pill variant="danger">{props.alert.type}</Badge>
                </div>
            </Card.Title>
            <Card.Text className="p-4">
                Solution:<br/>
                {props.alert.description}
            </Card.Text>
        </ListGroup.Item>)
}

const Report = (props) => {

    const ref = React.createRef();
    const options = {
    };

    return(
    <div>
        <Container style={{paddingLeft: "0px"}} fluid ref={ref}>
            <br/>
            <h2>Report</h2>
            <br/>
            <Card style={{maxWidth: 700}}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Card.Header style={{"backgroundColor": "1px solid rgba(0,0,0,.25)"}}>
                            <Card.Title>
                                <div className="px-2 d-flex justify-content-between">
                                {props.result.targetURL}
                                <Badge variant="secondary">{props.result.type + " scan"}</Badge>
                                </div>
                            </Card.Title>
                            <Card.Text className="p-4">
                                Done in: {' ' + props.result.date}
                            </Card.Text>
                        </Card.Header>
                    </ListGroup.Item>
                    { props.result.alerts.map(alert => <Alert alert={alert}/>) }
                </ListGroup>
            </Card>
        </Container>
        <br/>
        <ReactToPdf x={"12"} filename={"Report"} targetRef={ref} options={options}>
          {({toPdf}) =>  (
            <Button onClick={toPdf}>To PDF</Button>
          )}
        </ReactToPdf>
    </div>)
}



export default Report