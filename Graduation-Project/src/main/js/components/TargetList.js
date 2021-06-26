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
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {/* {reports.map(report =>  */}
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
                    <td>1/5/2021</td>
                    <td>View</td>

                </tr>
                <tr>
                    <td>example</td>
                    <td>Production</td>
                    <td>
                        <div style={{ display: 'flex' }}>
                            <SeverityShape color={colors.high} severityValue={45} />
                            <SeverityShape color={colors.medium} severityValue={10} />
                            <SeverityShape color={colors.low} severityValue={31} />
                        </div>

                    </td>
                    <td>10/5/2021</td>
                    <td>View</td>
                </tr>
            </tbody>
        </Table>

    )
}

export default TargetList
