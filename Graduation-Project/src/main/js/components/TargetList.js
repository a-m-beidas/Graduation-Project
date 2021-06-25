import Table from 'react-bootstrap/Table'
import SeverityShape from './SeverityShape';

const colors = {
    high: '#E53935', medium: '#FFBA69', low: "#59AEE6"
};


const TargetList = () => {
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
                <tr>
                    <td>Localhost</td>
                    <td>First Release</td>
                    <td>
                        <div style={{ display: 'flex' }}>
                            <SeverityShape color={colors.high} severityValue={4} />
                            <SeverityShape color={colors.medium} severityValue={1} />
                            <SeverityShape color={colors.low} severityValue={0} />
                        </div>
                    </td>
                    <td>
                        <pre>
                            completed
                            1/5/2021
                        </pre>
                    </td>
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
                    <td>
                        <pre>
                            completed
                            10/5/2021
                        </pre>
                    </td>
                    <td>View</td>
                </tr>
            </tbody>
        </Table>

    )
}

export default TargetList
