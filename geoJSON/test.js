d3.json("/state_boundaries.json").then(function (state_data) {
    state_features = state_data.features;
    d3.json("/cleaned_covid_case.geojson").then(function (covid_data) {
        covid_features = covid_data.features;
        for (var i = 0; i < covid_features.length; i++){
            covid_features[i].geometry = state_features[i].geometry;
        };
        console.log(covid_data);
    });
    d3.json("/cleaned_covid_vaccine.geojson").then(function (vaccine_data) {
        vaccine_features = vaccine_data.features;
        for (var i = 0; i < vaccine_features.length; i++){
            vaccine_features[i].geometry = state_features[i].geometry;
        };
        console.log(vaccine_data);
    });
});