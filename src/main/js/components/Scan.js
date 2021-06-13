import React, { useState } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import Report from "./Report";
import axios from 'axios';

const Scan = () => {
     
    const [targetURL, setTargetURL] = useState("localhost:8080");
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
      axios.get('/api/scan', config)
        .then(response => {
          console.log(response.data)

          if (response.status == 200) {
            setScanResult(response.data);
          }
        })
        .catch (error => {
          setScanResult(error.response.data);
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
        { scanResult.length == 0 ? "" : <Report result={scanResult}/> }
      </div>
    )
}

export default Scan;
