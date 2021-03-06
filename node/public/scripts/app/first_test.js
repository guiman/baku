/******************************************************************************

  first_test.js

  Super simple example. Consumes straigtht through the API all the IR position
  information.

******************************************************************************/
define(['zepto', 'd3'], function($, d3){
  var svg_element;

  function start(){
    //Create elements
    $('body').append('<div id="paleta"></div>');
    svg_element = d3.select("#paleta").append("svg").attr("width", 1600).attr("height", 900);
    svg_element.append("circle").style("stroke", "green").style("fill", "green").attr("cx", 10).attr("cy", 10).attr("r", 10);
  };

  function render(data){
    svg_element.select("circle").attr("cx", data[0][0]).attr("cy", data[0][1]);
  };

  return {
    initialize: start,
    render: render
  }
});