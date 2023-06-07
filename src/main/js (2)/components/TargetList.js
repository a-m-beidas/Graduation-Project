import Table from 'react-bootstrap/Table';
import SeverityShape from './SeverityShape';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const colors = {
    high: '#E53935', medium: '#FFBA69', low: "#59AEE6", secure: "#8EE060"
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
                {reports.map((report, index) =>
                    <tr key={index}>
                        <td>{report.targetURL}</td>
                        <td>{report.type}</td>
                        <td>
                            <div style={{ display: 'flex', justifyContent: "center" }}>
                                <SeverityShape color={colors.high} severityValue={report.count[0].value} />
                                <SeverityShape color={colors.medium} severityValue={report.count[1].value} />
                                <SeverityShape color={colors.low} severityValue={report.count[2].value} />
                                <SeverityShape color={colors.secure} severityValue={report.count[3].value} />
                            </div>
                        </td>
                        <td>{report.date}</td>
                        <td><Button href={"/report?id=" + report.id}>View</Button></td>
                    </tr>
                    )}
            </tbody>
        </Table>

    )
}

export default TargetList
