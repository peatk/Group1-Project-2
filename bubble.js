// STATE DATA
// create a loop to get the book data by state. a banned book count by state
let stateCounts = {};
// iterate over the librarydata and pull the total banned book count by state
for (let i =0; i < libraryData.length; i++) {
    let state = libraryData[i].State;
    stateCounts[state] = (stateCounts[state] || 0) + 1;
}
// Convert stateCounts to array
let stateCountsArray = Object.entries(stateCounts).map(([state, count]) => ({state, count }));


// TITLE DATA
// Create a loop and collect data on the amount of times a book title was banned in a state.
let bannedCountByState = {};
// iterate over the librarydata and pull the total banned book count by state
for (let i =0; i < libraryData.length; i++) {
    let title = libraryData[i].Title;
    bannedCountByState[title] = (bannedCountByState[title] || 0) + 1;
}
let bannedCountByStateArray = Object.entries(bannedCountByState).map(([title, count]) => ({title, count }));


// AUTHOR DATA 
// Create a loop and collect data on the amount of times a book title was banned in a state
let authorBannedCountByState = {};
// iterate over the librarydata and pull the total banned book count by state
for (let i =0; i < libraryData.length; i++) {
    let author = libraryData[i].Author;
    authorBannedCountByState[author] = (authorBannedCountByState[author] || 0) + 1;
}
let authorBannedArray = Object.entries(authorBannedCountByState).map(([author, count]) => ({author, count }));


// Create global variables for inital load and update
const DataInit = stateCountsArray.sort((a, b) => b. count - a.count);
const top10DataInit = DataInit.slice(0,10);

const titleData = bannedCountByStateArray.sort((a, b) => b.count - a.count);
const top40TitleData = titleData.slice(0,40);

const authorData = authorBannedArray.sort((a, b) => b.count - a.count);
const top40AuthorData = authorData.slice(0,40);

function init() { //initalize with state data
    
    data = [{
        x: top10DataInit.map(item => item.state),
        y: top10DataInit.map(item => item.count),
        type: 'bar',
        marker: {
            color: '#e07a5f',
            // colorscale: 'Rainbow'
        }
    }];
  
    Plotly.newPlot("plotlyBarChart", data);
  }

d3.selectAll('#selState').on('change', updatePlotly);

function updatePlotly() {
    let dropdownMenu = d3.select('#selState');
    let dataset = dropdownMenu.property('value');

    let x = [];
    let y = [];
    let color = [];
    
    if (dataset == 'State') {
        x = top10DataInit.map(item => item.state);
        y = top10DataInit.map(item => item.count);
        color = '#e07a5f';
    }

    else if (dataset == 'Title') {
        x = top40TitleData.map(item => item.title);
        y = top40TitleData.map(item => item.count);
        color = '#3d405b';
    }

    else if (dataset == 'Author') {
        x = top40AuthorData.map(item => item.author);
        y = top40AuthorData.map(item => item.count);
        color = '#81b29a';
    }
    
    Plotly.restyle('plotlyBarChart', {
        x: [x],
        y: [y],
        'marker.color': [color]
    });
    // Plotly.restyle('plotlyBarChart', 'x', [x]);
    // Plotly.restyle('plotlyBarChart', 'y', [y]);

}

init();

// CONSOLE LOGS
// State Data Console Log
// for (let state in stateCounts) {
//     console.log(`${state}: ${stateCounts[state]}`);
// }

// Title Data Console Log
// for (let title in bannedCountByState) {
//     console.log(`${title}: ${bannedCountByState[title]}`);
// }

// Author Data Console Log
// for (let author in authorBannedCountByState) {
//     console.log(`${author}: ${authorBannedCountByState[author]}`);
// }





