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

function createCovidMap(data) {
    var map = L.map('map', {
        center: [37.8, -96],
        zoom: 4,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.geoJson(data, {
        style: style_covid,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h3>${feature['properties']['State/Territory']}</h3>`);
        }
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
        style: style_vaccine,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h3>${feature['properties']['State/Territory']}</h3>`);
        }
    }).addTo(map);
};

// Function to decide color for covid map
function getCovidColor(x) {
    return x > 450 ? '#800026' :
           x > 300 ? '#E31A1C' :
           x > 150 ? '#FD8D3C' :
                     '#FED976';
};

// Function to style the covid_map
function style_covid(feature) {
    return {
        fillColor: getCovidColor(feature['properties']['7-Day Cases Rate per 100000']),
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
function style_vaccine(feature) {
    return {
        fillColor: getVaccineColor(feature['properties']['Doses Administered per 100k by State where Administered']),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    }; 
}