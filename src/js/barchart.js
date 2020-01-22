// import * as d3 from "d3";

export function barchart() {

  // need to clean up and stuffff


  let chart = document.getElementById("chart");
  if(chart) {



    let dataSetUserFurnace = JSON.parse(localStorage.getItem('furnace'));
    let dataSetUserThermostat = JSON.parse(localStorage.getItem('thermostat'));
    let dataSetUserShower = JSON.parse(localStorage.getItem('shower'));
    let dataSetUserTravel = JSON.parse(localStorage.getItem('travel'));

    let furnaceValue = dataSetUserFurnace.noxValue;
    let thermostatValue = dataSetUserThermostat.noxValue;
    let showerValue = dataSetUserShower.noxValue;
    let travelValue = 0;
    for(let item in dataSetUserTravel){
      travelValue += dataSetUserTravel[item].noxValue;
    }
    const totalNox = furnaceValue + thermostatValue + showerValue + travelValue;
    const roundNox =  Math.round( totalNox * 10 ) / 10;
    console.log(roundNox );

    let field = document.querySelector('.resultValue');
    let fieldAv = document.querySelector('.advise_text');
    let unitGram  = " gram";
    let unitMicro  = " ug/m3";

    let noxYourLocation = JSON.parse(localStorage.getItem('nox'));

    field.innerHTML = roundNox + unitGram;

    if(roundNox > 10 && roundNox < 50){
      fieldAv.innerHTML = "ligt boven het gemiddelde";
    }else if(roundNox > 5 && roundNox < 10){
      fieldAv.innerHTML = "is gemiddeld";
    }else if(roundNox > 5 && roundNox < 6){
      fieldAv.innerHTML = "ligt onder het gemiddelde";
    }
    else if(roundNox < 5){
      fieldAv.innerHTML = "ligt ver onder het gemiddelde";
    }
    else if(roundNox > 50){
      fieldAv.innerHTML = "ligt ver boven het gemiddelde";
    }



    let data = [
      ["Gemiddelde Amsterdam", 28],
      ["Jouw locatie",noxYourLocation.noxValue],
      ["Persoonlijke uitstoot", roundNox]
    ];


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
    .domain([0, max])
    //   .domain([0, 100])
      .range([0, width - margin * 2 - labelWidth]);

    xAxis = d3.svg.axis()
      .scale(scale)
      .tickSize(-height + 2 * margin + axisMargin)
      .orient("bottom");

    bar.append("rect")
      .attr("transform", "translate(" + labelWidth + ", 0)")
      .attr("height", barHeight)
      .attr("width", 0)
      .style("opacity",function(d){
        if(d[0] === "Persoonlijke uitstoot"){
          return  1.0;
        }else{
          return .3;
        }
      })
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
        if(d[0] === "Persoonlijke uitstoot"){
          return d[1] + unitGram;
        }else{
          return d[1] + unitMicro;
        }

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
