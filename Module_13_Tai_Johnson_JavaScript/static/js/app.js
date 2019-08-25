
date_conversion();

filtersSetup();

all_data();


function user_filtered_data(){

    var filterByDateChoice = d3.select("#dateSelect").property("value");
    var filterByCityChoice = d3.select("#citySelect").property("value");
    var filterByStateChoice = d3.select("#stateSelect").property("value");
    var filterByCountryChoice = d3.select("#countrySelect").property("value");
    var filterByShapeChoice = d3.select("#shapeSelect").property("value");

    filters = {
    datetime: [filterByDateChoice],
    city: [filterByCityChoice],
    state:[filterByStateChoice],
    country:[filterByCountryChoice],
    shape:[filterByShapeChoice]
    };

    var filtered_data = multiFilter(data, filters);

    function multiFilter(array, filters) {

        const filterKeys = Object.keys(filters);
        // filters all elements passing the criteria
        return array.filter((item) => {
            // dynamically validate all filter criteria
            return filterKeys.every(key => {
                // ignores an empty filter
                if (filters[value].length == 0) return true;
                return filters[key].includes(item[key]);
            });
        });
    }

    var tbody = d3.select("tbody");

    //Clear data so not to concatenate on each filter occurence
    tbody.html("");

    //Iterate through the data list and append rows
    filtered_data.forEach(object => {
        var tr = tbody.append("tr");

        //Fill in data for initial table of full data set
        Object
            .values(object)
            .forEach((object) => {
                tr.append("td").text(object);
            });
    });

}


//########      HELPER FUNCTIONS       ########//

// Helper function to gather unique values to fill filter options choices
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// Function for loading all data 
function all_data() {

    //Select the table body
    var tbody = d3.select("tbody");

    //Clear data so not to concatenate on each filter occurence
    tbody.html("");

    //Iterate through the data list and append rows
    data.forEach(object => {
        var tr = tbody.append("tr");

        //Fill in data for initial table of full data set
        Object
            .values(object)
            .forEach((object) => {
                tr.append("td").text(object);
            });
    });
};

// Helper function that setups and fills in options for filters
function filtersSetup() {

    var datesList = [];
    var citiesList = [];
    var statesList = [];
    var countryList = [];
    var shapesList = [];

    var dateSelectInputs = d3.select("#dateSelect");
    var citySelectInputs = d3.select("#citySelect");
    var stateSelectInputs = d3.select("#stateSelect");
    var countrySelectInputs = d3.select("#countrySelect");
    var shapeSelectInputs = d3.select("#shapeSelect");

    data.forEach(object => {
        datesList.push(object.datetime);
        citiesList.push(object.city);
        statesList.push(object.state);
        countryList.push(object.country);
        shapesList.push(object.shape);

    });

    // We only need unique options for the filters
    var uniqueDatesList = datesList.filter(onlyUnique);
    // uniqueDatesList.push("");
    uniqueDatesList.sort();
    var uniqueCitiesList = citiesList.filter(onlyUnique);
    // uniqueCitiesList.push("");
    uniqueCitiesList.sort();
    var uniqueStatesList = statesList.filter(onlyUnique);
    // uniqueStatesList.push("");
    uniqueStatesList.sort();
    var uniqueCountryList = countryList.filter(onlyUnique);
    // uniqueCountryList.push("");
    uniqueCountryList.sort();
    var uniqueShapesList = shapesList.filter(onlyUnique);
    uniqueShapesList.push("");
    uniqueShapesList.sort();

    //Fill in options for filters
    uniqueDatesList.forEach(item => dateSelectInputs.append("option").text(item));
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


// // Helper function to filter by city of user choice
// function filterByDate() {
//     var tbody = d3.select("tbody");
//     tbody.html("");

//     var filterByDateChoice = d3.select("#dateSelect").property("value");

//     data.forEach(object => {
//         if (object.datetime == filterByDateChoice) {
//             var tr = tbody.append("tr");
//             Object
//                 .values(object)
//                 .forEach((object) => {
//                     tr.append("td").text(object);
//                 });
//         };
//     });
// };


// // Helper function to filter by city of user choice
// function filterByCity() {
//     var tbody = d3.select("tbody");
//     tbody.html("");

//     var filterByCityChoice = d3.select("#citySelect").property("value");

//     data.forEach(object => {
//         if (object.city == filterByCityChoice) {
//             var tr = tbody.append("tr");
//             Object
//                 .values(object)
//                 .forEach((object) => {
//                     tr.append("td").text(object);
//                 });
//         };
//     });
// };

// // Helper function to filter by state of user choice
// function filterByState() {
//     var tbody = d3.select("tbody");
//     tbody.html("");

//     var filterByStateChoice = d3.select("#stateSelect").property("value");

//     data.forEach(object => {
//         if (object.state == filterByStateChoice) {
//             var tr = tbody.append("tr");
//             Object
//                 .values(object)
//                 .forEach((object) => {
//                     tr.append("td").text(object);
//                 });
//         };
//     });
// };


// // Helper function to filter by country of user choice
// function filterByCountry() {
//     var tbody = d3.select("tbody");
//     tbody.html("");

//     var filterByCountryChoice = d3.select("#countrySelect").property("value");

//     data.forEach(object => {
//         if (object.country == filterByCountryChoice) {
//             var tr = tbody.append("tr");
//             Object
//                 .values(object)
//                 .forEach((object) => {
//                     tr.append("td").text(object);
//                 });
//         };
//     });
// };

// // Helper function to filter by shape of user choice
// function filterByShape() {
//     var tbody = d3.select("tbody");
//     tbody.html("");

//     var filterByShapeChoice = d3.select("#shapeSelect").property("value");

//     data.forEach(object => {
//         if (object.shape == filterByShapeChoice) {
//             var tr = tbody.append("tr");
//             Object
//                 .values(object)
//                 .forEach((object) => {
//                     tr.append("td").text(object);
//                 });
//         };
//     });
// };



