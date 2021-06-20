import React, { useState } from 'react';
import { Form, Button, Container, Image, Collapse } from "react-bootstrap";
import Switch from 'react-switch';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const Scan = () => {
     
    const [targetURL, setTargetURL] = useState("example");
    const history = useHistory();
    const [requestMessage, setRequestMessage] = useState("")
    const [[cops1, setCops1], [cops2, setCops2], [cops3, setCops3]] = [useState(false), useState(false), useState(false)];
    const [scanResult, setScanResult] = useState({
      "id": 1,
      "userId": 24,
      "targetURL": "http://localhost:8080",
      "type": "partial",
      "date": "2021-06-03",
      "alerts": [
      {
      "id": 0,
      "url": "http://localhost:8080/login.php",
      "type": "xss",
      "description": "Solve it urself",
      "severity": 1
      },
      {
      "id": 0,
      "url": "http://localhost:8080/user_new.php",
      "type": "xss",
      "description": "Solve it urself",
      "severity": 2
      },
      {
      "id": 0,
      "url": "http://localhost:8080/contact.php",
      "type": "xss",
      "description": "Solve it urself",
      "severity": 3
      }
      ]
    });
    function scan(event) {
      event.preventDefault();
      const config = {
          headers:
            { Authorization: 'Bearer ' + localStorage.getItem('bearer-token') },
          params:
            { url: targetURL }
      };
      if (targetURL === "example") {
        history.push({
          pathname: '/report',
          state: { report: scanResult }
        });
        return;
      }
      axios.get('/api/scan', config)
        .then(response => {
          if (response.status == 200) {
            history.push({
              pathname: '/report?id=' + response.data.id,
              state: { report: response.data }
            });
          }
        })
        .catch (error => {
          setRequestMessage(error.response.data);
        })
    }
    return (
      <div className="div-scan">
        <div>
            <Image roundedCircle width="250" src="astronaut.jpg"/>
        </div><br/>
        <Form onSubmit={ scan } className="form-app">
          <Form.Group style={{position: "relative"}} className="d-flex justify-content-between">
            <Form.Label>URL</Form.Label>
            <Form.Control className="rounded-pill form-control" onChange={e => setTargetURL(e.target.value)} type="text" name="url" value={targetURL}/>
            <Button className="form-on-button rounded-pill" type="submit">Begin Scan</Button>
          </Form.Group>
          
          {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
          <Form.Group style={{backgroundColor: "white"}}>
            <div className="d-flex px-2 justify-content-between">
              <h4>Login Credentials</h4>
              <Switch height={20} width={45} onColor={"#007BFF"} checkedIcon={false} uncheckedIcon={false} onChange={() => setCops1(!cops1)} checked={cops1}/>
            </div>
            <Collapse in={cops1}>
              <div className="py-4">
                <div className="d-flex px-2 justify-content-between">
                    <Form.Label>Username</Form.Label>
                    <Form.Control className="grey-control-scan" style={{width: "70%"}}/>
                  </div>
                  <br/>
                  <div className="d-flex px-2 justify-content-between">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="grey-control-scan" style={{width: "70%"}}/>
                  </div>
              </div>
            </Collapse>
          </Form.Group>
          
          {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
          <Form.Group style={{backgroundColor: "white"}}>
            <div className="d-flex px-2 justify-content-between">
              <h4>Session ID</h4>
              <Switch height={20} width={45} onColor={"#007BFF"} checkedIcon={false} uncheckedIcon={false} onChange={() => setCops2(!cops2)} checked={cops2}/>
            </div>
            <Collapse in={cops2}>
              <div className="py-4">
                <div className="d-flex" style={{flexFlow: "column wrap", alignContent: "space-around"}}>
                  <Form.Control className="grey-control-scan" style={{width: "70%"}}/>
                </div>
              </div>
            </Collapse>
          </Form.Group>

          {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
          <Form.Group style={{backgroundColor: "white"}}>
            <div className="d-flex px-2 justify-content-between">
              <h4>Cookie</h4>
              <Switch height={20} width={45} onColor={"#007BFF"} checkedIcon={false} uncheckedIcon={false} onChange={() => setCops3(!cops3)} checked={cops3}/>
            </div>
            <Collapse in={cops3}>
              <div className="py-4">
                <div className="d-flex" style={{flexFlow: "column wrap", alignContent: "space-around"}}>
                  <Form.File/>
                </div>
              </div>
            </Collapse>
          </Form.Group>
        </Form>
        { requestMessage }
      </div>
    )
}

export default Scan;
