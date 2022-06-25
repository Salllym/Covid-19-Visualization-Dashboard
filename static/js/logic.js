// Pulls in API routes and formats geoJSON files with appropriate coordinates
d3.json("/state_boundaries/geoJSON").then(function (state_data) {
    state_features = state_data.features;
    d3.json("/cleaned_covid_case/geoJSON").then(function (covid_data) {
        covid_features = covid_data.features;
        for (var i = 0; i < covid_features.length; i++){
            covid_features[i].geometry = state_features[i].geometry;
        };
        console.log(covid_data);
        createCovidMap(covid_data);
    });
    d3.json("/cleaned_covid_vaccine/geoJSON").then(function (vaccine_data) {
        vaccine_features = vaccine_data.features;
        for (var i = 0; i < vaccine_features.length; i++){
            vaccine_features[i].geometry = state_features[i].geometry;
        };
        console.log(vaccine_data);
        createVaccineMap(vaccine_data);
    });
});

// function createCovidCases(covid_data) {
//     L.geoJson(data, {
//         style: styleCovidCases,
//         onEachFeature: function (feature, layer) {
//             layer.bindPopup(`<h4>${feature['properties']['State/Territory']}</h4><hr><p>New Cases: ${feature['properties']['New Cases']}</p>
//                 <p>Cases in Last 7 Days: ${feature['properties']['Cases in Last 7 Days']}</p><p>7-Day Cases Rate per 100000: ${feature['properties']['7-Day Cases Rate per 100000']}</p>
//                 <p>Total Cases: ${feature['properties']['Total Cases']}</p><p>Case Rate per 100000: ${feature['properties']['Case Rate per 100000']}</p>`, 
//                 {closeButton: false, offset: L.point(-20, -20)});
//             layer.on('mouseover', function() {
//                 layer.openPopup();
//             });
//             layer.on('mouseout', function() {
//                 layer.closePopup();
//             });
//             layer.on('click', function(event) {
//                 map.fitBounds(event.target.getBounds());
//             });
//         }
//     });
// }

// function createCovidDeaths(covid_data) {
//     L.geoJson(covid_data, {
//         style: styleCovidDeaths,
//         onEachFeature: function (feature, layer) {
//             layer.bindPopup(`<h4>${feature['properties']['State/Territory']}</h4><hr><p>New Deaths: ${feature['properties']['New Deaths']}</p>
//                 <p>Deaths in Last 7 Days: ${feature['properties']['Deaths in Last 7 Days']}</p><p>7-Day Death Rate per 100000: ${feature['properties']['7-Day Death Rate per 100000']}</p>
//                 <p>Total Deaths: ${feature['properties']['Total Deaths']}</p><p>Death Rate per 100000: ${feature['properties']['Death Rate per 100000']}</p>`, 
//                 {closeButton: false, offset: L.point(-20, -20)});
//             layer.on('mouseover', function() {
//                 layer.openPopup();
//             });
//             layer.on('mouseout', function() {
//                 layer.closePopup();
//             });
//             layer.on('click', function(event) {
//                 map.fitBounds(event.target.getBounds());
//             });
//         }
//     });
// }

function createCovidMap(data) {
    
    var cases = L.geoJson(data, {
        style: styleCovidCases,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h4>${feature['properties']['State/Territory']}</h4><hr><p>New Cases: ${feature['properties']['New Cases']}</p>
                <p>Cases in Last 7 Days: ${feature['properties']['Cases in Last 7 Days']}</p><p>7-Day Cases Rate per 100000: ${feature['properties']['7-Day Cases Rate per 100000']}</p>
                <p>Total Cases: ${feature['properties']['Total Cases']}</p><p>Case Rate per 100000: ${feature['properties']['Case Rate per 100000']}</p>`, 
                {closeButton: false, offset: L.point(-20, -20)});
            layer.on('mouseover', function() {
                layer.openPopup();
            });
            layer.on('mouseout', function() {
                layer.closePopup();
            });
            layer.on('click', function(event) {
                map.fitBounds(event.target.getBounds());
            });
        }
    });
    var deaths = L.geoJson(data, {
        style: styleCovidDeaths,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h4>${feature['properties']['State/Territory']}</h4><hr><p>New Deaths: ${feature['properties']['New Deaths']}</p>
                <p>Deaths in Last 7 Days: ${feature['properties']['Deaths in Last 7 Days']}</p><p>7-Day Death Rate per 100000: ${feature['properties']['7-Day Death Rate per 100000']}</p>
                <p>Total Deaths: ${feature['properties']['Total Deaths']}</p><p>Death Rate per 100000: ${feature['properties']['Death Rate per 100000']}</p>`, 
                {closeButton: false, offset: L.point(-20, -20)});
            layer.on('mouseover', function() {
                layer.openPopup();
            });
            layer.on('mouseout', function() {
                layer.closePopup();
            });
            layer.on('click', function(event) {
                map.fitBounds(event.target.getBounds());
            });
        }
    });
    var overlayMaps = {
        Cases: cases,
        Deaths: deaths
    };

    var map = L.map('map', {
        center: [37.8, -96],
        zoom: 4,
        layers: [cases, deaths]
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.control.layers(null, overlayMaps, {
        collapsed: false
    }).addTo(map);
};

function createVaccineMap(data) {
    var map = L.map('map2', {
        center: [37.8, -96],
        zoom: 4,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.geoJson(data, {
        style: styleVaccine,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h3>${feature['properties']['State/Territory']}</h3>`);
        }
    }).addTo(map);
};

// Function to decide color for covid map
function getCovidCasesColor(x) {
    return x > 450 ? '#800026' :
           x > 300 ? '#E31A1C' :
           x > 150 ? '#FD8D3C' :
                     '#FED976';
};

// Function to decide color for covid map
function getCovidDeathsColor(x) {
    return x > 1.5 ? '#800026' :
           x > 1 ? '#E31A1C' :
           x > 0.5 ? '#FD8D3C' :
                     '#FED976';
};

// Function to style the covid_map
function styleCovidCases(feature) {
    return {
        fillColor: getCovidCasesColor(feature['properties']['7-Day Cases Rate per 100000']),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    }; 
}

// Function to style the covid_map
function styleCovidDeaths(feature) {
    return {
        fillColor: getCovidDeathsColor(feature['properties']['7-Day Death Rate per 100000']),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    }; 
}

// Function to decide color for vaccine map
function getVaccineColor(x) {
    return x > 200000 ? '#800026' :
           x > 150000 ? '#E31A1C' :
           x > 100000 ? '#FD8D3C' :
                     '#FED976';
};

// Function to style the vaccine_map
function styleVaccine(feature) {
    return {
        fillColor: getVaccineColor(feature['properties']['Doses Administered per 100k by State where Administered']),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    }; 
}