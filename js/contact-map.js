/*
  contact-map.js
  Initialises a Leaflet + OpenStreetMap map on contact.html showing the
  two areas Desentral Projects & Civil Works covers:
    1. Johannesburg CBD (head office area)
    2. Kempton Park, Ekurhuleni (second service point)
  Satisfies the Part 1/Part 3 brief requirement that the contact page's
  map contain more than one location.
*/

(function () {
  "use strict";

  var mapEl = document.getElementById("contact-map");
  if (!mapEl || typeof L === "undefined") {
    return;
  }

  // Tell Leaflet where its default marker icon images live, since this
  // site vendors the library locally instead of loading it from a CDN.
  L.Icon.Default.imagePath = "css/images/";

  var locations = [
    {
      name: "Johannesburg CBD",
      detail: "Primary coverage area &mdash; Johannesburg and surrounds.",
      lat: -26.2041,
      lng: 28.0473
    },
    {
      name: "Kempton Park, Ekurhuleni",
      detail: "Secondary coverage area &mdash; greater Ekurhuleni.",
      lat: -26.1017,
      lng: 28.2309
    }
  ];

  var map = L.map("contact-map", {
    scrollWheelZoom: false
  }).setView([-26.15, 28.14], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
  }).addTo(map);

  var bounds = [];
  locations.forEach(function (loc) {
    var marker = L.marker([loc.lat, loc.lng]).addTo(map);
    marker.bindPopup("<strong>" + loc.name + "</strong><br>" + loc.detail);
    bounds.push([loc.lat, loc.lng]);
  });

  if (bounds.length > 1) {
    map.fitBounds(bounds, { padding: [40, 40] });
  }
})();
