// Selectable backgrounds of our map - tile layers:
// grayscale background.
var grayMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoidGFzd2FuaiIsImEiOiJjanhzZ2MyOG0wamQxM2JtYndsYTB1MWd5In0.VgcBRmnumgU58YBWtiEj3g");

// satellite background.
var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoidGFzd2FuaiIsImEiOiJjanhzZ2MyOG0wamQxM2JtYndsYTB1MWd5In0.VgcBRmnumgU58YBWtiEj3g");

// outdoors background.
var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoidGFzd2FuaiIsImEiOiJjanhzZ2MyOG0wamQxM2JtYndsYTB1MWd5In0.VgcBRmnumgU58YBWtiEj3g");

// map object to an array of layers we created.
var map = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [grayMap, satelliteMap, outdoorsMap]
});

// adding one 'grayMap' tile layer to the map.
grayMap.addTo(map);

// layers for two different sets of data, earthquakes and tectonic plates.
var tectonicPlates = new L.LayerGroup();
var earthquakes = new L.LayerGroup();

// base layers
var baseMaps = {
  Satellite: satelliteMap,
  Grayscale: grayMap,
  Outdoors: outdoorsMap
};

// overlays 
var overlayMaps = {
  "Tectonic Plates": tectonicPlates,
  "Earthquakes": earthquakes
};

// control which layers are visible.
L
  .control
  .layers(baseMaps, overlayMaps)
  .addTo(map);

// retrieve earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson", function(data) {


  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // Define the color of the marker based on the magnitude of the earthquake.
  function getColor(magnitude) {
    switch (true) {
      case magnitude > 5:
        return "#EE0000";
      case magnitude > 4:
        return "#EE6F00";
      case magnitude > 3:
        return "#EED700";
      case magnitude > 2:
        return "#8BEE00";
      case magnitude > 1:
        return "#23EE00";
      default:
        return "#0059EE";
    }
  }

  // define the radius of the earthquake marker based on its magnitude.

  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }

    return magnitude * 4;
  }

  // add GeoJSON layer to the map
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }

  }).addTo(earthquakes);

  earthquakes.addTo(map);


  var legend = L.control({
    position: "bottomright"
  });


  legend.onAdd = function() {
    var div = L
      .DomUtil
      .create("div", "info legend");

    var grades = [0, 1, 2, 3, 4, 5];
    var colors = [
      "#0059EE",
      "#23EE00",
      "#8BEE00",
      "#EED700",
      "#EE6F00",
      "#EE0000"
    ];


    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
  };


  legend.addTo(map);

  // retrive Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json",
    function(platedata) {
 
      L.geoJson(platedata, {
        color: "orange",
        weight: 2
      })
      .addTo(tectonicPlates);

      // add the tectonicPlates layer to the map.
      tectonicPlates.addTo(map);
    });
});