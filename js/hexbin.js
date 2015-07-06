function display_svg() {

if (document.getElementsByTagName("svg").length>0) {
  console.log(document.getElementsByTagName("svg").length);
  // var parent = document.getElementsByTagName("body");
  // var child = document.getElementsByTagName("svg")[0];
  // var throwawaynode = parent.removeChild(child);
  return;
} else {

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var randomX = d3.random.normal(width / 2, 80),
      randomY = d3.random.normal(height / 2, 80),
      points = d3.range(250).map(function() { return [randomX(), randomY()]; });

  var color = d3.scale.linear()
      .domain([0, 10])
      .range(["white", "dimgrey"])
      .interpolate(d3.interpolateLab);

  var hexbin = d3.hexbin()
      .size([width, height])
      .radius(10);

  var x = d3.scale.identity()
      .domain([0, width]);

  var y = d3.scale.linear()
      .domain([0, height])
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(6, -height);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(6, -width);


  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([0, 0])
    .html(function(d) {
      return "<span style='color:orangered'>"+ Math.floor(d.x) + ", " + Math.floor(d.y) + "</span>";
    });

  var svg = d3.select("section").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("class", "mesh")
      .attr("width", width)
      .attr("height", height);

  svg.append("g")
      .attr("clip-path", "url(#clip)")
    .selectAll(".hexagon")
      .data(hexbin(points))
    .enter().append("path")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr("class", "hexagon")
      .attr("d", hexbin.hexagon())
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .style("fill", function(d) { return color(d.length); });

  // svg.append("g")
  //     .attr("class", "y axis")
  //     .call(yAxis);

  // svg.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis);

  svg.call(tip);
}


}