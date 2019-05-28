var filter_date = "";

date_conversion();

var k = '<tbody>';
all_data();

filter_date = document.getElementById("datetime").value;
console.log(`filter date is ${filter_date}`);




//########      HELPER FUNCTIONS       ########//


// Helper function for loading all data
function all_data(){
    data.forEach((object) => {
        k += '<tr>';
        k += '<td>' + object.datetime + '</td>';
        k += '<td>' + object.city + '</td>';
        k += '<td>' + object.state + '</td>';
        k += '<td>' + object.country + '</td>';
        k += '<td>' + object.shape + '</td>';
        k += '<td>' + object.durationMinutes + '</td>';
        k += '<td>' + object.comments + '</td>';
        k += '</tr>';
    });
    k += '</tbody>';
    
    afterThead = document.getElementsByTagName('thead');
    afterThead[0].insertAdjacentHTML("afterend", k);
};


// Helper function for converting dates into ISO format
function date_conversion(){
    data.forEach((object) => {
        var date_conversion = object.datetime.split("/");
        if(parseInt(date_conversion[1]) < 10){date_conversion[1] = "0" + date_conversion[1]};
        if(parseInt(date_conversion[0]) < 10){date_conversion[0] = "0" + date_conversion[0]};
        object.datetime = date_conversion[2] + "-" + 
            date_conversion[0] + "-" + date_conversion[1];
    });
};


// Helper function that displays the data based on the users input in the date picker field
// resets to show all data if date picker is reset
function filter_by_date(filter_date) {
    filter_date = document.getElementById("datetime").value;
    console.log(filter_date);

    var child = document.getElementsByTagName("tbody");
    child[0].parentNode.removeChild(child[0]);    

    k = '<tbody>'
    data.forEach((object) => {
        if(object.datetime == filter_date) {
            k += '<tr>';
            k += '<td>' + object.datetime + '</td>';
            k += '<td>' + object.city + '</td>';
            k += '<td>' + object.state + '</td>';
            k += '<td>' + object.country + '</td>';
            k += '<td>' + object.shape + '</td>';
            k += '<td>' + object.durationMinutes + '</td>';
            k += '<td>' + object.comments + '</td>';
            k += '</tr>';
        };    
    });
    k += '</tbody>';

    afterThead = document.getElementsByTagName('thead');
    afterThead[0].insertAdjacentHTML("afterend", k);
}