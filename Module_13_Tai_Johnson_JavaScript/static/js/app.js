date_conversion();

all_data();


//########      HELPER FUNCTIONS       ########//

// Helper function to gather unique values to fill filter options choices
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

// Helper function for loading all data 
// and fill filter options choices on page opening or refreshing
function all_data() {
    //Lists to get unique values to populate filters
    var citiesList = [];  
    var statesList = [];
    var countryList = [];
    var shapesList = [];

    //Selections for neccessary elements
    var tbody = d3.select("tbody");
    var selects_clear = d3.selectAll("select");
    var citySelectInputs = d3.select("#citySelect");
    var stateSelectInputs = d3.select("#stateSelect");
    var countrySelectInputs = d3.select("#countrySelect");
    var shapeSelectInputs = d3.select("#shapeSelect");

    //Clearing data so not to concatenate on each filter occurence
    tbody.html("");
    selects_clear.html("");

    //Add all values to respective lists and fill in table row elements
    data.forEach(object => {
        var tr = tbody.append("tr");
        citiesList.push(object.city);
        statesList.push(object.state);
        countryList.push(object.country);
        shapesList.push(object.shape);

        //Fill in data for initial table of full data set
        Object
            .values(object)
            .forEach((object) => {
                tr.append("td").text(object);
            });
    });

    //Filter unique values from values lists
    var uniqueCitiesList = citiesList.filter(onlyUnique);
    uniqueCitiesList.sort();
    var uniqueStatesList = statesList.filter(onlyUnique);
    uniqueStatesList.sort();
    var uniqueCountryList = countryList.filter(onlyUnique);
    uniqueCountryList.sort();
    var uniqueShapesList = shapesList.filter(onlyUnique);
    uniqueShapesList.sort();

    //Fill in options for filters
    uniqueCitiesList.forEach(item => citySelectInputs.append("option").text(item));
    uniqueStatesList.forEach(item => stateSelectInputs.append("option").text(item));
    uniqueCountryList.forEach(item => countrySelectInputs.append("option").text(item));
    uniqueShapesList.forEach(item => shapeSelectInputs.append("option").text(item));

};


// Helper function for converting dates into ISO format
function date_conversion() {
    data.forEach((object) => {
        var date_conversion = object.datetime.split("/");
        if (parseInt(date_conversion[1]) < 10) { date_conversion[1] = "0" + date_conversion[1] };
        if (parseInt(date_conversion[0]) < 10) { date_conversion[0] = "0" + date_conversion[0] };
        object.datetime = date_conversion[2] + "-" +
            date_conversion[0] + "-" + date_conversion[1];
    });
};


// Helper function that displays the data based on the users input in the date picker field
function filter_by_date() {
    var tbody = d3.select("tbody");
    tbody.html("");

    var filter_by_date_element = d3.select("#datetime");
    var filter_by_date = filter_by_date_element.property("value");

    data.forEach(object => {
        if(object.datetime == filter_by_date) {
            var tr = tbody.append("tr");
            Object
                .values(object)
                .forEach((object) => {
                    tr.append("td").text(object);
                });
        };        
    });
};

// Helper function to filter by city of user choice
function filterByCity() {
    var tbody = d3.select("tbody");
    tbody.html("");
    
    var filterByCityChoice = d3.select("#citySelect").property("value");

    data.forEach(object => {
        if(object.city == filterByCityChoice) {
            var tr = tbody.append("tr");
            Object
                .values(object)
                .forEach((object) => {
                    tr.append("td").text(object);
                });
        };        
    });
};

// Helper function to filter by state of user choice
function filterByState() {
    var tbody = d3.select("tbody");
    tbody.html("");

    var filterByStateChoice = d3.select("#stateSelect").property("value");

    data.forEach(object => {
        if(object.state == filterByStateChoice) {
            var tr = tbody.append("tr");
            Object
                .values(object)
                .forEach((object) => {
                    tr.append("td").text(object);
                });
        };        
    });
};


// Helper function to filter by country of user choice
function filterByCountry() {
    var tbody = d3.select("tbody");
    tbody.html("");

    var filterByCountryChoice = d3.select("#countrySelect").property("value");

    data.forEach(object => {
        if(object.country == filterByCountryChoice) {
            var tr = tbody.append("tr");
            Object
                .values(object)
                .forEach((object) => {
                    tr.append("td").text(object);
                });
        };        
    });
};

// Helper function to filter by shape of user choice
function filterByShape() {
    var tbody = d3.select("tbody");
    tbody.html("");

    var filterByShapeChoice = d3.select("#countrySelect").property("value");

    data.forEach(object => {
        if(object.shape == filterByShapeChoice) {
            var tr = tbody.append("tr");
            Object
                .values(object)
                .forEach((object) => {
                    tr.append("td").text(object);
                });
        };        
    });
};