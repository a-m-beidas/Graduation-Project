import React, { Component } from 'react';
import * as d3 from 'd3';

const colors = [
        'rgb(0, 23, 214)', // blue
        "#8EE060", // green
        "rgba(255, 255, 255, 0.05)" //black
];

class DonutChart extends Component {

    constructor(props) {
        super(props);
        this.chRef = React.createRef();
        this.chRefLegend = React.createRef();
    }

    // Chart load after component Mount
    componentDidMount() {
        this.drawChart();
    }


    // DrawChart 
    drawChart() {
        var { data } = this.props;
        data = data.filter(d => { 
            return d.name !== "Total"
                //  && 
                // d.name !== "Secure Alert"
            });
        const svgContainer = d3.select(this.chRef.current).node();
        const width = svgContainer.getBoundingClientRect().width;
        const height = width;
        const margin = 15;
        let radius = Math.min(width, height) / 2 - margin;
        console.log(radius);
        // legend Position
        let legendPosition = d3.arc().innerRadius(radius / 2).outerRadius(radius);
        // Create SVG
        const svg = d3.select(this.chRef.current)
            .append('svg')
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox', '0 0 ' + width + ' ' + width);
            //.attr('preserveAspectRatio','xMinYMin')

        const g = svg
            .append("g")
            .attr("width", "70%")
            .attr("height", "70%")
            .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");
        let pie = d3.pie()
            .value(
                    d => d.value)
        let data_ready = pie(data).map(d => { return d;})
        // Donut partition  
        g
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(0)  // This is the size of the donut hole
                .outerRadius(radius)
            )
            .attr('fill', (d, index) => { return colors[index]} )
            .attr("stroke", "#fff")
            .style("stroke-width", "8")
            .style("opacity", "1")
            .on("mouseover", (d, i) => {
                var arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius + 10)
                    .startAngle(i.startAngle)
                    .endAngle(i.endAngle);
                d3.select(d.target).transition().duration(300).ease(d3.easeBounce).attr("d", arc())
            })
            .on("mouseout", (d, i) => {
                var arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius)
                    .startAngle(i.startAngle)
                    .endAngle(i.endAngle);
                d3.select(d.target).transition().duration(300).ease(d3.easeBounce).attr("d", arc())
            });



        // Legend group and legend name
        g
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('g')
            .attr("transform", d => `translate(${legendPosition.centroid(d)})`)
            .attr("class", 'legend-g')
            .style("user-select", "none")
            .append('text')
            .text(d => {if (d.value > 0) return data.name})
            .style("text-anchor", "middle")
            .style("font-weight", 500)
            .style("fill", '#222')
            .style("font-size", "15px");

        const legend = d3.select(this.chRefLegend.current)
                .append("svg")
                .attr("class", "hello")
                .attr("transform", "translate(-75, 280)")
                ;

        legend
            .selectAll("whatever")
            .data(data_ready)
            .enter()
            .append("svg")
            .attr("transform", (d, i) => { return "translate(" + 0 + "," + ( i * 25 + 15) + ")" })
            .append("rect")
            .attr("width", 30)
            .attr("height", 10)
            .attr("fill", (d, i) => { return colors[i]} )
            .attr("class", (d, i) => { return i});

        legend.selectAll("svg")
            .append('text')
            .text((d, i) => { return d.data.name == "Reflected cross site scripting" ? "XSS" : d.data.name})
            .attr("transform", (d, i) => { return "translate(40, " + ( i * 0.5 + 9 ) + ")" })
            .style("font-size", "12px");

        // legend.append("text")
        //     .text(function(d){
        //       return value + "  " + data.name;
        //     })
        //     .style("font-size", 12)
        //     .attr("y", 10)
        //     .attr("x", 11);
        
        
        //Label for value
        // svg
        //     .selectAll('.legend-g')
        //     .append('text')
        //     .text((d) => { return data.value })
        //     .style("fill", '#000')
        //     .style("font-size", 12)
        //     .style("text-anchor", "middle")
        //     .attr("y", 16);
    }



    render() {
        return (
            <div>
                <h3 className="chart-title-text"><u>{ this.props.title }</u></h3>
                <br/>
                <div className="severity-pie-chart card">
                    <div className="severity-pie-chart-margin-div"/>
                    <div className="severity-pie-chart-center" ref={this.chRef}/>
                    <div className="severity-pie-chart-margin-div">
                        <div className="severity-pie-chart-margin-div-top"/>
                        <div className="severity-pie-chart-margin-div-bottom" ref={this.chRefLegend}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DonutChart;
