import React, { Component } from 'react';
import * as d3 from 'd3';
const colors = ['#FFBA69', '#E53935', "#59AEE6"];

class DonutChart extends Component {

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
        console.log(data);
        const svgContainer = d3.select(this.chRef.current).node();
        const width = svgContainer.getBoundingClientRect().width;
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
        let data_ready = pie(data)

        // Donut partition  
        svg
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(radius / 1.75)  // This is the size of the donut hole
                .outerRadius(radius)
            )
            .attr('fill', (d) => colors[d.index])
            .attr("stroke", "#fff")
            .style("stroke-width", "2")
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
            .append('text')
            .text(d => {if (d.value > 0) return d.data.name})
            .style("text-anchor", "middle")
            .style("font-weight", 700)
            .style("fill", '#222')
            .style("font-size", 14);

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
        return <>
            <div ref={this.chRef}></div> </>
    }


}

export default DonutChart;
