app.WeatherManager = function () {

    var APIKey = 'eaed9c0ce907992ee2b7418dd1ec7f8b';
    var requestBaseURL = "http://api.openweathermap.org/data/2.5/weather?appid=" + APIKey;

    var self = this;

    self.getWeather = function (location) {
        $.ajax({
            method: 'GET',
            url: requestBaseURL + "&lat=" + location.lat + "&lon=" + location.long,
            success: function (data) {
                //TODO: Do something with this data ;)
                console.log(data);
            }
        });
    };

    self.listen = function (event) {
        document.addEventListener(event, function (ev) {
            self.getWeather(ev.detail);
        });
    }

};
