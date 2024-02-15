
d3.json("data/author_title.json").then((importedData) => {
  state = 'Wisconsin';
  titleByState(importedData, state);
  authorByState(importedData, state);
  
});

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
    orientation: "h"
  };

  // Data
  let chartData = [trace1];

  
  // Apply the group bar mode to the layout.
  let layout = {
    title: title,
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
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
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with the id of "plot".
  Plotly.newPlot("author", chartData, layout);
}
