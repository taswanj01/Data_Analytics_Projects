//Set our SVG dimensions
var svgWidth = 960;
var svgHeight = 620;

//Set our borders around the SVG
var margin = {
    top: 20,
    right: 40,
    bottom: 200,
    left: 100
};

//Set chart width and height
var width = svgWidth - margin.right - margin.left;
var height = svgHeight - margin.top - margin.bottom;

//Append our div for the chart
var chart = d3
    .select("#scatter")
    .append("div")
    .classed("chart", true);

//Create variable for our chart
var svg = chart
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//Group for the SVG
var chartGroup = svg   
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Initial Axes
var userChoiceXAxis = "poverty";
var userChoiceYAxis = "healthcare";


//Read in our CSV and append the data to our chart
d3.csv("./data/censusData.csv").then(function(censusData) {

    //console.log(censusData);

    //Change strings to floats
    censusData.forEach(function(data) {
        data.obesity =+ data.obesity;
        data.income =+ data.income;
        data.smokes =+ data.smokes;
        data.age =+ data.age;
        data.healthcare =+ data.healthcare;
        data.poverty =+ data.poverty;
    });

    //Create first linear scales
    var xLinearScale = xScale(censusData, userChoiceXAxis);
    var yLinearScale = yScale(censusData, userChoiceYAxis);

    //Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Append x axis
    var xAxis = chartGroup
        .append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    //Append y axis
    var yAxis = chartGroup
        .append("g")
        .classed("y-axis", true)
        .call(leftAxis);

    //Append initial circles
    var circlesGroup = chartGroup
        .selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx", d => xLinearScale(d[userChoiceXAxis]))
        .attr("cy", d => yLinearScale(d[userChoiceYAxis]))
        .attr("r", 12)
        .attr("opacity", ".5");

    //Append initial text
    var textGroup = chartGroup
        .selectAll(".stateText")
        .data(censusData)
        .enter()
        .append("text")
        .classed("stateText", true)
        .attr("x", d => xLinearScale(d[userChoiceXAxis]))
        .attr("y", d => yLinearScale(d[userChoiceYAxis]))
        .attr("dy", 3)
        .attr("font-size", "10px")
        .text(function(d){return d.abbr});

    //Create group for 3 x-axis labels
    var xLabelsGroup = chartGroup
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20 + margin.top})`);

    var povertyLabel = xLabelsGroup
        .append("text")
        .classed("aText", true)
        .classed("active", true)
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "poverty")
        .text("In Poverty (%)");

    var ageLabel = xLabelsGroup
        .append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "age")
        .text("Age (Median)")

    var incomeLabel = xLabelsGroup
        .append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "income")
        .text("Household Income (Median)")

    //create group for 3 y-axis labels
    var yLabelsGroup = chartGroup
        .append("g")
        .attr("transform", `translate(${0 - margin.left/4}, ${(height/2)})`);

    var healthcareLabel = yLabelsGroup
        .append("text")
        .classed("aText", true)
        .classed("active", true)
        .attr("x", 0)
        .attr("y", 0 - 20)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .attr("value", "healthcare")
        .text("Lacks Healthcare (%)");

    var smokesLabel = yLabelsGroup
        .append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 0 - 40)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .attr("value", "smokes")
        .text("Smokes (%)");

    var obesityLabel = yLabelsGroup
        .append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 0 - 60)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .attr("value", "obesity")
        .text("Obese (%)");

    //updateToolTip function with data
    var circlesGroup = updateToolTip(userChoiceXAxis, userChoiceYAxis, circlesGroup);

    //x axis labels event listener
    xLabelsGroup.selectAll("text")
        .on("click", function() {
            //get value of selection
            var value = d3
                .select(this)
                .attr("value");

            //check if value is same as current axis
            if (value != userChoiceXAxis) {

                userChoiceXAxis = value;  //change userChoiceXAxis with value
                xLinearScale = xScale(censusData, userChoiceXAxis);  //update x scale for new data
                xAxis = renderAxesX(xLinearScale, xAxis);  //update x axis with transition

                //update circles with new x values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, userChoiceXAxis, yLinearScale, userChoiceYAxis);

                //update text with new x values
                textGroup = renderText(textGroup, xLinearScale, userChoiceXAxis, yLinearScale, userChoiceYAxis);

                //update tooltips with new info
                circlesGroup = updateToolTip(userChoiceXAxis, userChoiceYAxis, circlesGroup);

                //change classes to change bold text
                if (userChoiceXAxis === "poverty") {
                    povertyLabel.classed("active", true).classed("inactive", false);
                    ageLabel.classed("active", false).classed("inactive", true);
                    incomeLabel.classed("active", false).classed("inactive", true);
                }
                else if (userChoiceXAxis === "age") {
                    povertyLabel.classed("active", false).classed("inactive", true);
                    ageLabel.classed("active", true).classed("inactive", false);
                    incomeLabel.classed("active", false).classed("inactive", true);
                }
                else {
                    povertyLabel.classed("active", false).classed("inactive", true);
                    ageLabel.classed("active", false).classed("inactive", true);
                    incomeLabel.classed("active", true).classed("inactive", false);
                }
            }
        });

    //y axis labels event listener
    yLabelsGroup.selectAll("text")
    .on("click", function() {
        //get value of selection
        var value = d3
            .select(this)
            .attr("value");

        //check if value is same as current axis
        if (value != userChoiceYAxis) {

            //replace userChoiceYAxis with value
            userChoiceYAxis = value;

            //update y scale for new data
            yLinearScale = yScale(censusData, userChoiceYAxis);

            //update x axis with transition
            yAxis = renderAxesY(yLinearScale, yAxis);

            //update circles with new y values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, userChoiceXAxis, yLinearScale, userChoiceYAxis);

            //update text with new y values
            textGroup = renderText(textGroup, xLinearScale, userChoiceXAxis, yLinearScale, userChoiceYAxis)

            //update tooltips with new info
            circlesGroup = updateToolTip(userChoiceXAxis, userChoiceYAxis, circlesGroup);

            //change classes to change bold text
            if (userChoiceYAxis === "obesity") {
                obesityLabel.classed("active", true).classed("inactive", false);
                smokesLabel.classed("active", false).classed("inactive", true);
                healthcareLabel.classed("active", false).classed("inactive", true);
            }
            else if (userChoiceYAxis === "smokes") {
                obesityLabel.classed("active", false).classed("inactive", true);
                smokesLabel.classed("active", true).classed("inactive", false);
                healthcareLabel.classed("active", false).classed("inactive", true);
            }
            else {
                obesityLabel.classed("active", false).classed("inactive", true);
                smokesLabel.classed("active", false).classed("inactive", true);
                healthcareLabel.classed("active", true).classed("inactive", false);
            }
        }
    });
});


//************************** HELPER FUNCTIONS *************************//

//Functions used for updating x-scale upon clicking on axis label
function xScale(censusData, userChoiceXAxis) {
    //create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d[userChoiceXAxis]) * 0.6,
            d3.max(censusData, d => d[userChoiceXAxis]) * 1.1])
        .range([0, width]);

    return xLinearScale;
}

function renderAxesX(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

//Functions used for updating xAxis upon click on axis label
function yScale(censusData, userChoiceYAxis) {
    //create scales
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d[userChoiceYAxis]) * 0.6,
            d3.max(censusData, d => d[userChoiceYAxis]) * 1.1])
        .range([height, 0]);

    return yLinearScale;
}

function renderAxesY(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}


//Function used for updating circles group with a transition to new circles
//for change in x axis or y axis
function renderCircles(circlesGroup, newXScale, userChoiceXAxis, newYScale, userChoiceYAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", data => newXScale(data[userChoiceXAxis]))
        .attr("cy", data => newYScale(data[userChoiceYAxis]));

    return circlesGroup;
}

//Function used for updating state labels with a transition to new 
function renderText(textGroup, newXScale, userChoiceXAxis, newYScale, userChoiceYAxis) {

    textGroup.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[userChoiceXAxis]))
        .attr("y", d => newYScale(d[userChoiceYAxis]));

    return textGroup;
}

//Function to stylize x-axis values for tooltips
function styleX(value, userChoiceXAxis) {

    if (userChoiceXAxis === 'poverty') {    
        return `${value}%`;   //poverty percentage
    } else if (userChoiceXAxis === 'income') {
        return `$${value}`;  //household income in dollars
    } else {
        return `${value}`;  //age (number)
    }
}

//Function used for updating circles group with new tooltip
function updateToolTip(userChoiceXAxis, userChoiceYAxis, circlesGroup) {
    // X label
    if (userChoiceXAxis === 'poverty') {
        var xLabel = "Poverty:";  //poverty percentage
    } else if (userChoiceXAxis === 'income') {
        var xLabel = "Median Income:";  //household income in dollars
    } else {
        var xLabel = "Age:";  //age (number)
    }

    // Y label
    if (userChoiceYAxis === 'healthcare') {
        var yLabel = "No Healthcare:"; //percentage lacking healthcare
    } else if (userChoiceYAxis === 'obesity') {
        var yLabel = "Obesity:"; //percentage obese
    } else {
        var yLabel = "Smokers:"; //smoking percentage
    }

    //Setup tooltip
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) {
            return (`${d.state}<br>${xLabel} ${styleX(d[userChoiceXAxis], 
                userChoiceXAxis)}<br>${yLabel} ${d[userChoiceYAxis]}%`);
        });

    circlesGroup.call(toolTip);

    //add events
    circlesGroup.on("mouseover", toolTip.show)
    .on("mouseout", toolTip.hide);

    return circlesGroup;
}