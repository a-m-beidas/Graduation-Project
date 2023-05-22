import React, { Component } from 'react';
import * as d3 from 'd3';
import { rgb } from 'd3';



const colorSev = [
    ["rgba(229, 57, 53, 0.1)", "rgba(229, 57, 53, 1)"], //high
    ["rgba(255, 186, 105, 0.1)", "rgba(255, 186, 105, 1)"], //medium
    ["rgba(89, 174, 230, 0.2)", "rgba(89, 174, 230, 1)"], //low
    ["rgba(53, 57, 229, 0.1)", "rgba(53, 57, 229, 1)"] //secure
]

class SeverityPieChart extends Component {

    constructor(props) {
        super(props);
        this.chRef = React.createRef();
        this.chRefLegend = React.createRef();
    }
    // Chart load after component Mount
    componentDidMount() {
        this.drawChart()
    }


    // DrawChart 
    drawChart() {
        const data_raw = this.props.data;
        const { index } = this.props;
        const colors = colorSev[index];
        const data = [{ name: data_raw[index].name, value: data_raw[index].value }, { name: "Total", value: data_raw[4].value }]
        // const data = [{ name: data_raw[index].name, value: data_raw[index].value }, { name: "Total", value: data_raw[0].value + data_raw[1].value + data_raw[2].value }]
        data[1].value -= data[0].value
        const svgContainer = d3.select(this.chRef.current).node();
        const width = svgContainer.getBoundingClientRect().width - 300;
        const height = width;
        const margin = 15;
        let radius = Math.min(width, height) / 2 - margin;
        // legend Position
        let legendPosition = d3.arc().outerRadius(radius / 1.75).innerRadius(radius * 0.5);

        // Create SVG
        const svg = d3.select(this.chRef.current)
            .append('svg')
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox', '0 0 ' + width + ' ' + width)
            //.attr('preserveAspectRatio','xMinYMin')
            .append("g")
            .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");

        let pie = d3.pie()
            .value(d => d.value);

        let data_ready = pie(data);
        data_ready.map(data => { data.endAngle = -data.endAngle; data.startAngle = -data.startAngle })
        // Donut partition  
        svg
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(radius / 1.5)  // This is the size of the donut hole
                .outerRadius(radius)
            )
            .attr('fill', (d) => colors[d.index])
            .attr("stroke", "black")
            .style("stroke-width", "0.1")
            .style("opacity", "0.8")
        svg
        // .selectAll("whatever")
        // .data(center_ready)
        // .enter()
        // .append('path')
        // .attr('d', d3.arc()
        //     .innerRadius(0)  // This is the size of the donut hole
        //     .outerRadius(radius / 1.5)
        // )
        // .attr('fill', colors[0])
        // .attr("stroke", "black")
        // .style("stroke-width", "0.1")
        // .style("opacity", "0.8")


        // Legend group and legend name 
        svg
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('g')
            .attr("transform", d => `translate(${legendPosition.centroid(d)})`)
            .attr("class", 'legend-g')
            .style("user-select", "none")

        svg.append("text")
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .attr("transform", "translate(0, 3.6)")
            .text(Math.round((data[0].value / (data[1].value + data[0].value)) * 100) + "%");


        const legend = d3.select(this.chRefLegend.current)
                .append("svg")
                // .attr("class", "hello")
                .attr("transform", "translate(30, 30)");

        legend
            .selectAll("whatever")
            .data(data_ready)
            .enter()
            .append("svg")
            .attr("transform", (d, i) => { return "translate(" + 0 + "," + (  i * 25) + ")" })
            .append("rect")
            .attr("width", 70)
            .attr("height", 20)
            .attr("fill", (d, i) => colors[i] )
            // .attr("class", (d, i) => { return "zzzz" + i});

        legend.selectAll("svg").append('text')
            .text((d, i) => { return d.data.name})
            .attr("transform", (d, i) => { return "translate(80, " + (i * 1.2 + 15) + ")" })
            .style("font-size", "12px");

    }

    render() {
        return (
            <div>
                <h3 className="chart-title-text"><u>{ this.props.title }</u></h3>
                <br/>
                <div className="severity-pie-chart">
                    <div className="severity-pie-chart-margin-div"/>
                    <div className="severity-pie-chart-center" ref={this.chRef}/>
                    <div className="severity-pie-chart-margin-div">
                        <div className="severity-pie-chart-mirgin-div-top"/>
                        <div className="severity-pie-chart-margin-div-bottom" ref={this.chRefLegend}/>
                    </div>
                </div>
                
            </div>
        )
    }


}

export default SeverityPieChart;
