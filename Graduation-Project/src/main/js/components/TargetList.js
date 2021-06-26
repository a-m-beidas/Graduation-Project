import Table from 'react-bootstrap/Table';
import SeverityShape from './SeverityShape';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const colors = {
    high: '#E53935', medium: '#FFBA69', low: "#59AEE6"
};


const TargetList = (props) => {
    const [reports, setReports] = useState(props.reports);
    
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
                            <SeverityShape color={colors.high} severityValue={report.count[2].value} />
                            <SeverityShape color={colors.medium} severityValue={report.count[1].value} />
                            <SeverityShape color={colors.low} severityValue={report.count[0].value} />
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
