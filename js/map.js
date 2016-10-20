var Map = (function (Weather, Giphy, Menu) {

    var _map = null;
    var _marker = null;
    var _window = null;

    var _init = function () {
        _getLocation()
            .then(function (position) {
                _createMap(position);
            }, function (error) {
                _createMap();
            });
    };

    var _getLocation = function () {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    var _placeMarker = function (location) {

        if (_marker === null) {
            _marker = new google.maps.Marker({
                position: location,
                map: _map
            });
        } else {
            _marker.setPosition(location);
        }

        Weather.getForecast({
            lat: _marker.getPosition().lat(),
            long: _marker.getPosition().lng()
        })
            .then(function (data) {
                _searchGiphy(data);
            });

    };

    var _createMap = function (position) {

        var coordinates = { lat: 0.0, lng: 0.0 };

        if (position) {
            coordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        }

        _map = new google.maps.Map(document.querySelector('#map'), {
            center: coordinates,
            zoom: 8,
            mapTypeControl: false,
            streetViewControl: false
        });

        _map.addListener('click', function (event) {
            _placeMarker(event.latLng);
        });

    };

    var _searchGiphy = function (weatherData) {

        var searchTerm = weatherData.weather[0].description;
        var options = { limit: 5, offset: Math.floor(Math.random() * 5) };

        Giphy.getList(searchTerm, options)
            .then(function (giphyData) {                
                Menu.open(weatherData, giphyData);
            });

    };

    return {
        init: _init
    };

}(Weather, Giphy, Menu));
