console.log(libraryData);

function createFeatures(libraryData) {

    let banByState = {};

    libraryData.forEach(item => {
        if (banByState[item.State]) {
            banByState[item.State].bookCount += 1;
        } else {
            banByState[item.State] = {
                State: item.State,
                bookCount: 1,
                lat: item.Latitude,
                lng: item.Longitude
            };
        }
    });

    console.log(banByState);
    return banByState;

}


let banByState = createFeatures(libraryData);
init(banByState);

let myMap = L.map("map", {
    center: [39.833, -98.583],
    zoom: 5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

L.geoJson(statesData).addTo(myMap);

function getColor(bookCount) {
    return bookCount > 80 ? '#08519c' :
           bookCount > 40 ? '#3182bd':
           bookCount > 20 ? '#6baed6':
           bookCount > 10 ? '#9ecae1':
           bookCount > 1   ? '#c6dbef':
                             '#eff3ff';
}

function style(feature) {
    let stateName = feature.properties.name;
    let bookCount = banByState[stateName] ? banByState[stateName].bookCount : 0;
    return {
        fillColor: getColor(bookCount),
        weight: 2,
        opacity: 0.9,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.75
    };
}

L.geoJson(statesData, {style: style}).addTo(myMap);

function init(banByState) {
    let dropdownMenu = d3.select("#selDataset");
    Object.keys(banByState).forEach(State => {
        dropdownMenu.append("option")
                    .text(State)
                    .property("value", State);
    });

}
