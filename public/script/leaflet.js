let myLatitude;
let myLongitude;

const successCallback = (position) => {
        myLatitude = position.coords.latitude;
        myLongitude = position.coords.longitude;
};
const errorCallback = (error) => {
        console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

var marker = L.marker([51.5, -0.09]).addTo(map);
var map = L.map('map').setView([51.505, -0.09], 13);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


