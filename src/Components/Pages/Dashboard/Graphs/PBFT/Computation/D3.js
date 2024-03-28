import * as d3 from "d3";

export const labelPrimaryNode = (svg, label) => {
    svg
        .append("rect")
        .attr("x", label.x - 42.5)
        .attr("y", label.y - 20)
        .attr("width", 85)
        .attr("height", 40)
        .attr("fill", "none")
        .attr("stroke", "#fc453f")
        .attr("stroke-width", 1)
        .attr("rx", 10)
        .attr("ry", 10);

    svg
        .append("text")
        .attr("transform", "translate(" + label.x + " ," + (label.y + 15) + ")")
        .attr("fill", "#fc453f")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Primary");

    return svg;
};

export const connectionRender = (lineData, lineColor, dotColor, duration, delay, lineGen, svg, arrow) => {
    var line = svg.append("path")
        .attr("d", lineGen(lineData))
        .attr("id", `${lineData[0][1]}${lineData[0][0]}`)
        .attr("stroke", lineColor)
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("marker-end", `url(#arrow-&${arrow})`)
        .style("opacity", 0)

    // Define the tooltip div
    var tooltip = d3.select(`#${lineData[0][1]}${lineData[0][0]}`)
        .append("div")
        .attr("class", "tooltip")
        .attr("fill", "white")
        .attr("height", "100px")
        .attr("width", "100px")
        .attr("stroke", "steelblue")
        .style("opacity", 1);

    // Append tooltip text
    var tooltipText = "Tooltip text here";

    line.transition()
        .duration(duration / 2)
        .delay(delay)
        .style("opacity", 1)
        .on("end", function () {
            let dot = svg.append("circle")
                .attr("r", 5)
                .attr("fill", `${dotColor}`)
                .attr("cx", lineData[0][0])
                .attr("cy", lineData[0][1])
                .style("opacity", 0);

            dot.transition()
                .duration(duration / 2)
                .style("opacity", 1)
                .attrTween("cx", function () {
                    return function (t) {
                        var interpolatedPoint = line.node().getPointAtLength(t * line.node().getTotalLength());
                        return interpolatedPoint.x;
                    };
                })
                .attrTween("cy", function () {
                    return function (t) {
                        var interpolatedPoint = line.node().getPointAtLength(t * line.node().getTotalLength());
                        return interpolatedPoint.y;
                    };
                });
        })

    // Add event listeners to show/hide tooltip when hovering over the line
    d3.select(`#${lineData[0][1]}${lineData[0][0]}`)
        .on('mouseover', function (e, d) {
            console.log('HELLO')
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 1)
        })
        .on("mousemove", function (e, d) {
            console.log('HELLO 2')
            tooltip.html(tooltipText)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY - 28) + "px");
        })
        .on("mouseout", function () {
            console.log('HELLO 3')
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

}
