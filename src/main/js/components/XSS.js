import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from 'axios';

const XSS = () => {
    const [targetURL, setTargetURL] = useState("localhost/xss");
    const [xssResult, setXSSResult] = useState([]);
    function xss(event) {
      event.preventDefault();
      const config = {
          headers:
            { Authorization: 'Bearer ' + localStorage.getItem('bearer-token') },
          params:
            { url: targetURL }
      };
      axios.get('/api/xss', config)
          .then(response => {
            if (response.status == 200) {
                setXSSResult(response.data);
            }
          })
          .catch (error => {
            setXSSResult(error.response.data);
          })
    }
    return (
      <div>
          <Form onSubmit={ xss }  style={{width: 300}}>
				<Form.Group>
                    <Form.Label>URL</Form.Label>
                    <Form.Control onChange={e => setTargetURL(e.target.value)} type="text" name="url" value={targetURL}/>
                </Form.Group>
				<Button type="submit">Check URL</Button>
			</Form>
          <div>
            {/* {xssResult.map(line => (<div>{line}<br/></div>))} */}
            <pre>
            { xssResult.length == 0 ? "" : JSON.stringify(xssResult, null, 2) }
            </pre>
          </div>
      </div>
    )
}

export default XSS;
