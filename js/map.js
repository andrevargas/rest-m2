var Map = (function (Weather) {

    var _map = null;
    var _marker = null;
    var _window = null;

    var _init = function () {
        _getLocation()
            .then(function (position) {
                _createMap(position);
            }, function (error) {
                console.error(error);
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
                _openInfoWindow(data);
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
            zoom: 8
        });

        _map.addListener('click', function (event) {
            _placeMarker(event.latLng);
        });

    };

    var _openInfoWindow = function (data) {

        var searchTerm = data.weather[0].description;
        var options = { limit: 5, offset: Math.floor(Math.random() * 5) };

        Giphy.getList(searchTerm, options)
            .then(function (result) {

                var infoWindow = new google.maps.InfoWindow({
                    content: "<img src='" + result.data[0].images.original.url + "' />"
                });

                infoWindow.open(_map, _marker);

            });

    };

    return {
        init: _init
    };

}(Weather, Giphy));
