import { useState } from 'react';

const severity = {
    1: {
        color: "#e53935",
        text: "High"
    },
    2: {
        color: "#FFBA69",
        text: "Medium"
    },
    3: {
        color: "#59AEE6",
        text: "Low"
    }
}

const Alert = (props) => {
    console.log(props);
    const [alert, setAlert] = useState(props.location.state.alert);
    const onPrint = props.onPrint !== undefined;
    return (
        <div className={"export " + (onPrint ? "print" : "html")}>
            <section className={(onPrint ? "severity-print" : "") + " header"}>
                <h1 className={onPrint ? "h1-print" : ""} style={{ "--primary-color": severity[alert.severity].color, marginTop: "30px" }}>{alert.type}</h1>
                <div id="button" className="py-5">
                    <p className={onPrint ? "severity-print" : ""} id="severity" style={{ "--primary-color": severity[alert.severity].color }} className="rectangle">{severity[alert.severity].text}</p>
                    <p className={onPrint ? "p-print" : ""} id="export">Export
                        <svg width="41" height="36" viewBox="0 0 41 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.9567 12.885L20.4076 19.755L12.8585 12.885L10.5396 15L20.4076 24L30.2757 15L27.9567 12.885Z" fill="black" />
                        </svg>
                    </p>
                </div>
                <section className={(onPrint ? "severity-print" : "") + " info"}>
                    <table>
                        <tbody>
                            <tr>
                                <td><p className={onPrint ? "p-print" : ""}>Path</p></td>
                                <td><p className={onPrint ? "p-print" : ""}>Method</p></td>
                                <td><p className={onPrint ? "p-print" : ""}>Parameter</p></td>
                            </tr>
                            <tr>
                                <td><p className={onPrint ? "p-print" : ""}>{alert.path}</p></td>
                                <td><p className={onPrint ? "p-print" : ""}>{alert.method}</p></td>
                                <td><p className={onPrint ? "p-print" : ""}>{alert.parameter}</p></td>
                            </tr>
                            <tr>
                                <td><p className={onPrint ? "p-print" : ""}>CWEID</p></td>
                                <td><p className={onPrint ? "p-print" : ""}>WASC ID</p></td>
                                <td><p className={onPrint ? "p-print" : ""}>Date</p></td>
                            </tr>
                            <tr>
                                <td><p className={onPrint ? "p-print" : ""}>{alert.cweid}</p></td>
                                <td><p className={onPrint ? "p-print" : ""}>{alert.wascid}</p></td>
                                <td><p className={onPrint ? "p-print" : ""}>{alert.date}</p></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </section>
            <section className={(onPrint ? "severity-print" : "") + " description"}>
                <h2 className={onPrint ? "h2-print" : ""}>
                    Description
                </h2>
                <hr />
                <p className={onPrint ? "p-print" : ""}>{alert.description.split("\n").map(line => { return <>{line}<br /></> })}</p>
            </section>
            <section className={onPrint ? "severity-print" : ""}>
                <h2 className={onPrint ? "h2-print" : ""}>How To Fix IT</h2>
                <hr />
                <div id="how">
                    <p className={onPrint ? "p-print" : ""}>{alert.fix.split("\n").map(line => { return <>{line}<br /></> })}</p>
                </div>
                <h2 className={onPrint ? "h2-print" : ""}>References</h2>
                <hr />
                <ul id="references">
                    {alert.references.map(ref => { return <li><a className={onPrint ? "a-print" : ""} href={ref}>{ref}</a></li> })}
                </ul>
            </section>
        </div>
    )
}

export default Alert;