import { color } from 'd3-color';
import { Container, Card, Badge, Button, ListGroup, Table } from 'react-bootstrap';
import DonutChart from './DonutChart';
import SeverityPieChart from './SeverityPieChart';
import TargetList from './TargetList';
import Tableau from './Tableau';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BarChartD3 from './BarChartD3';

const colors = {
    high: '#E53935', medium: '#FFBA69', low: "#59AEE6", secure: "#8EE060"
};

const datas = [
    [10, 30, 40, 20],
    [10, 40, 30, 20, 50, 10],
    [60, 30, 40, 20, 30]
]


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

const processReport = (report, count) => {
    if (report.alerts === undefined)
        return;
    report.count = [{ name: "High", value: 0 }, { name: "Medium", value: 0 }, { name: "Low", value: 0 }, {name: "Secure", value: 0}]
    report.alerts.map((alert, index) => {
        alert.date = report.date;
        if (!alert.path.startsWith(report.targetURL))
            alert.path = report.targetURL + alert.path;
        ++report.count[alert.severity - 1].value;
        ++count[alert.severity - 1].value
        ++count[4].value;
    });
    return;
}


export const Dashboard = () => {

    const [reports, setReports] = useState([]);
    const [pieChartValueCount, setPieChartValueCount] = useState([]);

    useEffect(() => {
        const config = {
            headers:
                { Authorization: 'Bearer ' + localStorage.getItem('bearer-token') }
        };

        axios.get('/api/reports', config)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    response.count = [{ name: "High", value: 0 }, { name: "Medium", value: 0 }, { name: "Low", value: 0 }, {name: "Secure", value: 0}, {name: "Total", value: 0}]
                    response.data.map(report => processReport(report, response.count));
                    setReports(response.data);
                    setPieChartValueCount(response.count);
                } else {
                    throw response;
                }
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            {reports.length !== 0 && pieChartValueCount.length !== 0 ?
                <div style={{ margin: "50px 50px", }}>
                    <h3>Sites Needing Attention</h3>
                    <TargetList className="target-list-table" reports={reports} colors='colors' />
                    <div className="dashboard-section">
                        <h2>Dashboard overview</h2>
                        <div className="dashboard-section-pie-chart">
                            <div className="card">
                                <SeverityPieChart title="Overall High Severity Threats" index={0} data={pieChartValueCount} />
                            </div>
                        </div>
                        <div className="dashboard-section-pie-chart">
                            <div className="card">
                                <SeverityPieChart title="Overall Medium Severity Threats" index={1} data={pieChartValueCount} />
                            </div>
                        </div>
                        <div className="dashboard-section-pie-chart">
                            <div className="card">
                                <SeverityPieChart title="Overall Low Severity Threats" index={2} data={pieChartValueCount} />
                            </div>
                        </div> 
                        <div className="card right">
                            <DonutChart title="Threat percentage by Severity" data={pieChartValueCount} />
                        </div>
                    </div >
                    <br />
                </div >
                : <div style={{ margin: "50px 50px", }}><h3>No history of previous reports</h3></div>
            }
        </>
    )
}
