
// create a loop to get the book data by state. a banned book count by state
let stateCounts = {};

for (let i =0; i < libraryData.length; i++) {
    let state = libraryData[i].State;

    if (stateCounts[state]) {
        stateCounts[state] ++ ;
    } else {
        stateCounts[state] = 1;
    }
}

for (let state in stateCounts) {
    console.log(`${state}: ${stateCounts[state]}`);
}

// convert to array (to be used for the bubble?)
let stateCountsArray = [];

for (let state in stateCounts) {
    stateCountsArray.push({ state: state, count: stateCounts[state] });
}

// Create a loop and collect data on the amount of times a book title was banned in a state.

let bannedCountByState = {};

for (let i =0; i < libraryData.length; i++) {
    let title = libraryData[i].Title;
    let state = libraryData[i].State;

    if (bannedCountByState[title]) {
        if (bannedCountByState[title][state]) {
            bannedCountByState[title][state] ++;
        } else {
            bannedCountByState[title][state] = 1;
        }
    } else {
        bannedCountByState[title] = {[state]: 1};
    }
}
console.log(bannedCountByState);

// create a loop and collect data on the author. count that an author was banned collectively
let authorCounts = {};

for (let i =0; i < libraryData.length; i++) {
    let author = libraryData[i].Author;

    if (authorCounts[author]) {
        authorCounts[author] ++ ;
    } else {
        authorCounts[author] = 1;
    }
}
for (let author in authorCounts) {
    console.log(`${author}: ${authorCounts[author]}`);
}


// create a loop and collect date on the amount of times an author was banned in a state. 

let authorBannedCountByState = {};

for (let i =0; i < libraryData.length; i++) {
    let author = libraryData[i].Author;
    let state = libraryData[i].State;

    if (authorBannedCountByState[author]) {
        if (authorBannedCountByState[author][state]) {
            authorBannedCountByState[author][state] ++;
        } else {
            authorBannedCountByState[author][state] = 1;
        }
    } else {
        authorBannedCountByState[author] = {[state]: 1};
    }
}
console.log(authorBannedCountByState);


// create a loop and collect data on the state. use this data for the drop down list
// let uniqueStates = [];

// for (let i = 0; i < libraryData.length; i ++) {
//     let state = libraryData[i].State;

//     if (!uniqueStates.includes(state)) {
//         uniqueStates.push(state);
//     }
// }
// console.log(uniqueStates);


// Create a loop and collect data on the state for the dropdown list
let uniqueStates = Object.keys(stateCounts).sort();

// Create a dropdown menu and populate it with unique states
const dropdownMenu = document.getElementById('selState');
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


var data = [{
    x: stateCountsArray.map(item => item.state), 
    y: stateCountsArray.map(item => item.count), 
    mode: 'markers',
    marker: {
      size: stateCountsArray.map(item => item.count),
      sizemode: 'area',
      sizeref: 2 * Math.max(...stateCountsArray.map(item => item.count)) / (40**2),
      sizemin: 4
    },
    text: stateCountsArray.map(item => `${item.state}: ${item.count} bans`), // Hover text
  }];
  
  var layout = {
    title: 'Banned Books Count by State',
    xaxis: {title: 'State'},
    yaxis: {title: 'Count of Banned Books'},
    showlegend: false,
    height: 600,
    width: 1000
  };
  
  Plotly.newPlot('plotlyBubbleChart', data, layout);



// Initial update with the first state selected
// updateBubbleChart(uniqueStates[0]);



// // gather data for chart.js
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


