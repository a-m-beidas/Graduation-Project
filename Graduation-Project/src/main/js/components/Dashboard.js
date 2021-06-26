import { color } from 'd3-color';
import { Container, Card, Badge, Button, ListGroup } from 'react-bootstrap';
import DonutChart from './DonutChart';
import SeverityPieChart from './SeverityPieChart';
import TargetList from './TargetList';
import Tableau from './Tableau';

const colors = {
    high: '#E53935', medium: '#FFBA69', low: "#59AEE6"
};

const donutData = [
    { name: "High", value: 50 },
    { name: "Medium", value: 82 },
    { name: "Low", value: 20 },
]

const severity = { 
    high: [
        { name: "High", value: 50},
        { name: "Total", value: 152}
    ], medium: [
        { name: "Mediunm", value: 82},
        { name: "Total", value: 152}
    ], low: [
        {name: "Low", value: 20},
        {name: "Total", value: 152}
    ]
}

const colorSev = { 
    high: ["rgba(229, 57, 53, 0.1)", "rgba(229, 57, 53, 1)"],
    medium: ["rgba(255, 186, 105, 0.1)", "rgba(255, 186, 105, 1)"],
    low: ["rgba(89, 174, 230, 0.2)", "rgba(89, 174, 230, 1)"]
}


export const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard overview</h2>
            <p>test</p>

            <div className="dashboard-section">
                <div className="card" > 
                    <div>
                        <SeverityPieChart data={severity.high} color={colorSev.high}/>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <SeverityPieChart data={severity.medium} color={colorSev.medium}/>
                    </div>
                </div>


                <div className="card">
                    <div>
                        <SeverityPieChart data={severity.low} color={colorSev.low}/>
                    </div>
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

            <Tableau />

            <p>test</p>

            <h3>Sites Needing Attention</h3>
            <TargetList colors='colors' />
        </div >
    )
}
