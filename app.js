// JSON data containing latitude and longitude information
const jsonData = [
    {
        "Author": "Àbíké-Íyímídé, Faridah",
        "Latitude": 27.994402,
        "Longitude": -81.760254,
        "Title": "Ace of Spades",
        "Date_of_Challenge_or_Removal": 1635724800000,
        "District": "Indian River County School District",
        "Origin_of_Challenge": "Administrator",
        "State": "Florida",
        "Type_of_Ban": "Banned in Libraries and Classrooms"
        // Other properties...
    },
    // Other locations...
];

// Initialize Leaflet map
const map = L.map('map').setView([37.8, -96], 4); // Centered on the US

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Iterate over JSON data and add markers to the map for each location
jsonData.forEach(location => {
    const { Latitude, Longitude, Author, Title, Date_of_Challenge_or_Removal, District, Origin_of_Challenge, State, Type_of_Ban } = location;

    // Create a popup with information about the book
    const popupContent = `
        <b>${Title}</b><br>
        Author: ${Author}<br>
        Date of Challenge or Removal: ${new Date(Date_of_Challenge_or_Removal).toLocaleDateString()}<br>
        District: ${District}<br>
        Origin of Challenge: ${Origin_of_Challenge}<br>
        State: ${State}<br>
        Type of Ban: ${Type_of_Ban}
    `;

    // Add a marker to the map
    L.marker([Latitude, Longitude]).addTo(map)
        .bindPopup(popupContent);
});
