import { useState } from 'react';
import './AlertExport.js.css';

const severity = {
    1: {
        color: "danger",
        text: "High"
    },
    2: {
        color: "warning",
        text: "Medium"
    },
    3: {
        color: "info",
        text: "Low"
    }
}

const AlertExport = (props) => {

    const [alert, setAlert] = useState({
        "id": 0,
        "path": "http://localhost:8080/contact.php",
        "type": "Reflected cross site scripting",
        "description": "Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a \“trusted\” server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.\n\n More information about Cross-Site Scripting can be found here.",
        "fix": "vulnerable example code:\n1: print (\"Hello\"  .  $_GET[\"name\"]);\n\nproof of concept:\n\n\npatch:\nEncode all user tainted data with PHP buildin functions before embedding the data into the output.\nMake sure to set the parameter ENT_QUOTES to avoid an eventhandler injections to existing\nHTML attributes and specify the correct charset.\n\n1: print (\"Hello\"  .  htmlentities($_GET\"nam\"],  ENT_QUOTES, \"utf-8\");\nrelated securing functions:\nhtmlentities\nhtmlspecialchars\nhighlight_string",
        "severity": 1,
        "method": "POST",
        "cweid": 20,
        "wascid": "WASC-08",
        "parameter": "username",
        "date": "20/5/2021",
        "references": ["http://projects.webappsec.org/Cross-Site-Scripting", "http://cwe.mitre.org/data/definitions/79.html"]
    });
    return (
        <div>
            <section class="header">
                <h1>{alert.type}</h1>
                <div class="buttons">
                    <p id="severity" class="rectangle">{severity[alert.severity].text}</p>

                    <p id="export">Export</p>
                </div>

                <section class="info">

                    <table>
                        <tbody>
                            <tr>
                                <td><p>Path</p></td>
                                <td><p>Method</p></td>
                                <td><p>Parameter</p></td>
                            </tr>

                            <tr>
                                <td><p>{alert.path}</p></td>
                                <td><p>{alert.method}</p></td>
                                <td><p>{alert.parameter}</p></td>
                            </tr>
                            <tr>
                                <td><p>CWEID</p></td>
                                <td><p>WASC ID</p></td>
                                <td><p>Date</p></td>
                            </tr>
                            <tr>
                                <td><p>{alert.cweid}</p></td>
                                <td><p>{alert.wascid}</p></td>
                                <td><p>{alert.date}</p></td>
                            </tr>
                        </tbody>
                    </table>

                </section>

            </section>

            <section class="description">
                <h2>
                    Description
                </h2>
                <hr/>
                <text>{alert.description.split("\n").map(line => {return <>{line}<br/></>})}</text>
            </section>

            <section class="how">
                <h2>How To Fix IT</h2>
                <hr/>
                <text>{alert.fix.split("\n").map(line => {return <>{line}<br/></>})}</text>

                <h2>References</h2>

                { alert.references.map(ref => {return <><a href={ref}>{ref}</a><br/></> })}
                </section>
        </div>
    )
}

export default AlertExport;