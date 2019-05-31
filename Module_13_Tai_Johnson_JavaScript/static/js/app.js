date_conversion();

all_data();


var filter_date = document.getElementById("datetime").value;
console.log(`filter date is ${filter_date}`);


//########      HELPER FUNCTIONS       ########//


// Helper function for loading all data on page opening or refreshing
function all_data(){
    var tbody = d3.select("tbody");

    data.forEach(object => {
        tbody.append("tr");
      });

    data.forEach(object => {
    var tr = tbody.append("tr");  
    Object 
      .values(object)
      .forEach((object) => {
        tr.append("td").text(object);
    });
  });
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


// Helper function that displays the data based on the users input in the date pictdataer field
// resets to show all data if date pictdataer is reset
function filter_by_date(filter_date) {
    filter_date = document.getElementById("datetime").value;
    console.log(filter_date);

    var child = document.getElementsByTagName("tbody");
    child[0].parentNode.removeChild(child[0]);    

    tdata = '<tbody>'
    data.forEach((object) => {
        if(object.datetime == filter_date) {
            tdata += '<tr>';
            tdata += '<td>' + object.datetime + '</td>';
            tdata += '<td>' + object.city + '</td>';
            tdata += '<td>' + object.state + '</td>';
            tdata += '<td>' + object.country + '</td>';
            tdata += '<td>' + object.shape + '</td>';
            tdata += '<td>' + object.durationMinutes + '</td>';
            tdata += '<td>' + object.comments + '</td>';
            tdata += '</tr>';
        };    
    });
    tdata += '</tbody>';

    afterThead = document.getElementsByTagName('thead');
    afterThead[0].insertAdjacentHTML("afterend", tdata);
};