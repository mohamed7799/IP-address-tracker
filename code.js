"use strict";

// functions

let buildMap = (lat, lng) => {
  if (mymap === undefined) {
    mymap = L.map("mapid");
  }
  mymap.setView([lat, lng], 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibW9oYW1lZDk5NzciLCJhIjoiY2tzc3FldDRkMDhwcTJubnMybWpraXA4biJ9.KyA-9aQawOAqUpxqblYMAg",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: "your.mapbox.access.token",
    }
  ).addTo(mymap);

  let myIcon = L.icon({
    iconUrl: "./imgs/icon-location.svg",
  });

  L.marker([lat, lng], { icon: myIcon }).addTo(mymap);
};

let fetchIP = (ip = "") => {
  fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_dScSnQqCg4UhcGrfDtINgzzBpoWRN&ipAddress=${ip}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("sorry the IP does not exist");
      }
      return res.json();
    })
    .then((body) => {
      buildMap(body.location.lat, body.location.lng);
      buildData(body);
    })
    .catch((err) => alert(err));
};

let buildData = (body) => {
  dataDom.innerHTML = ` <li>
            <h6>IP Address</h6>
            <h2>${body.ip}</h2>
          </li>
          <hr />
          <li>
            <h6>Location</h6>
            <h2>${body.location.city}</h2>
          </li>
          <hr />
          <li>
            <h6>Timezone</h6>
            <h2>UTC${body.location.timezone}</h2>
          </li>
          <hr />
          <li>
            <h6>ISP</h6>
            <h2>${body.isp}</h2>
          </li>`;
};

//dom elmenets
let dataDom = document.querySelector(".data");
let form = document.querySelector("form");
let inputValue = document.querySelector("input");

//variables
let IP;
let mymap;

//main
fetchIP(IP);

//event listners
form.addEventListener("submit", (e) => {
  if (inputValue.value === "") {
    alert("The input field is empty");
  } else {
    e.preventDefault();
    IP = inputValue.value;
    fetchIP(IP);
    inputValue.value = "";
  }
});
