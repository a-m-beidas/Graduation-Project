import React from 'react';
import { Container, Card, Badge, Button, ListGroup } from 'react-bootstrap';

export const Alert = (props) => {
    return(
        <ListGroup.Item>
            <Card.Title >
                <div  class="p-4 d-flex justify-content-between">
                {props.alert.url}
                <Badge pill variant="danger">{props.alert.type}</Badge>
                </div>
            </Card.Title>
            <Card.Text class="p-4">
                Solution:<br/>
                {props.alert.description}
            </Card.Text>
        </ListGroup.Item>)
}

const Report = (props) => {
    return(
    <div>
        <h2>Report</h2>
        <Card  style={{width: 700}}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Card.Header style={{"background-color": "1px solid rgba(0,0,0,.25)"}}>
                        <Card.Title >
                            <div  class="px-2 d-flex justify-content-between">
                            {props.result.targetURL}
                            <Badge variant="secondary">{props.result.type + " scan"}</Badge>
                            </div>
                        </Card.Title>
                        <Card.Text class="p-4">
                            Done in: {' ' + props.result.date}
                        </Card.Text>
                    </Card.Header>
                </ListGroup.Item>
                { props.result.alerts.map(alert => <Alert alert={alert}/>) }
            </ListGroup>
        </Card>
    </div>)
}



export default Report