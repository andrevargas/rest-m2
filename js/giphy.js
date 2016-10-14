var Giphy = (function () {

    var _APIKey = 'dc6zaTOxFJmzC';
    var _requestBaseURL = 'http://api.giphy.com/v1/gifs/search?api_key=' + _APIKey;

    var _createQueryURL = function (searchTerm, options) {

        var url = _requestBaseURL + "&q=" + searchTerm;

        if (typeof options === "object") {
            for (var prop in options) {
                if (!options.hasOwnProperty(prop)) return;
                url += "&" + prop + "=" + options[prop];
            }
        }

        return url;

    };

    var _getList = function (searchTerm, options) {
        return $.ajax({
            method: 'GET',  
            url: _createQueryURL(searchTerm, options)
        });
    };

    return {
        getList: _getList
    };

}());
