import React, { Component } from 'react';
import * as d3 from 'd3';

const colors = [
    '#E53935', //red
    '#FFBA69', //yellow
    "#59AEE6", //blue
    "#519E4E" //green
];


const colors2 = [
    '#120dc8'
]


class BarChart extends Component {

    constructor(props) {
        super(props);
        this.chRef = React.createRef();
        this.chRefLegend = React.createRef();
    }

    componentDidMount() {

        var { data } = this.props;
        data = data.map(x => x);
        var countData = data.pop();

        // set the dimensions and margins of the graph
        var margin = {top: 100, right: 90, bottom: 40, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select(this.chRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        // X axis
        var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(function(d) { return d.name; }))
            .padding(0.2);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, countData.value])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Bars
        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d) { return x(d.name); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", (d, i) => { return colors[i]})
    }

    render() {
        return (
            <div>
                <h3 className="chart-title-text"><u>{ this.props.title }</u></h3>
                <br/>
                <div>
                    <div className="severity-pie-chart card">
                        <div className="severity-pie-chart-margin-div"/>
                        <div className="severity-pie-chart-center" ref={this.chRef}/>
                        <div className="severity-pie-chart-margin-div">
                            <div className="severity-pie-chart-margin-div-top"/>
                            <div className="severity-pie-chart-margin-div-bottom" ref={this.chRefLegend}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BarChart;
