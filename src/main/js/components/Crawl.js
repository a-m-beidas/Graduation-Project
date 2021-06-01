import React, { useState } from 'react';

import { Form, Button } from "react-bootstrap";

const Crawl = () => {
    const [targetURL, setTargetURL] = useState("http://192.168.56.101/bWAPP/login.php");
    const [scanResult, setScanResult] = useState([]);
    function scan(event) {
      event.preventDefault();
      const requestOptions = {
          method: 'GET',
          headers: { "Content-Type": "application/json",
                     Authorization: 'Bearer ' + localStorage.getItem('bearer-token') }
      };
      var url = new URL('http://localhost:81/api/scan')
      url.search = new URLSearchParams({url: targetURL}).toString();
      fetch(url, requestOptions)
          .then(function(response) {
              return response.text();
          })
          .then(result => {
              setScanResult(JSON.parse(result));
          })
    }
    return (
      <div>
          <Form onSubmit={ scan }  style={{width: 300}}>
				<Form.Group>
                    <Form.Label>URL</Form.Label>
                    <Form.Control onChange={e => setTargetURL(e.target.value)} type="text" name="url" value={targetURL}/>
                </Form.Group>
				<Button type="submit">Begin Crawl</Button>
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
