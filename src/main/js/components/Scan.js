import React, { useState } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Report from "./Report";
import axios from 'axios';

const Scan = () => {
     
    const [targetURL, setTargetURL] = useState("localhost:8080");
    const history = useHistory();
    const [requestMessage, setRequestMessage] = useState("")
    const [scanResult, setScanResult] = useState({
      "id": 0,
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
      if (scanResult.id !== undefined) {
        history.push({
          pathname: '/report',
          state: { report: scanResult }
        });
        return;
      }
      axios.get('/api/scan', config)
        .then(response => {
          if (response.status == 200) {
            
          }
        })
        .catch (error => {
          setRequestMessage(error.response.data);
        })
    }
    return (
      <div>
        <Form onSubmit={ scan } className="form-app">
          <Form.Group>
            <Form.Label>URL</Form.Label>
            <Form.Control onChange={e => setTargetURL(e.target.value)} type="text" name="url" value={targetURL}/>
          </Form.Group>
          <Button type="submit">Begin Scan</Button>
        </Form>
        { requestMessage }
      </div>
    )
}

export default Scan;
