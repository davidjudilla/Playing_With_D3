/* --------- Bar Charts using CSS--------- */ 
var dataset = [];
for (var i = 0; i < 25; i++) {
	dataset.push(Math.round(Math.random() * 30));
}

d3.select("body").append("div").attr("id", "bars")
	.selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) {
    	var height = d * 5;
    	return height + "px";
    });

/* -------- Charts using SVG ------------ */
svgCircleW = 500;
svgCircleH = 100;
svgDataset = [5, 10, 15, 20, 25];

//recall cascading methods, where they return "this" or the object it's working on 
var svg1 = d3.select("body")
			.append("div").attr("id", "svgCircles")
			.append("svg"); 
svg1.attr("width", svgCircleW)
	.attr("height", svgCircleH);
	/*
	Can also be written as 
		var svg1 = d3.select("body")
					.append("svg"); 
					.attr("width", 500)
					.attr("height", 50);
	*/

var circles = svg1.selectAll("circle")
					.data(svgDataset)
					.enter()
					.append("circle");

// i = circle index in the "circles" objects
// d = data
circles.attr("cx", function(d, i) { 
			return (i * 50) + 25;
		})
		.attr("cy", svgCircleH/2)
		.attr("r", function(d) {
			return d;
		})
		.attr("fill", "yellow")
		.attr("stroke", "orange")
		.attr("stroke-width", function(d) {
			return d/2;
		});

/* --------- Bars redone with SVG ----------- */ 
svgBarsW = 550;
svgBarsH = 175;
var barPadding = 1; 

var svg2 = d3.select("body")
				.append("div").attr("id", "svgBars")
				.append("svg")
				.attr("width", svgBarsW)
				.attr("height", svgBarsH);

var rects = svg2.selectAll("rect")
				.data(dataset)
				.enter()
				.append("rect")
				.attr("x", function(d, i) {
					//data is divided equally across svg
					return i * (svgBarsW / dataset.length);	
				})
				.attr("y", function(d) {
					/*
						remember: when we work with graphics the origin is 
						located at the top left.
					*/
					return svgBarsH - (d * 5); // height - data value
				})
				.attr("width", svgBarsW / dataset.length - barPadding)
				.attr("height", function(d, i) {
					//height doesn't need to be alterd
					return d * 5;
				})
				//.attr("fill", "teal");
				.attr("fill", function(d) {
					return "rgb(0, 0, " + (d * 10) + ")";
				})

/* --- Multivalue Maps ----
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr({
        x: function(d, i) { return i * (w / dataset.length); },
        y: function(d) { return h - (d * 4); },
        width: w / dataset.length - barPadding,
        height: function(d) { return d * 4; },
        fill: function(d) { return "rgb(0, 0, " + (d * 10) + ")"; }
   });
*/		
svg2.selectAll("text")
	.data(dataset)
	.enter()
	.append("text")
	.text(function(d) {
		return d;
	})
	.attr("x", function(d, i) {
		return i * (svgBarsW / dataset.length) + 2;
	})
	.attr("y", function(d, i) {
		return svgBarsH - (d * 5) + 15;
	})
	.attr("font-family", "sans-serif")
	.attr("fill", "white");