import { color } from 'd3-color';
import { Container, Card, Badge, Button, ListGroup } from 'react-bootstrap';
import DonutChart from './DonutChart';
import TargetList from './TargetList';

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
            <TargetList colors='colors' />
        </div >
    )
}
