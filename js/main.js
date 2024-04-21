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
      <li>ArcGis Online</li>
      <li>...</li>
      <li><a href='https://fontawesome.com/' target='_blank'>Font Awesome</a> for icons</li>
    </ul>`;

const instructionContent = `<h2>About this project</h2>
   <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium debitis corporis deleniti asperiores qui? Repellendus modi maxime explicabo architecto, placeat asperiores, sed, quae numquam deserunt magni assumenda! Commodi, maiores animi?</p>
   <h3>Project Goals</h3>
   <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At cum neque sed quos, dignissimos asperiores, suscipit iste culpa cumque voluptatum ipsa obcaecati perferendis veritatis, sunt architecto modi fugit facilis blanditiis quis. Laborum labore, tempore nesciunt voluptates nihil excepturi vel vitae sunt reprehenderit, ipsa eos dolore asperiores nostrum aspernatur alias placeat deleniti suscipit illum ut, consectetur veritatis provident debitis? Labore, ratione nihil, suscipit, eum ipsum delectus atque nulla commodi fuga adipisci harum explicabo. Mollitia enim similique voluptate tempora, iusto perspiciatis assumenda molestias! Assumenda itaque cum veritatis, delectus quibusdam provident facilis inventore magni soluta aut fuga rerum, harum eum debitis placeat sed?Lorem ipsum dolor, sit amet consectetur adipisicing elit. At cum neque sed quos, dignissimos asperiores, suscipit iste culpa cumque voluptatum ipsa obcaecati perferendis veritatis, sunt architecto modi fugit facilis blanditiis quis. Laborum labore, tempore nesciunt voluptates nihil excepturi vel vitae sunt reprehenderit, ipsa eos dolore asperiores nostrum aspernatur alias placeat deleniti suscipit illum ut, consectetur veritatis provident debitis? Labore, ratione nihil, suscipit, eum ipsum delectus atque nulla commodi fuga adipisci harum explicabo. Mollitia enim similique voluptate tempora, iusto perspiciatis assumenda molestias! Assumenda itaque cum veritatis, delectus quibusdam provident facilis inventore magni soluta aut fuga rerum, harum eum debitis placeat sed?</p>`;

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
  color: "#333333"
};

L.geoJSON(all_5, { style: style_5 }).addTo(map);
L.geoJSON(all_10, { style: style_10 }).addTo(map);
L.geoJSON(all_20, { style: style_20 }).addTo(map);
L.geoJSON(all_overlay, { style: overlay_style }).addTo(map);
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
  results.addLayer(
    // L.marker(data.results[i].latlng, { icon: greenIcon }).bindPopup(
    L.marker(data.results[0].latlng, { icon: greenIcon }).bindPopup(
      '<p style="font-size: 1.3rem">You searched this address.</p><button class="delete-marker-button" onclick="deleteSearchMarker()">Remove this marker</button>'
    )
  );
});

const deleteSearchMarker = () => {
  results.clearLayers();
};
