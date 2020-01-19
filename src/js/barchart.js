// import * as d3 from "d3";

export function barchart() {
  let data = [
    ["Gemiddelde Amsterdam", 28],
    ["jou locatie",18],
    ["Persoonlijke uitstoot", 12]
  ];


  let chart = document.getElementById("chart");
  if(chart) {
    let axisMargin = 20,
      margin = 20,
      valueMargin = 4,
      width = document.querySelector('.container').offsetWidth,
      height = 300,
      barHeight = (height - axisMargin - margin * 2) * 0.4 / data.length,
      barPadding = (height - axisMargin - margin * 2) * 0.2 / data.length,
      bar, svg, scale, xAxis, labelWidth = 0;
    let MaxHeight = height - 100;

    let max = d3.max(data.map(function (i) {
      return i[1];
    }));

    svg = d3.select(chart)
      .append("svg")
      .attr("width", width + 60)
      .attr("height", MaxHeight);


    bar = svg.selectAll("g")
      .data(data)
      .enter()
      .append("g");

    bar.attr("class", "bar")
      .attr("cx", 0)
      .attr("transform", function (d, i) {
        return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
      });

    bar.append("text")
      .attr("class", "label")
      .attr("y", barHeight / 2)
      .attr("dy", ".35em") //vertical align middle
      .text(function (d) {
        return d[0];
      }).each(function () {
      labelWidth = Math.ceil(Math.max(labelWidth + 60, this.getBBox().width));
    });

    scale = d3.scale.linear()
    // .domain([0, max])
      .domain([0, 50])
      .range([0, width - margin * 2 - labelWidth]);

    xAxis = d3.svg.axis()
      .scale(scale)
      .tickSize(-height + 2 * margin + axisMargin)
      .orient("bottom");

    bar.append("rect")
      .attr("transform", "translate(" + labelWidth + ", 0)")
      .attr("height", barHeight)
      .attr("width", 0)
      .transition()
      .duration(2000)//time in ms
      .delay(function (d, i) {
        return i * 250
      })//a different delay for each bar
      .attr("width", function (d) {
        return scale(d[1]);
      });

    bar.append("text")
      .attr("class", "value")
      .attr("y", barHeight / 2)
      .attr("dx", -valueMargin + labelWidth + 70) //margin right
      .attr("dy", ".35em") //vertical align middle
      .attr("text-anchor", "end")
      .text(function (d) {
        return d[1] + 'ug/m3';
      })
      .attr("x", 0)
      .transition()
      .duration(2000)//time in ms
      .delay(function (d, i) {
        return i * 250
      })//a different delay for each bar
      .attr("x", function (d) {
        let width = this.getBBox().width;
        return Math.max(width + valueMargin, scale(d[1]));
      });

    svg.insert("g", ":first-child")
      .attr("class", "axis")
      .attr("transform", "translate(" + (margin + labelWidth) + "," + (MaxHeight - margin - barPadding) + ")")
      .call(xAxis);
  }
}


export default barchart;
