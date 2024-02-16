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

const stateSelector = document.getElementById('selDataset');

stateSelector.addEventListener('change', function() {
    let selectedState = this.value;
    let state = typeBan[selectedState];
    let series = [];
    let labels = [];

    Object.entries(state).forEach(([type, count]) => {
        series.push(count);
        labels.push(type);
    });

    let options = {
        series: series,
        labels: labels,
        chart: {
            type: 'donut',
        },
        colors: ['#08519c', '#3182bd', '#6baed6', '#9ecae1'], // Corrected the color codes
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

    // Ensure to clean up the previous chart before rendering a new one
    document.querySelector("#chart").innerHTML = "";

    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
});

