fetch('./data/coordinates.json')
    .then((response) => response.json())
    .then((jsonData) => {
        // Adding map
        let map = L.map('map').setView([37.8, -96.9], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // heatmap points
        let heatmapPoints = jsonData.map(function (item) {
            return [item.Dis_Latitude, item.Dis_Longitude, 1]; // latitude, longitude, intensity
        });
        
        // heatmap layer
        let heat = L.heatLayer(heatmapPoints, {
            radius: 50,
            blur: 65,
            maxZoom: 10,
            max: 1,
            gradient: {0.4: 'blue', 0.6: 'navy', 0.7: 'purple', 0.8: 'yellow', 1: 'orange'},
            opacity: 0.3
        }).addTo(map);
    })
    .catch((error) => console.log('Error:', error));