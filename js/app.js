var app = app || {};

app.init = function () {
    var mapManager = new app.MapManager(),
        weatherManager = new app.WeatherManager();
    mapManager.init();
    weatherManager.listen('markerPlaced');
};
