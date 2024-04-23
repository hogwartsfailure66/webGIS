const confirmButton = document.querySelector("#confirm");
const instructionButton = document.querySelector("#instruction");
const aboutButton = document.querySelector("#about");
const messageDiv = document.querySelector(".message-card");
const messageContent = document.querySelector(".message");
const backdrop = document.querySelector(".backdrop");

const aboutContent = `<h2>Acknowledgments</h2>
    <h3>Data</h3>
    <p>data sources...</p>
    <h3>Libraries</h3>
    <ul>
      <li>Leaflet</li>
      <li>ArcGIS Pro</li>
      <li><a href="https://github.com/Esri/esri-leaflet-geocoder" target='_blank'>esri-leaflet-geocoder</a></li>
      <li><a href='https://github.com/teastman/Leaflet.pattern' target='_blank'>Leaflet.pattern</a> for stripe patterns</li>
      <li><a href='https://fontawesome.com/' target='_blank'>Font Awesome</a> for icons</li>
      <li><a href='https://github.com/pointhi/leaflet-color-markers' target='_blank'>leaflet-color-markers</a></li>
      <li><a href='https://github.com/makinacorpus/Leaflet.GeometryUtil' target='_blank'>Leaflet.GeometryUtil</a> for closest stores/pantries</li>
    </ul>`;

const instructionContent = `<h2>About this project</h2>
   <p>We want to bring attention to the problem of food deserts, specifically in the Bryan/College Station, because living in one can be challenging and can have adverse effects on a person’s health. Negative effects include: nutritional deficiencies, higher incidence of obesity/other weight-related conditions, especially in children, cardiovascular disease.</p>
   <h3>Project Goals</h3>
   <p>The primary goal of our project is to create a user-friendly and interactive map with a comprehensive visual representation of food deserts in Bryan/College Station area.</p>
   <p><b>Enhanced User Engagement:</b> Our project aspires to captivate users, fostering a high degree of engagement. The interactive map is designed not only to be visually appealing but also to encourage users to actively explore and interact with the data.</p>
   <p><b>Inform Decision-Making:</b> Our project provide data and insights to policymakers and community organizations to target solutions for improved food access.
   Identify areas with the greatest need for grocery stores, mobile markets, or improved public transportation to reach existing stores.</b></p>
   <p><b>Raise Awareness:</b> Educate the public on the existence and locations of food deserts in their communities.
   Increase understanding of the impact of food deserts on health and dietary choices.</p>`;

const init = () => {
  confirmButton.addEventListener("click", closeMessageDiv);
  instructionButton.addEventListener("click", showInstruction);
  aboutButton.addEventListener("click", showAbout);
  backdrop.addEventListener("click", closeMessageDiv);
};

const closeMessageDiv = () => {
  messageDiv.classList.remove("show");
  backdrop.classList.remove("show");
};

const showInstruction = () => {
  showMessageDiv(instructionContent);
};

const showAbout = () => {
  console.log("about");
  showMessageDiv(aboutContent);
};

const showMessageDiv = (message) => {
  messageContent.innerHTML = message;
  messageDiv.classList.add("show");
  backdrop.classList.add("show");
};

init();

// map initialization

var map = L.map("map-target").setView([30.6316, -96.3545], 12);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var style_5 = {
  fillColor: "#00ff00",
  color: "#54FF54",
  fillOpacity: 0.5,
};

var style_10 = {
  fillColor: "#D6B715",
  color: "#D6B715",
  fillOpacity: 0.5,
};

var style_20 = {
  fillColor: "#ff4500",
  color: "#ff4500",
  fillOpacity: 0.5,
};

var overlay_style = {
  fillOpacity: 0,
  opacity: 0,
};

var roads_style = {
  color: "#333333",
};

// map legend

var legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 5, 10, 15, 20],
    labels = [];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      getColor(grades[i] + 1) +
      '"></i> ' +
      grades[i] +
      (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }

  return div;
};

legend.addTo(map);

// top legend line marks end of legend

var stripes = new L.StripePattern({ color: "#63625e" });
stripes.addTo(map);

