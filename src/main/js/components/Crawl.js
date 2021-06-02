import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from 'axios';

const Crawl = () => {
    const [targetURL, setTargetURL] = useState("http://192.168.56.101/bWAPP/login.php");
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
          if (response.status != 200) {
              throw response;
          }
          setScanResult(response.data);
        })
        .catch (error_response => {
          setScanResult(error_response.data);
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
          <div>
            {/* {scanResult.map(line => (<div>{line}<br/></div>))} */}
            <pre>
                { JSON.stringify(scanResult, null, 2) }
            </pre>
          </div>
      </div>
    )
}

export default Crawl;
