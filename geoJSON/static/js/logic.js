// Pulls in API routes and formats geoJSON files with appropriate coordinates
d3.json("/state_boundaries/geoJSON").then(function (state_data) {
    state_features = state_data.features;
    d3.json("/cleaned_covid_case/geoJSON").then(function (covid_data) {
        covid_features = covid_data.features;
        for (var i = 0; i < covid_features.length; i++){
            covid_features[i].geometry = state_features[i].geometry;
        };
        console.log(covid_data);
        L.geoJSON(covid_data).addTo(myMap);
    });
    d3.json("/cleaned_covid_vaccine/geoJSON").then(function (vaccine_data) {
        vaccine_features = vaccine_data.features;
        for (var i = 0; i < vaccine_features.length; i++){
            vaccine_features[i].geometry = state_features[i].geometry;
        };
        console.log(vaccine_data);
    });
});