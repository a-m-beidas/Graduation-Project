import React, { Component } from 'react';
import * as d3 from 'd3';
const colors = [
        '#E53935', //red
        '#FFBA69', //yellow
        "#59AEE6", //blue
        "#519E4E" //green
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
        data = [data[0], data[1], data[2], data[3]]
        const svgContainer = d3.select(this.chRef.current).node();
        const width = svgContainer.getBoundingClientRect().width;
        const height = width;
        const margin = 15;
        let radius = Math.min(width, height) / 2 - margin;
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
            .value(d => d.value)
        let data_ready = pie(data)
        // Donut partition  
        g
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(radius / 1.75)  // This is the size of the donut hole
                .outerRadius(radius)
            )
            .attr('fill', (d, index) => { return colors[index]} )
            .attr("stroke", "#fff")
            .style("stroke-width", "2")
            .style("opacity", "0.8")


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
            .text(d => {if (d.value > 0) return d.data.name})
            .style("text-anchor", "middle")
            .style("font-weight", 500)
            .style("fill", '#222')
            .style("font-size", "15px");

        const legend = d3.select(this.chRefLegend.current)
                .append("svg")
                .attr("class", "hello")
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
            .attr("fill", (d, i) => { return colors[i]} )
            .attr("class", (d, i) => { return i});

        legend.selectAll("svg").append('text')
            .text((d, i) => { return d.data.name})
            .attr("transform", (d, i) => { return "translate(80, " + (i * 0.8 + 10) + ")" })
            .style("font-size", "12px");

        // legend.append("text")
        //     .text(function(d){
        //       return d.value + "  " + d.data.name;
        //     })
        //     .style("font-size", 12)
        //     .attr("y", 10)
        //     .attr("x", 11);
        
        
        //Label for value
        // svg
        //     .selectAll('.legend-g')
        //     .append('text')
        //     .text((d) => { return d.data.value })
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
            <div className="severity-pie-chart">
                <div className="severity-pie-chart-margin-div"/>
                <div className="severity-pie-chart-center" ref={this.chRef}/>
                <div className="severity-pie-chart-margin-div">
                    <div className="severity-pie-chart-mirgin-div-top"/>
                    <div className="severity-pie-chart-margin-div-bottom" ref={this.chRefLegend}/>
                </div>
            </div>
            
        </div>
        );
    }
}

export default DonutChart;
