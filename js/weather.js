var Weather = (function () {

    var _APIKey = 'eaed9c0ce907992ee2b7418dd1ec7f8b';
    var _requestBaseURL = "http://api.openweathermap.org/data/2.5/weather?appid=" + _APIKey;

    var _getForecast = function (location) {
        return $.ajax({
            method: 'GET',
            url: _requestBaseURL + "&lat=" + location.lat + "&lon=" + location.long
        });
    };

    return {
        getForecast: _getForecast
    };

}());
