// declaration
const w = 900;
const h = 600;
const p = 50;
const urlED = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const urlCD = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const colors = ["#ffffff", "#666633"];
// get data from the api
Promise.all([
  d3.json(urlED),
  d3.json(urlCD)
]).then(data => {
  
  // setting variables
  const datasetED = data[0],
        datasetCD = data[1],
        margin = 50,
        m = { top: margin, right: margin, bottom: margin, left: margin },
        w = 1000 - m.left - m.right,
        h = 600 - m.top - m.bottom;
  const bachelorMin = d3.min(datasetED, d => d.bachelorsOrHigher);
  const bachelorMax = d3.max(datasetED, d => d.bachelorsOrHigher);
  const bachelorDif = bachelorMax - bachelorMin;
  const bachelorPer = bachelorDif * 0.125;
  const legendData = []
  for( let i = 1; i < 9; i++){
    legendData.push(bachelorPer * i)
  }
  
  // map color scale
  const colorScale = d3
    .scaleLinear()
    .domain(d3.extent(datasetED, d => d.bachelorsOrHigher))
    .range(colors);
  
  // title
  d3.select("#container").append("h1").attr("id", "title").text("United States Educational Attainment")

// description
  d3.select("#container").append("h5").attr("id", "description").text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)")
  
  // svg
  const svg = d3
  .select("#container")
  .append("svg")
  .attr("id", "svg")
  .attr("width", w)
  .attr("height", h)
  .attr("viewBox", "0 0 900 600");
  
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
    .attr("data-education", () => datasetED.filter(s => s.fips == d.id)[0].bachelorsOrHigher)
    .html(`${datasetED.filter(i => i.fips == d.id)[0].area_name}, ${datasetED.filter(i => i.fips == d.id)[0].state}: ${datasetED.filter(i => i.fips == d.id)[0].bachelorsOrHigher}%`)
  };
    
  const mouseout = d => {
      tooltip.style("opacity", 0);
  };
  
  // use topojson to draw the map
  topojsonObject = topojson.feature(datasetCD, datasetCD.objects.counties);
  topojsonDataset = topojsonObject.features;
  
  // draw map
  svg.append("g")
    .selectAll("path")
    .data(topojsonDataset)
    .enter()
    .append("path")
    .attr("fill", d => colorScale(datasetED.filter(i => i.fips == d.id)[0].bachelorsOrHigher))
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("data-fips", d => datasetED.filter(s => s.fips == d.id)[0].fips)
    .attr("data-education", d => datasetED.filter(s => s.fips == d.id)[0].bachelorsOrHigher)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);
  
  // legend
  // group container for legend
  const legendGroup = svg.append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${(w / 2) + (margin * 1.5)}, ${margin / 3})`)
  
  const color= d3
    .scaleLinear()
    .domain(d3.extent(datasetED, d => d.bachelorsOrHigher / 100))
    .range(colors);
  
  legendGroup.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", (40 * 8) + 11)
    .attr("height", 19)
    .style("fill", "black")
    .attr("transform", `translate(-2,-2)`)
  
  const legend = d3
    .legendColor()
    .scale(color)
    .cells(8)
    .labelFormat(d3.format(".0%"))
    .orient("horizontal")
    .shape("rect")
    .shapeWidth(40)
    .shapeHeight(15)
    .shapePadding(1);
  
  legendGroup.append("g")
    .attr("id", "legend")
    .attr("transform", "translate(0,0)")
    .call(legend);  
});