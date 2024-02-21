let data = {};
d3.json("data/author_title.json").then((importedData) => {
  state = 'Wisconsin';
  data = importedData;
  titleByState(importedData, state);
  authorByState(importedData, state);
  frequencyChart(importedData);
  topStates(importedData);
  
});
function topStates(data) {
  let topStatesWithBans = ["Texas", "Florida", "Pennsylvania", "Tennessee"]
  let topBannedAuthor = []
  let topBannedTitle = []
  topStatesWithBans.forEach(state => {
      let authorCount = {};
      let titleCount = {}
      for (let i = 0; i < data.length; i++) {
        //console.log(d)
        ban = data[i]
        
        if(ban.State == state) {
          authorCount[ban['Author']] = authorCount[ban['Author']] ? authorCount[ban['Author']] + 1 : 1;
          titleCount[ban['Title']] = titleCount[ban['Title']] ? titleCount[ban['Title']] + 1 : 1;
        }
    }

    let records = []
    Object.entries(titleCount).forEach(element => {
      records.push({ "Title": element[0], "count": element[1] });
    });

    records = records.sort(compareByCount);
    // Slice the first 10 objects for plotting.
    topBannedTitle.push(records[0]);
    

    records = []
    Object.entries(authorCount).forEach(element => {
      records.push({ "Author": element[0], "count": element[1] });
    });

    records = records.sort(compareByCount);
    // Slice the first 10 objects for plotting.
    topBannedAuthor.push(records[0]);
  
  })
  console.log(topBannedAuthor)
  console.log(topBannedTitle)

  let trace1 = {
    x: topStatesWithBans,
    y: topBannedAuthor.map(row => row.count),
    text: topBannedAuthor.map(row => row.Author),
    name: "Top Banned Author",
    type: "bar"
  };

  let trace2 = {
    x: topStatesWithBans,
    y: topBannedTitle.map(row => row.count),
    text: topBannedTitle.map(row => row.Title),
    name: "Top Banned Title",
    type: "bar"
    };

  // Data
  let chartData = [trace1, trace2];
  let layout = {
    title: "Top banned Author and Title in top 4 banning states",
    width: 1200,
    height: 500,
    margin: {
      l: 300,
      r: 300,
      t: 150,
      b: 100
    }
  };

  // Render the plot to the div tag with the id of "plot".
  Plotly.newPlot("topstates", chartData, layout);
  


}
function frequencyChart(data){
  let x = [];
  
  let bins = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec'"];
  for (let i = 0; i < data.length; i++) {
    ban = data[i];
    let banDate =new Date(ban['Date_of_Challenge_or_Removal'] );
    x.push(banDate.getUTCMonth());
  };
  
  x.sort(function(a, b) {
    return a - b;
});
  
  xByMonth=[];
  x.forEach(m => xByMonth.push(bins[m]))
 
let trace = {
    x: xByMonth,
    type: 'histogram'
  };
  let layout = {
    title: "Books banned by month",
    width: 1200,
    height: 500,
    margin: {
      l: 300,
      r: 300,
      t: 150,
      b: 100
    }
  };
var data = [trace];
Plotly.newPlot('freq', data, layout);
}


function compareByCount(a, b) {
  return b.count - a.count;
}


function titleByState(importedData, state) {
  let data = importedData;

  let authorCount = {};
  for (let i = 0; i < data.length; i++) {
    //console.log(d)
    ban = data[i]
    
    if(state == '' || ban.State == state) {
      authorCount[ban['Title']] = authorCount[ban['Title']] ? authorCount[ban['Title']] + 1 : 1;
    }
  }

  let records = []
  Object.entries(authorCount).forEach(element => {
    records.push({ "Title": element[0], "count": element[1] });
  });

  records = records.sort(compareByCount);
  // Slice the first 10 objects for plotting.
  records = records.slice(0, 10);

  // Reverse the array because of the Plotly defaults.
  records = records.reverse();

  let title = '';
  if(state == '') {
    title = "Top Titles banned"
  } else {
    title = `Top Title banned in ${state}`
  }
  // Trace1 for the car miles data.
  let trace1 = {
    x: records.map(row => row.count),
    y: records.map(row => row.Title),
    text: data.map(row => row.count),
    name: title,
    type: "bar",
    orientation: "h",
    marker: {
      color: "rgba(245, 99, 75, 1)"
    }
  };

  // Data
  let chartData = [trace1];

  
  // Apply the group bar mode to the layout.
  let layout = {
    title: title,
    width: 800,
    height: 500,
    margin: {
      l: 300,
      r: 100,
      t: 100,
      b: 100},
      yaxis: {
        automargin: true
      }
  };

  // Render the plot to the div tag with the id of "plot".
  Plotly.newPlot("title", chartData, layout);
}

function authorByState(importedData, state) {
  let data = importedData;

  let authorCount = {};
  for (let i = 0; i < data.length; i++) {
    //console.log(d)
    ban = data[i]
    
    if(state == '' || ban.State == state) {
      authorCount[ban['Author']] = authorCount[ban['Author']] ? authorCount[ban['Author']] + 1 : 1;
    }
  }
  let records = []
  Object.entries(authorCount).forEach(element => {
    records.push({ "Author": element[0], "count": element[1] });

  });



  records = records.sort(compareByCount);

  // Slice the first 10 objects for plotting.
  records = records.slice(0, 10);

  // Reverse the array because of the Plotly defaults.
  records = records.reverse();

  let title = '';
  if(state == '') {
    title = "Top Authors banned"
  } else {
    title = `Top Authors banned in ${state}`
  }

  // Trace1 for the car miles data.
  let trace1 = {
    x: records.map(row => row.count),
    y: records.map(row => row.Author),
    text: data.map(row => row.count),
    name: title,
    type: "bar",
    orientation: "h"
  };

  // Data
  let chartData = [trace1];

  // Apply the group bar mode to the layout.
  let layout = {
    title: title,
    width: 800,
    height: 500,
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100},
      yaxis: {
        automargin: true
      }
  };

  // Render the plot to the div tag with the id of "plot".
  Plotly.newPlot("author", chartData, layout);
}
let uniqueStates = ['All','California','Wisconsin','New York','Florida', 'Texas']
const dropdownMenu = document.getElementById('selState');
uniqueStates.forEach(state => {
    const option = document.createElement('option');
    option.text = state;
    dropdownMenu.appendChild(option);
});

// Event listener for dropdown change
dropdownMenu.addEventListener('change', function() {
    const selectedState = dropdownMenu.value;
    titleByState(data, selectedState);
    authorByState(data, selectedState);
    
});
