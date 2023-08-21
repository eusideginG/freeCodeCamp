// data declaration
const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
const w = 900;
const h = 700;
const padding = 60;
const tempFormat = d3.format(".1f");
const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
let colors = ["#ff0000","#ff8000","#ffae00","#ffea00","#ffff00","#ffffa0","#e0f3f8","#abd9e9","#74add1","#1193e4","#0000ff"];
colors = colors.reverse();
var dataset = [];

// get data from the api
const req = new XMLHttpRequest();
req.open("GET", url, true);
req.send();
req.onload = () => {
  if(req.status !== 200){
    console.log(`Error ${req.status}: ${req.statusText}`);
  } else{
    json = JSON.parse(req.responseText);
    json.monthlyVariance.map(d => dataset.push(d));
    const averageVariance = d3.mean(dataset, d => d.variance);
    const maxVariance = d3.max(dataset, d => d.variance);
    const minVariance = d3.min(dataset, d => d.variance);
    const rdc = maxVariance - minVariance;
    // 10 equal steps of variance values
    const tes = rdc * 0.11;
    const baseTemp = json.baseTemperature;
    
    const rangeOfVariance = [];
    for (let i = 0; i < 11; i++){
      rangeOfVariance.push(((minVariance + baseTemp) + (tes * (i + 1))).toFixed(1))
    }
    
    // draw svg
    const svg = d3.select("#container").attr("id", "svg").append("svg").attr("width", w).attr("height", h);
    
    // add a container group
    const container = svg.append("g")
    .attr("transform","translate(" + padding + "," + padding +")");
    
    // add heatmap title
    const titleGroup = container.append("g").style("text-anchor", "middle")
    .attr("transform", "translate(" + (w / 2) + ", 0)")
    
    titleGroup.append("text").attr("id", "title")
    .text("Monthly Global Land-Surface Temperature")
    
    titleGroup.append("text").attr("id", "description")
    .text("1753 - 2015: base temperature 8.66℃")
    .attr("transform", "translate(0, 40)")
    
    // descriptions label for months
    const monthLabelGroup = container.append("g").style("text-anchor", "middle")
    .attr("transform", "translate(0, " + (h / 2) + ") rotate(-90)")
    
    monthLabelGroup.append("text")
    .text("Months")
    .style("font-size", "large")
    .style("fill", "#f0f0f0")
    
    // description label for years
    const yearLabelGroup = container.append("g").style("text-anchor", "middle")
    .attr("transform", "translate(" + (w / 2) + ", " + (h - (padding * 1.2)) + ")")
    
    yearLabelGroup.append("text")
    .text("Years")
    .style("font-size", "large")
    .style("fill", "#f0f0f0")
    
    
    // scales
      // x scale
    const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, d => d.year))
    .range([padding, w - padding])
      // y scale
    const yScale = d3.scaleBand()
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .range([padding, h - (padding * 2)])
    
    // axis
    const xAxis = d3.axisBottom(xScale).ticks(26).tickFormat(d3.format("d"))
    const yAxis = d3.axisLeft(yScale).tickFormat(i => months[i])
    
    container.append('g')
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (w - (padding * 5.3)) + ")")
    .call(xAxis);
    container.append('g')
    .attr("id", "y-axis")
    .attr("transform", "translate(" + (padding) + ", 0)")
    .call(yAxis);
    
    // set scalable rect size
    const rectWidth = parseFloat(w / (d3.max(dataset, d => d.year) - d3.min(dataset, d => d.year)));
    const rectHeight = yScale.bandwidth();

    // heatmap coloring function
    const colorize = d => ((d.variance >= minVariance && d.variance < (minVariance + tes)) ? colors[0] : 
      (d.variance >=(minVariance + tes) && d.variance < (minVariance + (tes * 2))) ? colors[1] :
      (d.variance >=(minVariance + (tes * 2)) && d.variance < (minVariance + (tes * 3))) ? colors[2] :
      (d.variance >=(minVariance + (tes * 3)) && d.variance < (minVariance + (tes * 4))) ? colors[3] :
      (d.variance >=(minVariance + (tes * 4)) && d.variance < (minVariance + (tes * 5))) ? colors[4] :
      (d.variance >=(minVariance + (tes * 5)) && d.variance < (minVariance + (tes * 6))) ? colors[5] :
      (d.variance >=(minVariance + (tes * 6)) && d.variance < (minVariance + (tes * 7))) ? colors[6] :
      (d.variance >=(minVariance + (tes * 7)) && d.variance < (minVariance + (tes * 8))) ? colors[7] :
      (d.variance >=(minVariance + (tes * 8)) && d.variance < (minVariance + (tes * 9))) ? colors[8] :
      (d.variance >=(minVariance + (tes * 9)) && d.variance < (minVariance + (tes * 10))) ? colors[9] : 
      (d.variance >=(minVariance + (tes * 9)) && d.variance < maxVariance) ? colors[10] : "gray");
    
    //tooltip
    const tooltip = d3.select("#svg")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip");
    
    // tooltip functions
const mouseover = (e, d) => {
  tooltip.style("left", (e.pageX + 20 ) + 'px')
  .style("top", (e.pageY - 40 ) + 'px')
  .style("opacity", .9)
  .attr("data-year", d.year)
  .html(d.year + " - " + months[d.month - 1] + "<br>Temperature: " + (d.variance + baseTemp).toFixed(1) + "℃" + "<br>Variance: " + d.variance.toFixed(1) + "℃");
};
    
    var mouseout = d => {
  tooltip.style("opacity", 0);
};
    
    // heatmap rect
    const heatmap = container.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("id", "cell")
    .attr("x", d => xScale(d.year))
    .attr("y", d => yScale(d.month - 1))
    .attr("width", rectWidth)
    .attr("height", rectHeight)
    .attr("data-year", d => d.year)
    .attr("data-month", d => d.month - 1)
    .attr("data-temp", d => d.variance)
    .style("fill", colorize)
    .style("opacity", .8)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);

    // legend
      // group container for legend
    const legendGroup = container.append("g")
    .attr("id", "legend")
    .attr("transform", "translate(0, " + (h - (padding * 1.6)) + ")")
    
      // legend scale
    const lScale = d3.scaleLinear()
    .domain(d3.extent(rangeOfVariance, d => parseFloat(d)))
    .range([padding, w / 3.7]);
    
      // legend axis
    const lAxis = d3.axisBottom(lScale).tickFormat(tempFormat).ticks(11).tickValues(rangeOfVariance, d => parseFloat(d));
    
    legendGroup.append('g')
    .attr("id", "l-axis")
    .attr("transform", "translate(0, 20)")
    .call(lAxis);
    
      // draw legend rects
    legendGroup.selectAll("rect")
    .data(rangeOfVariance)
    .enter()
    .append("rect")
    .attr("x",(d, i) => lScale(d))
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", 20)
    .style("stroke", "black")
    .style("fill", (d, i) => colors[i]);
  }
};