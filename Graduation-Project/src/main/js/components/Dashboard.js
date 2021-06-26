import { color } from 'd3-color';
import { Container, Card, Badge, Button, ListGroup } from 'react-bootstrap';
import DonutChart from './DonutChart';
import SeverityPieChart from './SeverityPieChart';
import TargetList from './TargetList';
import Tableau from './Tableau';
import axios from 'axios';
import { useEffect, useState } from 'react';

const colors = {
    high: '#E53935', medium: '#FFBA69', low: "#59AEE6"
};

const donutData = [
    { name: "High", value: 50 },
    { name: "Medium", value: 82 },
    { name: "Low", value: 20 },
]

const severityCount = {
    high: [
        { name: "High", value: 50 },
        { name: "Total", value: 152 }
    ], medium: [
        { name: "Medium", value: 82 },
        { name: "Total", value: 152 }
    ], low: [
        { name: "Low", value: 20 },
        { name: "Total", value: 152 }
    ]
}

const colorSev = {
    high: ["rgba(229, 57, 53, 0.1)", "rgba(229, 57, 53, 1)"],
    medium: ["rgba(255, 186, 105, 0.1)", "rgba(255, 186, 105, 1)"],
    low: ["rgba(89, 174, 230, 0.2)", "rgba(89, 174, 230, 1)"]
}

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
    report.count = [{ name: "High", value: 0 }, { name: "Medium", value: 0 }, { name: "Low", value: 0 }]
    report.alerts.map((alert, index) => {
        alert.date = report.date;
        if (!alert.path.startsWith(report.targetURL))
            alert.path = report.targetURL + alert.path;
        ++report.count[alert.severity - 1].value;
    })
    return;
}


export const Dashboard = () => {

    const [reports, setReports] = useState([]);

    useEffect(() => {
        const config = {
            headers:
                { Authorization: 'Bearer ' + localStorage.getItem('bearer-token') }
        };

        axios.get('/api/reports', config)
            .then(response => {
                if (response.status === 200) {
                    response.data.map(report => processReport(report));
                    setReports(response.data);
                } else {
                    throw response;
                }
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            {reports.length !== 0 ?
                <div style={{ margin: "50px 50px", }}>
                    <h2>Dashboard overview</h2>
                    <div className="dashboard-section">

                        <div className="card" >
                            <div>
                                <SeverityPieChart index={0} data={reports[reports.length - 1].count} color={colorSev.high} />
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <SeverityPieChart index={1} data={reports[reports.length - 1].count} color={colorSev.medium} />
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <SeverityPieChart index={2} data={reports[reports.length - 1].count} color={colorSev.low} />
                            </div>
                        </div>

                    </div >
                    <br />
                    <div className="dashboard-section">
                        <div className="card left">
                            {/* <Tableau /> */}
                        </div>
                        <div className="card right">
                            {reports.length === 0 ? "" : <DonutChart data={reports[reports.length - 1].count} />}
                        </div>
                    </div>
                    <br />
                    <h3>Sites Needing Attention</h3>
                    {reports.length === 0 ? "" : <TargetList reports={reports} colors='colors' />}
                </div >
                : <div style={{ margin: "50px 50px", }}><h3>You Need To Log In</h3></div>
            }
        </>
    )
}
