import * as d3 from 'd3';

export const generateChart = ({ id, data, yValues }) => {
  var margin = { top: 30, right: 30, bottom: 100, left: 40 };
  const width = 450;
  const height = 400;
  var svg = d3
    .select(`#${id}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)  
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // setting up x-axis
  var xscale = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return d.title;
      }),
    );

  // adding label for x-axis
  var xAxisTranslate = height - margin.bottom;
  var x_axis = d3.axisBottom(xscale);
  svg
    .append('g')
    .attr('transform', 'translate(10,' + xAxisTranslate + ')')
    .call(x_axis)
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    // .append('text')
    // .attr('y', 40)
    // .attr('x', width - 100)
    // .attr('text-anchor', 'end')
    // .attr('stroke', 'red')
    // .text(xLabel);

  var yscale = d3
    .scaleLinear()
    .domain([8, d3.max(yValues)])
    .range([height - 100, 0]);

  var y_axis = d3.axisLeft().scale(yscale);

  svg
    .append('g')
    .attr('transform', 'translate(10, 0)')
    .call(y_axis)
    // .append('text')
    // .attr('transform', 'rotate(-90)')
    // .attr('y', 20)
    // .attr('dy', '-5.1em')
    // .attr('text-anchor', 'end')
    // .attr('stroke', 'red')
    // .text(yLabel);

  // adding bars
  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function (d) {
      return xscale(d.title)+25;
    })
    .attr('y', function (d) {
      return yscale(d.vote_average)-100;
    })
    .attr('width', xscale.bandwidth() - 30)
    .attr('height', function (d) {
      return height - yscale(d.vote_average);
    })
    .append('title')
    .text((d) => `${d.title} was rated ${d.vote_average}} by ${d.vote_count} people`);
};
