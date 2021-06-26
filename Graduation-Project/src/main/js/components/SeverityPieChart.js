import React, { Component } from 'react';
import * as d3 from 'd3';
import { rgb } from 'd3';

class SeverityPieChart extends Component {

    constructor(props) {
        super(props);
        this.chRef = React.createRef();
    }


    // Chart load after component Mount
    componentDidMount() {
        this.drawChart()
    }


    // DrawChart 
    drawChart() {
        const { data } = this.props;
        const colors = this.props.color;
        const svgContainer = d3.select(this.chRef.current).node();
        const width = svgContainer.getBoundingClientRect().width - 160;
        const height = width;
        const margin = 15;
        let radius = Math.min(width, height) / 2 - margin;
        // legend Position
        let legendPosition = d3.arc().innerRadius(radius / 1.75).outerRadius(radius);

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
            .value(d => d.value)
        let data_ready = pie(data);
        data_ready.map(data => {data.endAngle = -data.endAngle; data.startAngle = -data.startAngle})
        console.log(data_ready);    
        let center_ready = pie([data[0]]);
        // Donut partition  
        svg
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(radius / 1.2)  // This is the size of the donut hole
                .outerRadius(radius)
            )
            .attr('fill', (d) => colors[d.index])
            .attr("stroke", "black")
            .style("stroke-width", "0.1")
            .style("opacity", "0.8")
        svg
            .selectAll("whatever")
            .data(center_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(0)  // This is the size of the donut hole
                .outerRadius(radius / 1.5)
            )
            .attr('fill', colors[0])
            .attr("stroke", "black")
            .style("stroke-width", "0.1")
            .style("opacity", "0.8")


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
            .text(Math.round((data[0].value/data[1].value) * 100) + "%");

    }



    render() {
        return <>
            <div ref={this.chRef}></div> </>
    }


}

export default SeverityPieChart;