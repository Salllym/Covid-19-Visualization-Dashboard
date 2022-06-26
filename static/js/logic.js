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
    
    var baseMaps = {
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

   L.control.layers(baseMaps, null, {
        collapsed: false
    }).addTo(map);

    var casesLegend = L.control({position: 'bottomright'});

    casesLegend.onAdd = function () {
        
        var div = L.DomUtil.create('div', 'info legend'),
            criteria = ["0-125", "125-200", "200-300", ">300"],
            colors = ["#FED976", "#FD8D3C", "#E31A1C", "#800026"];
        
        div.innerHTML = '<h4>Cases per 100,000</h4>'
        for (var i = 0; i < criteria.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                criteria[i] + '<br>';
            
        };
        return div;
    };

    var deathsLegend = L.control({position: 'bottomright'});

    deathsLegend.onAdd = function () {
        
        var div = L.DomUtil.create('div', 'info legend'),
            criteria = ["0-0.4", "0.4-0.8", "0.8-1.2", ">1.2"],
            colors = ["#FED976", "#FD8D3C", "#E31A1C", "#800026"];
        
        div.innerHTML = '<h4>Deaths per 100,000</h4>'
        for (var i = 0; i < criteria.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                criteria[i] + '<br>';
            
        };
        return div;
    };
    
    deathsLegend.addTo(map);
    var currentLegend = deathsLegend;

    map.on('baselayerchange', function (eventLayer) {
        if (eventLayer.name === "Cases") {
            map.removeControl(currentLegend);
            currentLegend = casesLegend;
            casesLegend.addTo(map);
        }
        else if (eventLayer.name === "Deaths") {
            map.removeControl(currentLegend);
            currentLegend = deathsLegend;
            deathsLegend.addTo(map);
        }
    });
};

function createVaccineMap(data) {
    var administered = L.geoJson(data, {
        style: styleVaccineAdministered,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h4>${feature['properties']['State/Territory']}</h4><hr><p>Total Doses Administered: ${feature['properties']['Total Doses Administered by State where Administered']}</p>
                <p>Total Doses Administerd per 100000: ${feature['properties']['Doses Administered per 100k by State where Administered']}</p><p>People Fully Vaccinated: ${feature['properties']['People Fully Vaccinated by State of Residence']}</p>`, 
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
    var distributed = L.geoJson(data, {
        style: styleVaccineDistributed,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h4>${feature['properties']['State/Territory']}</h4><hr><p>Total Doses Distributed: ${feature['properties']['Total Doses Distributed']}</p>
                <p>Total Doses Distributed per 100000: ${feature['properties']['Doses Distributed per 100K']}</p><p>People Fully Vaccinated: ${feature['properties']['People Fully Vaccinated by State of Residence']}</p>`,
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
    
    var baseMaps = {
        Administered: administered,
        Distributed: distributed
    };

    var map = L.map('map2', {
        center: [37.8, -96],
        zoom: 4,
        layers: [administered, distributed]
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.control.layers(baseMaps, null, {
        collapsed: false
    }).addTo(map);

    var administeredLegend = L.control({position: 'bottomleft'});

    administeredLegend.onAdd = function () {
        
        var div = L.DomUtil.create('div', 'info legend'),
            criteria = ["0-125,000", "125,000-175,000", "175,000-225,000", ">225,000"],
            colors = ["#FED976", "#FD8D3C", "#E31A1C", "#800026"];
        
        div.innerHTML = '<h4>Vaccines Administered per 100,000</h4>'
        for (var i = 0; i < criteria.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                criteria[i] + '<br>';
            
        };
        return div;
    };

    var distributedLegend = L.control({position: 'bottomleft'});

    distributedLegend.onAdd = function () {
        
        var div = L.DomUtil.create('div', 'info legend'),
            criteria = ["0-190,000", "190,000-230,000", "230,000-270,000", ">270,000"],
            colors = ["#FED976", "#FD8D3C", "#E31A1C", "#800026"];
        
        div.innerHTML = '<h4>Vaccines Distributed per 100,000</h4>'
        for (var i = 0; i < criteria.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                criteria[i] + '<br>';
            
        };
        return div;
    };
    
    distributedLegend.addTo(map);
    var currentLegend = distributedLegend;

    map.on('baselayerchange', function (eventLayer) {
        if (eventLayer.name === "Administered") {
            map.removeControl(currentLegend);
            currentLegend = administeredLegend;
            administeredLegend.addTo(map);
        }
        else if (eventLayer.name === "Distributed") {
            map.removeControl(currentLegend);
            currentLegend = distributedLegend;
            distributedLegend.addTo(map);
        }
    });
};

// Function to decide color for covid map
function getCovidCasesColor(x) {
    return x > 300 ? '#800026' :
           x > 200 ? '#E31A1C' :
           x > 125 ? '#FD8D3C' :
                     '#FED976';
};

// Function to decide color for covid map
function getCovidDeathsColor(x) {
    return x > 1.2 ? '#800026' :
           x > 0.8 ? '#E31A1C' :
           x > 0.4 ? '#FD8D3C' :
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
function getVaccineAdministeredColor(x) {
    return x > 225000 ? '#800026' :
           x > 175000 ? '#E31A1C' :
           x > 125000 ? '#FD8D3C' :
                     '#FED976';
};

// Function to decide color for vaccine map
function getVaccineDistributedColor(x) {
    return x > 270000 ? '#800026' :
           x > 230000 ? '#E31A1C' :
           x > 190000 ? '#FD8D3C' :
                     '#FED976';
};

// Function to style the vaccine_map
function styleVaccineAdministered(feature) {
    return {
        fillColor: getVaccineAdministeredColor(feature['properties']['Doses Administered per 100k by State where Administered']),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    }; 
}

// Function to style the vaccine_map
function styleVaccineDistributed(feature) {
    return {
        fillColor: getVaccineDistributedColor(feature['properties']['Doses Distributed per 100K']),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    }; 
}