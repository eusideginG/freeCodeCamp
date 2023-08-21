// setting variables
const padding = 50,
  p = { top: padding, right: padding, bottom: padding, left: padding },
  w = 1200 - p.left - p.right,
  h = 900 - p.top - p.bottom,
  kickstarterURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json",
  movieURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json",
  videoGameURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
let dataset;

// title
const title = d3.select("#svgContainer")
  .append("h1")
  .attr("id", "title")
  .text("Video Game Sales");

// description
const description = d3.select("#svgContainer")
  .append("h4")
  .attr("id","description")
  .text("Top 100 Most Sold Video Games Grouped by Platform");

// create svg
const svg = d3.select("#svgContainer")
  .append("svg")
  .attr("id","svg")
  .attr("width", w)
  .attr("height", h);

// treemap function
const treeMap = dataset => {
  // make hierarchy and sort
  const hierarchy = d3.hierarchy(dataset, d => d["children"])
  .sum(d => d["value"])
  .sort((d1, d2) => d2["value"] - d1["value"]);
  
  const treeMapD3 = d3.treemap()
    .size([w, h]).paddingInner(1);
  
  treeMapD3(hierarchy);
  
  const tiles = hierarchy.leaves();
  
  const rectGroup = svg.selectAll('g')
    .data(tiles)
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d["x0"]}, ${d["y0"]})`)
  
  // color scale
  const blender = c => d3.interpolateRgb(c, "#503030")(0.4),
  colorScale = d3.scaleOrdinal(["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf","#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"].map(blender));
  
  //tooltip
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip");
  
  // tooltip functions
  const mouseover = (e, d) => {
    tooltip.style("left", (e.pageX + 20 ) + 'px')
    .style("top", (e.pageY - 40 ) + 'px')
    .style("opacity", .9)
    .attr("data-value", () => d["value"])
    .html(`Name: ${d["data"]["name"]}<br>Category: ${d["data"]["category"]}<br>Value: ${d.value}`)
  };
  
  const mouseout = d => {
      tooltip.style("opacity", 0);
  };
  
  // draw the rectangles
  rectGroup.append("rect")
    .attr("class", "tile")
    .attr("width", d => d["x1"] - d["x0"])
    .attr("height", d => d["y1"] - d["y0"])
    .attr("data-name", d => d["data"]["name"])
    .attr("data-category", d=> d["data"]["category"])
    .attr("data-value", d => d["data"]["value"])
    .attr("fill", d => colorScale(d["data"]["category"]))
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);
  
  // rectangle description
  rectGroup.append("text")
    .attr("class", "rectText")
    .selectAll('tspan')
    .data(d => d["data"]["name"].split(/(?=[A-Z][^A-Z])/g))
    .enter()
    .append('tspan')
    .attr('x', 5)
    .attr('y', (d, i) =>(1 + i) * 10)
    .text(d =>  d)
    
  // legend
  const legend = d3.select("#legend")
  
  const legendGroup = legend.append("g")
   .attr('transform', 'translate(0,0)')
  
  legendGroup.selectAll("rect")
    .data(dataset["children"].map(d => d["name"]))
    .enter()
    .append('rect')
    .attr('class', 'legend-item')
    .attr("x", (d, i) => (2 + i) * 20)
    .attr("y", 20)
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", d => colorScale(d))
  
  legendGroup.selectAll("text")
    .data(dataset["children"].map(d => d["name"]))
    .enter()
    .append('text')
    .attr("class", "legendText")
    .attr('x', (d, i) => (2.5 + i) * 20)
    .attr('y', 50)
    .text(d => d)
}

d3.json(videoGameURL).then(data => {
  dataset = data;
  treeMap(dataset);
})