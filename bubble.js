
// create a loop to get the book data by state. a banned book count by state
let stateCounts = {};

// iterate over the data and pull the banned book count by state. will total the whole state
for (let i =0; i < libraryData.length; i++) {
    let state = libraryData[i].State;
    stateCounts[state] = (stateCounts[state] || 0) + 1;
}
// console log not required
for (let state in stateCounts) {
    console.log(`${state}: ${stateCounts[state]}`);
}

// Convert stateCounts to array
let stateCountsArray = Object.entries(stateCounts).map(([state, count]) => ({ state, count }));

// Create a loop and collect data on the amount of times a book title was banned in a state.

let bannedCountByState = {};

for (let i =0; i < libraryData.length; i++) {
    let title = libraryData[i].Title;
    let state = libraryData[i].State;
    bannedCountByState[title] = bannedCountByState[title] || {};
    bannedCountByState[title][state] = (bannedCountByState[title][state] || 0) + 1;
}
console.log('this is the banned books by state');
console.log(bannedCountByState);


// should be an array that is pulling the state and title count - this array is empty
let bannedCountByStateArray = [];

// for (let state in bannedCountByState) {
//     for (let title in bannedCountByState[state]) {
//     bannedCountByStateArray.push({title, state, count: bannedCountByState[state][title]});
//     }
// }
for (let title in bannedCountByState) {
    for (let state in bannedCountByState[title]) {
        bannedCountByStateArray.push({ title, state, count: bannedCountByState[title][state] });
    }
}
console.log('this is the banned array');
console.log(bannedCountByStateArray);

// Create a dropdown menu and populate it with unique states
const dropdownMenu = document.getElementById('selState');
const uniqueStates = Object.keys(stateCounts).sort();
uniqueStates.forEach(state => {
    const option = document.createElement('option');
    option.text = state;
    dropdownMenu.appendChild(option);
});

// Event listener for dropdown change
dropdownMenu.addEventListener('change', function() {
    const selectedState = dropdownMenu.value;
    updateBubbleChart(selectedState);
});

// Function to update the bubble chart with selected state
function updateBubbleChart(selectedState) {
    const filteredData = bannedCountByStateArray.filter(item => item.state === selectedState);
    if (filteredData && filteredData.length > 0) {
        // Create arrays to store unique x, y, and text attributes
        const xData = [];
        const yData = [];
        const textData = [];

        // Iterate through filtered data to extract unique attributes
        filteredData.forEach(item => {
            // Check if the book title already exists in xData
            const existingIndex = xData.indexOf(item.title);
            if (existingIndex === -1) {
                // If the book title doesn't exist, add it to xData, add the count to yData, and add the text
                xData.push(item.title);
                yData.push(item.count);
                textData.push(`${item.title}: ${item.count} bans`);
            } else {
                // If the book title already exists, update the count in yData and update the text
                yData[existingIndex] += item.count;
                textData[existingIndex] += `, ${item.count} bans`;
            }
        });

        // Update plot data using restyle
        Plotly.restyle('plotlyBubbleChart', 'x', [xData]);
        Plotly.restyle('plotlyBubbleChart', 'y', [yData]);
        Plotly.restyle('plotlyBubbleChart', 'marker.size', [yData]); // Using count for marker size
        Plotly.restyle('plotlyBubbleChart', 'text', [textData]);
    } else {
        console.log("No data found for the selected state.");
    }
}

function optionChanged(selectedState) {
    // Call the updateBubbleChart function with the selected state
    updateBubbleChart(selectedState);
}

// Initial update with Alaska selected
// updateBubbleChart();

let data = [{
    // x: stateCountsArray.map(item => item.state), 
    // y: stateCountsArray.map(item => item.count), 
    x: bannedCountByStateArray.map(item => item.state), 
    y: bannedCountByStateArray.map(item => item.count), 
    mode: 'markers',
    marker: {
      size: bannedCountByStateArray.map(item => item.count),
      sizemode: 'area',
      sizeref: 2 * Math.max(...bannedCountByStateArray.map(item => item.count)) / (40**2),
      sizemin: 4
    },
    text: bannedCountByStateArray.map(item => `${item.title}: ${item.count} bans`), // Hover text
    // text: bannedCountByStateArray.map(item => `${item.count} bans`), // Hover text
  }];
  
let layout = {
    title: 'Banned Books Count by State',
    xaxis: {title: 'State'},
    yaxis: {title: 'Count of Banned Books'},
    height: 800,
    width: 1200
  };
  
  Plotly.newPlot('plotlyBubbleChart', data, layout);





// function updateBubbleChart(selectedState) {
//     // Filter bannedCountByStateArray based on selectedState
//     const filteredData = bannedCountByStateArray.filter(item => item.state == selectedState);

//     // Update plot data using restyle
//     Plotly.restyle('plotlyBubbleChart', 'x', [filteredData.map(item => item.state)]);
//     Plotly.restyle('plotlyBubbleChart', 'y', [filteredData.map(item => item.count)]);
//     Plotly.restyle('plotlyBubbleChart', 'marker.size', [filteredData.map(item => item.count)]);
//     Plotly.restyle('plotlyBubbleChart', 'text', [filteredData.map(item => `${item.state}: ${item.count} bans`)]);
// }

// FORMER ARRAY - convert to array (to be used for the bubble?)
// let stateCountsArray = [];

// for (let state in stateCounts) {
//     stateCountsArray.push({ state: state, count: stateCounts[state] });
// }


// create a loop and collect data on the author. count that an author was banned collectively
// let authorCounts = {};

// for (let i =0; i < libraryData.length; i++) {
//     let author = libraryData[i].Author;

//     if (authorCounts[author]) {
//         authorCounts[author] ++ ;
//     } else {
//         authorCounts[author] = 1;
//     }
// }
// for (let author in authorCounts) {
//     console.log(`${author}: ${authorCounts[author]}`);
// }


// create a loop and collect date on the amount of times an author was banned in a state. 

// let authorBannedCountByState = {};

// for (let i =0; i < libraryData.length; i++) {
//     let author = libraryData[i].Author;
//     let state = libraryData[i].State;

//     if (authorBannedCountByState[author]) {
//         if (authorBannedCountByState[author][state]) {
//             authorBannedCountByState[author][state] ++;
//         } else {
//             authorBannedCountByState[author][state] = 1;
//         }
//     } else {
//         authorBannedCountByState[author] = {[state]: 1};
//     }
// }
// console.log(authorBannedCountByState);


  
// create a loop and collect data on the state. use this data for the drop down list
// let uniqueStates = [];

// for (let i = 0; i < libraryData.length; i ++) {
//     let state = libraryData[i].State;

//     if (!uniqueStates.includes(state)) {
//         uniqueStates.push(state);
//     }
// }
// console.log(uniqueStates);

// gather data for chart.js
// let data = {
//     datasets: [{
//       label: 'Banned Books Count by State',
//       data: stateCountsArray.map(item => ({
//         x: item.count * 100,
//         y: item.state * 100,
//         r: item.count * 5
//       })),
//       backgroundColor: '#3944BC'
//     }]
//   };
  
//   // chart configuration
//   let options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       yAxes: [{
//         scaleLabel: {
//           display: true,
//           labelString: 'y axis'
//         }
//       }],
//       xAxes: [{
//         scaleLabel: {
//           display: true,
//           labelString: 'x axis'
//         }
//       }]
//     }
//   };
  
//   // canvas element
//   let canvas = document.getElementById('bubbleChart');
  
//   // Init bubble chart
//   let bubbleChart = new Chart(canvas, {
//     type: 'bubble',
//     data: data,
//     options: options
//   });


