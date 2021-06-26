import { useState } from 'react';

const severity = {
    1: {
        color: "#e53935",
        text: "High"
    },
    2: {
        color: "yellow",
        text: "Medium"
    },
    3: {
        color: "blue",
        text: "Low"
    }
}

const Alert = (props) => {
    console.log(props);
    const [alert, setAlert] = useState(props.location.state.alert);
    return (
        <div className="export">
            <section className="header">
                <h1>{alert.type}</h1>
                <div id="button" className="py-5">
                    <p id="severity" style={{"--primary-color": severity[alert.severity].color}} className="rectangle">{severity[alert.severity].text}</p>
                    <p id="export">Export</p>
                </div>
                <section className="info">
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
            <section className="description">
                <h2>
                    Description
                </h2>
                <hr/>
                <p>{alert.description.split("\n").map(line => {return <>{line}<br/></>})}</p>
            </section>
            <section>
                <h2>How To Fix IT</h2>
                <hr/>
                <div id="how">
                    <p>{alert.fix.split("\n").map(line => {return <>{line}<br/></>})}</p>
                </div>
                <h2>References</h2>
                <hr/>
                <ul id="references">
                    { alert.references.map(ref => {return <li><a href={ref}>{ref}</a></li> })}
                </ul>
            </section>
        </div>
    )
}

export default Alert;