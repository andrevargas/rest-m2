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
                _openWindow(data);
            });

    };

    var _openWindow = function (data) {

        if (_window) {
            console.log('oi');
            _window.close();
        }

        _window = new google.maps.InfoWindow({
            content: "bubbubah"
        });

        _window.open(_map, _marker);

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

    return {
        init: _init
    };

}(Weather));
