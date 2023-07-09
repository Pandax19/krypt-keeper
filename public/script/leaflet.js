var myLatitude= 51.505;
var myLongitude= -0.09 ;
var map;

const successCallback = (position) => {
        myLatitude = position.coords.latitude;
        myLongitude = position.coords.longitude;
        // displayMap()
        console.log(myLatitude)
        map.setView(new L.LatLng(myLatitude, myLongitude), 8 );
        console.log(myLatitude, myLongitude)
};
const errorCallback = (error) => {
        console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

// function displayMap(){
//          map = L.map("map", {
//                 center: [myLatitude, myLongitude], 
//                 zoom: 13
//         })
//         var marker = L.marker([51.5, -0.09]).addTo(map);
//         map.on('click', onMapClick);
//         console.log("bananas")
// }
var map = L.map("map", {
        center: [myLatitude, myLongitude], 
        zoom: 13
})

//  L.map('map').setView([51.505, -0.09], 13);
function createMap(){

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
}

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}


createMap()

