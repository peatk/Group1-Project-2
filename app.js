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

    console.log('this is the ban by state info');
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
           bookCount > 0.5   ? '#c6dbef':
                             '#eff3ff';
}

function style(feature) {
    let stateName = feature.properties.name;
    let bookCount = banByState[stateName] ? banByState[stateName].bookCount : 0;
    
    // added to create the pop up

    // let mostBannedbook = banByState[stateName] ? banByState[stateName].mostBannedbook : 'create function to pull info';
    let countBannedbook = banByState[stateName] ? banByState[stateName].bookCount : 'No Data';
    let popupContent = `State: ${stateName} <br> Total Banned Books: ${countBannedbook}`;
    feature.properties.popupContent = popupContent;
    
    return {
        fillColor: getColor(bookCount),
        weight: 2,
        opacity: 0.9,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.75
    };
}

L.geoJson(statesData, {
    style: style,
    // added to code to allow for pop up in the data
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.popupContent);
    }
}).addTo(myMap);

function init(banByState) {
    // if(!banByState){
    //     console.error('banByState is undefined or null');
    // };
    let dropdownMenu = d3.select("#selDataset");
    Object.keys(banByState).forEach(State => {
        dropdownMenu.append("option")
                    .text(State)
                    .property("value", State);
    });
}

let legend = L.control({position: "bottomright"});

legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let limits = [0, 1, 10, 20, 40, 80];
    let colors = ["#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#3182bd", "#08519c"];
    let labels = [];
    div.innerHTML = '<h3>Book Banned <br> by States</h3>';
    
    // Fixed concatenation here
    for (let i = 0; i < limits.length; i++) {
        let from = limits[i];
        let to = limits[i+1];
        let label;

        if (i === 0) {
            label = "<1";            
        } else if (i === limits.length - 1) {
            label = from + "+";
        } else if (i === 1) {
            label = from + "&ndash;" + to;
        } else {
            label = (from + 1) + "&ndash;" + to;
        }
        div.innerHTML +=
        '<i style = "background:' + colors[i] + '; width: 30px; height: 18px; float: left; margin-right: 8px; opacity: 0.7;" ></i> ' +
        label + '<br>';
    }
    return div;
};

legend.addTo(myMap);


// console.log(libraryData);

// // let bubbleData = libraryData[0].Title;
// // console.log('this is bubble data');
// // console.log(bubbleData);  

// let titleCounts = {};
// // iterate through the library to get every title
// for (let i = 0; i < libraryData.length; i++) {
//     let title = libraryData[i].Title;
//     titleCounts[title] = (titleCounts[title] || 0) +1;
// }
// for (let title in titleCounts) {
//     console.log(`Title: ${title}, Count: ${titleCounts[title]}`);
// }

// function createFeatures(libraryData) {

//     let banByState = {};

//     libraryData.forEach(item => {
//         if (banByState[item.State]) {
//             banByState[item.State].bookCount += 1;
//         } else {
//             banByState[item.State] = {
//                 State: item.State,
//                 bookCount: 1,
//                 lat: item.Latitude,
//                 lng: item.Longitude
//             };
//         }
//     });

//     // let banByTitle = {};
//     // libraryData.forEach(item => {
//     //     if (banByTitle[item.Title] && banByTitle[item.State]) {
//     //         banByTitle[item.Title].bookCount += 1;
//     //     } else {
//     //         banByState
//     //     }
//     // })

//     console.log('this is the ban by state info');
//     console.log(banByState);
//     return banByState;

// }

// // // added the book count by state - having issues with this
// // function createBookCountbyState(libraryData) {
// //     let bookCountbyState = [];

// //     libraryData.forEach( item => {
// //        state = item.State;
// //        title = item.Title;
        
// //         if (bookCountbyState[state]) {
// //             bookCountbyState[state] = {};
// //         }

// //         if (bookCountbyState[state][title]) {
// //             bookCountbyState[state][title] += 1;
// //         } else {
// //             bookCountbyState[state][title] ++;
// //         }

// //     });
// //     console.log('this is the book count by state');
// //     console.log(bookCountbyState);
// // }

// let banByState = createFeatures(libraryData);
// init(banByState);

// // let bookCountbyState = createBookCountbyState(libraryData);
// // init(bookCountbyState);

// let myMap = L.map("map", {
//     center: [39.833, -98.583],
//     zoom: 5
// });

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// L.geoJson(statesData).addTo(myMap);

// function getColor(bookCount) {
//     return bookCount > 80 ? '#08519c' :
//            bookCount > 40 ? '#3182bd':
//            bookCount > 20 ? '#6baed6':
//            bookCount > 10 ? '#9ecae1':
//            bookCount > 0.5   ? '#c6dbef':
//                              '#eff3ff';
// }

// function style(feature) {
//     let stateName = feature.properties.name;
//     let bookCount = banByState[stateName] ? banByState[stateName].bookCount : 0;
    
//     // added to create the pop up

//     // let mostBannedbook = banByState[stateName] ? banByState[stateName].mostBannedbook : 'create function to pull info';
//     let countBannedbook = banByState[stateName] ? banByState[stateName].bookCount : 'No Data';
//     let popupContent = `<h1> State: ${stateName}</h1> <hr> <h3> Total Banned Books: ${countBannedbook} </h3>`;
//     feature.properties.popupContent = popupContent;
    
//     return {
//         fillColor: getColor(bookCount),
//         weight: 2,
//         opacity: 0.9,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.75
//     };
// }

// L.geoJson(statesData, {
//     style: style,
//     // added to code to allow for pop up in the data
//     onEachFeature: function(feature, layer) {
//         layer.bindPopup(feature.properties.popupContent);
//     }
// }).addTo(myMap);

// let legend = L.control({position: "bottomright"});

// legend.onAdd = function() {
//     let div = L.DomUtil.create("div", "info legend");
//     let limits = [0, 1, 10, 20, 40, 80];
//     let colors = ["#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#3182bd", "#08519c"];
//     let labels = [];
//     div.innerHTML = '<h3>Book Banned <br> by States</h3>';
    
//     // Fixed concatenation here
//     for (let i = 0; i < limits.length; i++) {
//         let from = limits[i];
//         let to = limits[i+1];
//         let label;

//         if (i === 0) {
//             label = "<1";            
//         } else if (i === limits.length - 1) {
//             label = from + "+";
//         } else if (i === 1) {
//             label = from + "&ndash;" + to;
//         } else {
//             label = (from + 1) + "&ndash;" + to;
//         }
//         div.innerHTML +=
//         '<i style = "background:' + colors[i] + '; width: 30px; height: 18px; float: left; margin-right: 8px; opacity: 0.7;" ></i> ' +
//         label + '<br>';
//     }
//     return div;
// };

// legend.addTo(myMap);

// // function init(banByState) {
// //     // if(!banByState){
// //     //     console.error('banByState is undefined or null');
// //     // };
// //     let dropdownMenu = d3.select("#selDataset");
// //     Object.keys(banByState).forEach(State => {
// //         dropdownMenu.append("option")
// //                     .text(State)
// //                     .property("value", State);
// //     });
// //     updatePlot(banByState, banByState.State[0]);

// //     // book title = y 
// //     // book title count = x 
// //     // book title count = size
// // }

// // function updatePlot(libraryData, State) {
// //     let booktitle = libraryData.Title += 0;


// // }
 

