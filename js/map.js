app.MapManager = function () {

    var self = this;

    self.map = null;
    self.marker = null;

    self.init = function () {

        self.getLocation()
            .then(function (position) {
                self.createMap(position);
            })
            .fail(function (error) {
                self.createMap();
            });

    };

    self.placeMarker = function (location) {

        if (self.marker === null) {
            self.marker = new google.maps.Marker({
                position: location,
                map: self.map
            });
        } else {
            self.marker.setPosition(location);
        }

        document.dispatchEvent(new CustomEvent('markerPlaced', {
            detail: {
                lat: self.marker.getPosition().lat(),
                long: self.marker.getPosition().lng()
            }
        }));

    };

    self.getLocation = function () {

        var deferred = $.Deferred();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject);
        } else {
            deferred.reject();
        }

        return deferred.promise();
    };

    self.createMap = function (position) {

        var coordinates = {
            lat: 0.0,
            lng: 0.0
        };

        if (position) {
            coordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        }

        self.map = new google.maps.Map(document.querySelector('#map'), {
            center: coordinates,
            zoom: 7
        });

        self.map.addListener('click', function (event) {
            self.placeMarker(event.latLng);
        });
    }

};
