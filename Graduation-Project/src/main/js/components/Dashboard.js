import { color } from 'd3-color';
import { Container, Card, Badge, Button, ListGroup, Collapse, } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import DonutChart from './DonutChart';
import SeverityShape from './SeverityShape';

const colors = {
    high: '#E53935', medium: '#FFBA69', low: "#59AEE6"
};

const donutData = [
    { name: "High", value: 50 },
    { name: "Medium", value: 82 },
    { name: "Low", value: 20 },
]


export const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard overview</h2>
            <p>test</p>

            <div className="dashboard-section">
                <div className="card" >
                    <div style={{ color: colors.high, display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                        <p>High</p>
                        <p>50</p>
                    </div>
                </div>

                <div className="card" style={{ color: colors.medium, display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                    <p>Medium</p>
                    <p>82</p>

                </div>


                <div className="card" style={{ color: colors.low, display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                    <p>Low</p>
                    <p>20</p>
                </div>


            </div >

            <p>test</p>


            <div className="dashboard-section">
                <div className="card left">
                    <p>test</p>

                </div>
                <div className="card right">
                    <DonutChart data={donutData} />
                </div>

            </div>
            <p>test</p>

            <h3>Sites needing attention</h3>
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
        </div >
    )
}
