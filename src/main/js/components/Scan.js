import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import Report from "./Report";
import axios from 'axios';

const Scan = () => {
    const [targetURL, setTargetURL] = useState("localhost:8080");
    const [scanResult, setScanResult] = useState([]);
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
          <Form onSubmit={ scan }  style={{width: 300}}>
				<Form.Group>
                    <Form.Label>URL</Form.Label>
                    <Form.Control onChange={e => setTargetURL(e.target.value)} type="text" name="url" value={targetURL}/>
                </Form.Group>
				<Button type="submit">Begin Scan</Button>
			</Form>
      <br/>
          <div>
            {/* {scanResult.map(line => (<div>{line}<br/></div>))} */}
            <pre>
                { scanResult.length == 0 ? "" : <Report result={scanResult}/> }
            </pre>
          </div>
      </div>
    )
}

export default Scan;
