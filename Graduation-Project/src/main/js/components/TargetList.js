import Table from 'react-bootstrap/Table';
import SeverityShape from './SeverityShape';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const colors = {
    high: '#E53935', medium: '#FFBA69', low: "#59AEE6"
};

const severity = {
    1: {
        text: "high"
    },
    2: {
        text: "medium"
    },
    3: {
        text: "low"
    },
    4: {
        text: "Secure",
        text: "secure"
    }
}

const processReport = (report) => {
    console.log(report)
    if (report.alerts === undefined)
        return;
    report.count = { high: 0, medium: 0, low: 0 }
    report.alerts.map((alert, index) => {
        alert.date = report.date;
        if (!alert.path.startsWith(report.targetURL))
            alert.path = report.targetURL + alert.path
        ++report.count[severity[alert.severity].text]
    })
    return;
}

const TargetList = (props) => {
    const [reports, setReports] = useState(props.reports)

    useEffect(() => {
        console.log(reports)
    })
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Address</th>
                    <th>Description</th>
                    <th>Vulnerabilities</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                { reports.map(report => 
                <tr>
                    {[processReport(report), ]}
                    <td>{report.targetURL}</td>
                    <td>{report.type}</td>
                    <td>
                        <div style={{ display: 'flex' }}>
                            <SeverityShape color={colors.high} severityValue={report.count.high} />
                            <SeverityShape color={colors.medium} severityValue={report.count.medium} />
                            <SeverityShape color={colors.low} severityValue={report.count.low} />
                        </div>
                    </td>
                    <td>
                        {"completed " + report.date}
                    </td>
                    <td><Button href={"/report?id=" + report.id}>View</Button></td>

                </tr>
                )}
            </tbody>
        </Table>

    )
}

export default TargetList
