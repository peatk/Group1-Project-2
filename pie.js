console.log(libraryData);

let typeBan = {};
libraryData.forEach(item => {
    if (!typeBan[item.State]) {
        typeBan[item.State] = {};
    }
    if (!typeBan[item.State][item.Type_of_Ban]) {
        typeBan[item.State][item.Type_of_Ban] = 0;
    }
    typeBan[item.State][item.Type_of_Ban]++;
});

function updateChart(data) {
    let series = [];
    let labels = [];

    Object.entries(data).forEach(([type, count]) => {
        series.push(count);
        labels.push(type);
    });

    let options = {
        series: series,
        labels: labels,
        chart: {
            type: 'donut',
        },
        colors: ['#08519c', '#3182bd', '#6baed6', '#9ecae1'], 
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    labels: {
                        show: true,
                    }
                }
            }
        }
    };

    document.querySelector("#chart").innerHTML = "";

    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

function init(typeBan) {
    let dropdownMenu = d3.select("#selDataset");
    Object.keys(typeBan).forEach(State => {
        dropdownMenu.append("option")
                    .text(State)
                    .property("value", State);
    });
    
    let aggregatedData = {};
    Object.values(typeBan).forEach(state => {
        Object.entries(state).forEach(([type, count]) => {
            if (!aggregatedData[type]) {
                aggregatedData[type] = 0;
            }
            aggregatedData[type] += count;
        });
    });
    updateChart(aggregatedData);
}

const stateSelector = document.getElementById('selDataset');
stateSelector.addEventListener('change', function() {
    let selectedState = this.value;
    let stateData = typeBan[selectedState];
    updateChart(stateData);
});

init(typeBan);
