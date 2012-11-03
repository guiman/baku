define(['zepto', 'd3'], function($, d3){
  var svg_element;
  var current_data_length = 0;
  
  function start(){
    
    //Create elements
    $('body').append('<div id="paleta"></div>');
    svg_element = d3.select("#paleta").append("svg").attr("width", 1600).attr("height", 900);
    
    //Create one circle per signal that could be received
    for (i = 0; i < 3 ; i ++)
    {
      svg_element.append("circle").style("stroke", "green").style("fill", "green").attr("id", "circle_"+i).attr("cx", 10 * (i + 1)).attr("cy", 10).attr("r", 10);
    }
   
  };

  function render(data)
  {  
    if (data.length != current_data_length)
    {
      current_data_length = data.length;
    }
    
    for (i = current_data_length; i < 3 ; i ++)
    {
      svg_element.select("#circle_"+i).attr("r", 0);
    }
    
    refresh_circle(data);
  };
  
  function refresh_circle(data)
  {
    for (i = 0; i < current_data_length ; i ++)
    {
      svg_element.select("#circle_"+i).attr("cx", data[i][0]).attr("cy", data[i][1]).attr("r", 10);
    }    
  }

  return {
    initialize: start,
    render: render
  }
});