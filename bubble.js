
// console.log(libraryData);

let titleCountsByState = {};
for (let i = 0; i < libraryData.length; i++) {
    let state = libraryData[i].State;
    let title = libraryData[i].Title;
    if (!titleCountsByState[state]) {
        titleCountsByState[state] = {};
    }
    titleCountsByState[state][title] = (titleCountsByState[state][title] || 0) + 1;
}
console.log('these are the counts by state');
console.log(titleCountsByState);

let stateArray = [];
for (let i = 0; i < libraryData.length; i++) {
    let state = libraryData[i].State;
    if (!stateArray.includes(state)) {
        stateArray.push(state);
    }
}
stateArray.sort();

console.log('this is the stateArray');
console.log(stateArray);

// Convert title counts by state into arrays for Chart.js
let states = Object.keys(titleCountsByState);
let stateTitles = {};
let stateCounts = {};

for (let state of states) {
    stateTitles[state] = Object.keys(titleCountsByState[state]);
    stateCounts[state] = Object.values(titleCountsByState[state]);
}

console.log('this is the stateTitles');
console.log(stateTitles);

console.log('this is the stateCounts');
console.log(stateCounts);

let bubbleChart = new Chart(document.getElementById('bubbleChart'), {
    type: 'bubble',
    data: {
        datasets: stateArray.map (state => [{
            label: state,
            data: stateCounts[state].map((count, index) => ({
                 y: count, 
                 x: index,      
                 r: count, 
                 title: stateTitles[state][index] + ' (' + count +')'
                })),
            backgroundColor: '#8f0056d9', // Color for the bubbles
        }])
    },
    options: {
        layout: {
            padding: {
                l: 200,
                r: 200,
                t: 200,
                b: 200
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    callback: (value, index) => stateTitles[stateArray[index]][index], // Display book titles on y-axis
                }
            }
        }
    }
});

// Create the state drop down menu
let selState = document.getElementById('selState');
for (let state of states) {
    let option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    selState.appendChild(option);
}

selState.addEventListener('change', function(event) {
    let selectedState = event.target.value;
    let filteredData = libraryData.filter( item => item.State == selectedState);
    let titleCounts = {};
    
    for (let i = 0; i < filteredData.length; i++) {
        let title = filteredData[i].Title;
        titleCounts[title] = (titleCounts[title] || 0) + 1;
    }
    
    bubbleChart.data.datasets[0].data = Object.keys(titleCounts).map((title, index) => ({
        y: stateCounts[title],
        x: index,
        r: stateCounts[title],
        title: title + ' (' + stateCounts[title] + ')'
    }));
    
    // Update chart labels
    bubbleChart.data.labels = Object.keys(stateCounts);

    // Update the chart
    bubbleChart.update();

});





// let titleCounts = {};
// for (let i = 0; i < libraryData.length; i++) {
//     let state = libraryData[i].State;
//     let title = libraryData[i].Title;
//     if (!titleCounts[state]) {
//         titleCounts[state] = {};
//     }
//     titleCounts[state][title] = (titleCounts[state][title] || 0) + 1;
// }

// let states = Object.keys(titleCounts);

// Convert title counts into arrays
// let titles = Object.keys(titleCounts);
// let counts = Object.values(titleCounts);
// let sizes = counts.map(count => count * 5); // Scale the counts to adjust bubble sizes

// let states = Object.keys(titleCounts);
// let stateTitles = {};
// let stateCounts = {};

// for (let state of states) {
//     stateTitles[state] = Object.keys(titleCounts[state]);
//     stateCounts[state] = Object.values(titleCounts)
// }

