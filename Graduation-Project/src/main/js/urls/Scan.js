import React, { useState } from 'react';
import { Form, Button, Container, Image, Collapse } from "react-bootstrap";
import Switch from 'react-switch';
import { useHistory } from "react-router-dom";
import axios from 'axios';



const Scan = () => {

  const [targetURL, setTargetURL] = useState("example");
  const [loginURL, setLoginPath] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const [requestMessage, setRequestMessage] = useState("");
  const [[cops1, setCops1], [cops2, setCops2], [cops3, setCops3]] = [useState(false), useState(false), useState(false)];
  const [scanResult, setScanResult] = useState({ "id": 24, "userId": 1, "targetURL": "localhost:8080", "type": "partial", "date": "2021-06-23", "alerts": [{ "path": "/login.php", "type": "Reflected cross site scripting", "description": "Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a \"trusted\" server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.\n\n More information about Cross-Site Scripting can be found here.", "fix": "vulnerable example code:\n1: print (\"Hello\" . $_GET[\"name\"]);\n\nproof of concept:\n\n\npatch:\nEncode all user tainted data with PHP buildin functions before embedding the data into the output.\nMake sure to set the parameter ENT_QUOTES to avoid an eventhandler injections to existing\nHTML attributes and specify the correct charset.\n\n1: print (\"Hello\" . htmlentities($_GET\"nam\"], ENT_QUOTES, \"utf-8\");\nrelated securing functions:\nhtmlentities\nhtmlspecialchars\nhighlight_string", "severity": 1, "method": "POST", "cweid": 20, "wascid": "WASC-08", "parameter": "username", "references": ["http://projects.webappsec.org/Cross-Site-Scripting", "http://cwe.mitre.org/data/definitions/79.html"] }, { "path": "/user_new.php", "type": "Reflected cross site scripting", "description": "Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a \"trusted\" server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.\n\n More information about Cross-Site Scripting can be found here.", "fix": "vulnerable example code:\n1: print (\"Hello\" . $_GET[\"name\"]);\n\nproof of concept:\n\n\npatch:\nEncode all user tainted data with PHP buildin functions before embedding the data into the output.\nMake sure to set the parameter ENT_QUOTES to avoid an eventhandler injections to existing\nHTML attributes and specify the correct charset.\n\n1: print (\"Hello\" . htmlentities($_GET\"nam\"], ENT_QUOTES, \"utf-8\");\nrelated securing functions:\nhtmlentities\nhtmlspecialchars\nhighlight_string", "severity": 2, "method": "POST", "cweid": 20, "wascid": "WASC-08", "parameter": "username", "references": ["http://projects.webappsec.org/Cross-Site-Scripting", "http://cwe.mitre.org/data/definitions/79.html"] }, { "path": "/login.php", "type": "Reflected cross site scripting", "description": "Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a \"trusted\" server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.\n\n More information about Cross-Site Scripting can be found here.", "fix": "vulnerable example code:\n1: print (\"Hello\" . $_GET[\"name\"]);\n\nproof of concept:\n\n\npatch:\nEncode all user tainted data with PHP buildin functions before embedding the data into the output.\nMake sure to set the parameter ENT_QUOTES to avoid an eventhandler injections to existing\nHTML attributes and specify the correct charset.\n\n1: print (\"Hello\" . htmlentities($_GET\"nam\"], ENT_QUOTES, \"utf-8\");\nrelated securing functions:\nhtmlentities\nhtmlspecialchars\nhighlight_string", "severity": 3, "method": "POST", "cweid": 20, "wascid": "WASC-08", "parameter": "username", "references": ["http://projects.webappsec.org/Cross-Site-Scripting", "http://cwe.mitre.org/data/definitions/79.html"] }] });
  function scan(event) {
    event.preventDefault();
    const config = {
      headers:
        { Authorization: 'Bearer ' + localStorage.getItem('bearer-token') }
    };
    if (targetURL === "example") {
      history.push({
        pathname: '/report',
        state: { report: scanResult, status: { value: 200 } }
      });
      return;
    }
    let body = undefined;
    body = { targetURL: targetURL }
    if (cops1) {
      body.username = username; body.password = password; body.loginURL = loginURL;
    }
    axios.post('/api/scan', body, config)
      .then(response => {
        if (response.status == 200) {
          history.push({
            pathname: '/report?id=' + response.data.id,
            state: { report: response.data, status: { value: 200 } }
          });
        }
      })
      .catch(error => {
        setRequestMessage(error.response.data);
      })
  }
  return (

    <div className="d-flex justify-content-center" style={{ backgroundColor: "#C8C9CB", heigt: '100vp' }}>
      <div className="div-scan">
        <div>
          <Image roundedCircle width="250" src="images/astronaut.jpg" />
        </div>
        <br />
        <Form onSubmit={scan} className="form-app">
          <Form.Group style={{ position: "relative" }} className="d-flex justify-content-between scan-div">
            <Form.Label className="scan-label">Target URL</Form.Label>
            <Form.Control className="rounded-pill form-control scan-input" onChange={e => setTargetURL(e.target.value)} type="text" name="url" value={targetURL} />
            <Button className="form-on-button rounded-pill scan-btn" type="submit">Scan</Button>
          </Form.Group>

          {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
          <Form.Group style={{ backgroundColor: "white" }}>
            <div className="d-flex px-2 justify-content-between collapse">
              <h4>Login Credentials</h4>
              <Switch height={20} width={45} onColor={"#e53935"} checkedIcon={false} uncheckedIcon={false} onChange={() => setCops1(!cops1)} checked={cops1} />
            </div>

            <Collapse in={cops1}>
              <div className="py-4">
                <div className="d-flex px-2 justify-content-between">
                  <Form.Label>Login URL</Form.Label>
                  <Form.Control className="grey-control-scan" onChange={e => setLoginPath(e.target.value)} style={{ width: "70%" }} />
                </div>
                <br />
                <div className="d-flex px-2 justify-content-between">
                  <Form.Label>Username</Form.Label>
                  <Form.Control className="grey-control-scan" onChange={e => setUsername(e.target.value)} style={{ width: "70%" }} />
                </div>
                <br />
                <div className="d-flex px-2 justify-content-between">
                  <Form.Label>Password</Form.Label>
                  <Form.Control className="grey-control-scan" onChange={e => setPassword(e.target.value)} style={{ width: "70%" }} />
                </div>
              </div>
            </Collapse>
          </Form.Group>

          {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
          <Form.Group style={{ backgroundColor: "white" }}>
            <div className="d-flex px-2 justify-content-between collapse">
              <h4>Session ID</h4>
              <Switch height={20} width={45} onColor={"#e53935"} checkedIcon={false} uncheckedIcon={false} onChange={() => setCops2(!cops2)} checked={cops2} />
            </div>
            <Collapse in={cops2}>
              <div className="py-4">
                <div className="d-flex" style={{ flexFlow: "column wrap", alignContent: "space-around" }}>
                  <Form.Control className="grey-control-scan" style={{ width: "70%" }} />
                </div>
              </div>
            </Collapse>
          </Form.Group>

          {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
          <Form.Group style={{ backgroundColor: "white" }}>
            <div className="d-flex px-2 justify-content-between collapse" style={{
              hight: "160px"
            }}>
              <h4>Cookie</h4>
              <Switch height={20} width={45} onColor={"#e53935"} checkedIcon={false} uncheckedIcon={false} onChange={() => setCops3(!cops3)} checked={cops3} />
            </div>
            <Collapse in={cops3}>
              <div className="py-4">
                <div className="d-flex" style={{ flexFlow: "column wrap", alignContent: "space-around" }}>
                  <Form.File />
                </div>
              </div>
            </Collapse>
          </Form.Group>
        </Form>
        {requestMessage}
      </div>
    </div >
  )
}

export default Scan;
