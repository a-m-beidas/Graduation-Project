import React, { useState } from 'react';

import { Form, Button } from "react-bootstrap";

const XSS = () => {
    const [targetURL, setTargetURL] = useState("http://localhost/xss/index.php");
    const [scanResult, setScanResult] = useState([]);
    function scan(event) {
      event.preventDefault();
      const requestOptions = {
          method: 'GET',
          headers: { "Content-Type": "application/json",
                     Authorization: 'Bearer ' + localStorage.getItem('bearer-token') }
      };
      var url = new URL('http://localhost:81/api/xss')
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
				<Button type="submit">Scan</Button>
			</Form>
          <div>
            {/* {scanResult.map(line => (<div>{line}<br/></div>))} */}
            {scanResult.map(line => (<div>{line}<br/></div>))}
          </div>
      </div>
    )
}

export default XSS;
