angular.module('hockeyStats')
  .directive("barChart", function($parse, $window) {
    return{
      restrict: "EA",
      template: "<svg width='100%' height='400'></svg>",
      link: function(scope, elem, attrs){
        var exp = $parse(attrs.chartData);

        var selectedTeamDataToPlot=exp(scope)["players"];
        var padding = 100;
        var pathClass="path";
        var xScale, yScale, xAxisGen, yAxisGen, lineFun;

        var d3 = $window.d3;
        var rawSvg=elem.find('svg');
        var svg = d3.select(rawSvg[0]);

        scope.$watchCollection(exp, function(newVal, oldVal){
          selectedTeamDataToPlot=newVal;
          console.log(selectedTeamDataToPlot)
          // redrawLineChart();
        });

        function setChartParameters(){
          xScale = d3.scale.ordinal()
                    .domain(selectedTeamDataToPlot.map(function(d){ return d.name; }))
                    .rangeRoundBands([padding + 5, rawSvg[0].clientWidth], .1);
          yScale = d3.scale.linear()
                    .domain([0, d3.max(selectedTeamDataToPlot, function (d) {
                      return d.toi;
                    })])
                    .range([rawSvg.attr("height") - padding, 0]);
          xAxisGen = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")
                      .ticks(selectedTeamDataToPlot.length - 1);
          yAxisGen = d3.svg.axis()
                      .scale(yScale)
                      .orient("left")
                      .ticks(5);
        }

        function drawLineChart() {

          setChartParameters();

          nsvg = d3.select("#bar-chart").select('svg')
          var bar = nsvg.selectAll("g")
                      .data(selectedTeamDataToPlot)
                    .enter()
                      .append("g")
                      .attr("transform",function(d,i){
                        return "translate("+xScale(d.name)+", 0)";
                      });

          bar.append("rect")
            .attr("y", function(d) {
              return yScale(d.toi);
            })
            .attr("x", function(d,i){
              return xScale.rangeBand()-padding/6//+(margin.left/2);
            })
            .attr("height", function(d) {
              return rawSvg.attr("height") -padding - yScale(d.toi);
            })
            .attr("width", xScale.rangeBand());

          svg.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0,300)")
            .call(xAxisGen)//;
            .selectAll("text")
            .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)" );

          svg.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(100,0)")
            .call(yAxisGen);

        }

        drawLineChart();
      }
    }
  })