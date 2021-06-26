import Table from 'react-bootstrap/Table';
import SeverityShape from './SeverityShape';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const colors = {
    high: '#E53935', medium: '#FFBA69', low: "#59AEE6"
};


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