L.geoJSON(all_5, { style: style_5 }).addTo(map);
L.geoJSON(all_10, { style: style_10 }).addTo(map);
L.geoJSON(all_20, { style: style_20 }).addTo(map);
L.geoJSON(all_overlay, {
  style: function (feature) {
    switch (feature.properties.Has_Store) {
      case "FALSE":
        return {
          fillColor: "#555555",
          color: "#555555",
          opacity: 0.8,
          fillOpacity: 0.5,
          fillPattern: stripes,
        };
      case "TRUE":
        return { fillOpacity: 0, opacity: 0 };
    }
  },
}).addTo(map);
L.geoJSON(all_points, {
  pointToLayer: function (feature, latlng) {
    return new L.CircleMarker(latlng, {
      radius: 5,
      fillOpacity: 1,
      color: "black",
      fillColor: getColor(feature.properties.Type),
      weight: 1,
    });
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(
      "<h2>" +
        feature.properties.Name +
        "</h2><h5>Type: " +
        feature.properties.Type +
        "</h5><h5>Address: " +
        feature.properties.Address +
        "</h5>"
    );
  },
}).addTo(map);

L.geoJSON(roads, { style: roads_style }).addTo(map);

function getColor(stype) {
  switch (stype) {
    case "Grocery store":
      return "blue";
    default:
      return "white";
  }
}

// search
const apiKey =
  "AAPKfa9a7a17834e49efa846b458ee800b2aYRQz5AOfQBLVvrszTFhmKAEjKSAeIOKRISoNzJvncrTdBzOnCKi7YYL8vbowyMJ5";

const searchControl = L.esri.Geocoding.geosearch({
  position: "topright",
  placeholder: "Enter an address or place e.g. 1 York St",
  useMapBounds: false,
  providers: [
    L.esri.Geocoding.arcgisOnlineProvider({
      apikey: apiKey,
      nearby: {
        lat: -33.8688,
        lng: 151.2093,
      },
    }),
  ],
}).addTo(map);

const results = L.layerGroup().addTo(map);

var greenIcon = new L.Icon({
  iconUrl: "img/marker-icon-2x-green.png",
  shadowUrl: "img/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

searchControl.on("results", function (data) {
  results.clearLayers();
  // for (let i = data.results.length - 1; i >= 0; i--) {
  let resultlatlng = L.latLng(
    data.results[0].latlng.lat,
    data.results[0].latlng.lng
  );

  let store_distances = [];
  for (i in stores_array) {
    store_distances.push(resultlatlng.distanceTo(stores_array[i]));
  }
  let c_store = store_distances.indexOf(Math.min.apply(Math, store_distances));

  let pantry_distances = [];
  for (i in pantry_array) {
    pantry_distances.push(resultlatlng.distanceTo(pantry_array[i]));
  }
  let c_pantry = pantry_distances.indexOf(
    Math.min.apply(Math, pantry_distances)
  );

  results.addLayer(
    // L.marker(data.results[i].latlng, { icon: greenIcon }).bindPopup(
    L.marker(data.results[0].latlng, { icon: greenIcon }).bindPopup(
      "<table><tr><th colspan='2'>Closest Grocery Store</th></tr>\
      <tr><td>Name</td><td>" +
        all_points.features[c_store].properties.Name +
        "</td></tr>\
      <tr><td>Address</td><td>" +
        all_points.features[c_store].properties.Address +
        "</td></tr>\
      <tr><td>Distance</td><td>" +
        (resultlatlng.distanceTo(stores_array[c_store]) / 1609).toFixed(3) +
        " miles</td></tr></table>\
      \
      <table><tr><th colspan='2'>Closest Food Pantry</th></tr>\
      <tr><td>Name</td><td>" +
        all_points.features[c_pantry].properties.Name +
        "</td></tr>\
      <tr><td>Address</td><td>" +
        all_points.features[c_pantry].properties.Address +
        "</td></tr>\
      <tr><td>Distance</td><td>" +
        (resultlatlng.distanceTo(pantry_array[c_pantry]) / 1609).toFixed(3) +
        " miles</td></tr></table>\
      \
      <button class='delete-marker-button' onclick='deleteSearchMarker()'>Remove this marker</button>"
    )
  );
});

const deleteSearchMarker = () => {
  results.clearLayers();
};

var stores_array = [];
for (i in all_points.features) {
  if (
    all_points.features[i].properties.Type.toLowerCase() === "grocery store"
  ) {
    stores_array.push([
      all_points.features[i].geometry.coordinates[1],
      all_points.features[i].geometry.coordinates[0],
    ]);
  } else {
    stores_array.push([0, 0]);
  }
}

var pantry_array = [];
for (i in all_points.features) {
  if (all_points.features[i].properties.Type.toLowerCase() === "pantry") {
    pantry_array.push([
      all_points.features[i].geometry.coordinates[1],
      all_points.features[i].geometry.coordinates[0],
    ]);
  } else {
    pantry_array.push([0, 0]);
  }
}
