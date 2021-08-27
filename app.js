var svgHeight = 400;
var svgWidth = 960;
var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;
var margin = {top: 20, right: 20, bottom: 30, left: 40};

//svg time
var svg = d3.select("body").append("svg").attr("width", svgWidth).attr("height", svgHeight);
var chartVar = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

// get data from data.csv
d3.csv("data.csv", function(error, data) {
    if(error) throw error;
  data.forEach(function(d) {
    d.poverty = +d.poverty;
    d.healthcare = +d.healthcare;
  });

// x stuff
var xchartvalue = function(d) { return d.poverty;};
var xchartScale = d3.scaleLinear().range([0, width]);
var xchartMap = function(d) { return xchartScale(xchartvalue(d));};
var xchartAxis = d3.axisBottom(xchartScale);

// y stuff
var ychartvalue = function(d) { return d.healthcare;};
var ychartScale = d3.scaleLinear().range([height, 0]);
var ychartMap = function(d) { return ychartScale(ychartvalue(d));};
var ychartAxis = d3.axisLeft(ychartScale);

chartVar.call(tooltip);
    // chart x
    chartVar.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(10," + height + ")")
        .call(xchartAxis)
    // chart y
    chartVar.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(10)")
        .call(ychartAxis)    
    // title x
    chartVar.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (width/2)+ "," + (margin.bottom+height)+ ")")
        .text("Poverty (%)")
    // title y
    chartVar.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (margin.right-margin.left) + "," +(height/2) + ")rotate(-90)")
        .text("Without Healthcare(%)");

// plot stuff
chartVar.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "bubble")
    .attr("r", 6)
    .attr("cx", xchartMap)
    .attr("cy", ychartMap)
    .style("fill", "green")
    .style("opacity", 0.8)
    .on("mouseover", tooltip.show)
    .on("mouseout", tooltip.hide);

// labels
chartVar.selectAll("bubble")
    .data(data)
    .enter()
    .append("text")
    .text(function(d){return d.statecode;})
    .attr("x", xchartMap)
    .attr("y", ychartMap)
});