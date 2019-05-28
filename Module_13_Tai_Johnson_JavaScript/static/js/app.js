var filter_date = "";
var date_conversion = "";

data.forEach((object) => {
    date_conversion = object.datetime.split("/");
    if(parseInt(date_conversion[1]) < 10){date_conversion[1] = "0" + date_conversion[1]};
    if(parseInt(date_conversion[0]) < 10){date_conversion[0] = "0" + date_conversion[0]};
    object.datetime = date_conversion[2] + "-" + 
        date_conversion[0] + "-" + date_conversion[1];
});

var k = '<tbody>'
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
