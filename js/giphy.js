app.GiphyFactory = function (searchTerm, options) {

    var APIKey = 'dc6zaTOxFJmzC';
    var requestBaseURL = 'http://api.giphy.com/v1/gifs/search?api_key=' + APIKey;

    var createQueryURL = function () {

        var url = requestBaseURL + "&q=" + searchTerm;

        if (typeof(options) === "object") {
            for (prop in options) {
                if (!options.hasOwnProperty(prop)) return;
                url += "&" + prop + "=" + options[prop];
            }
        }

        return url;
    };

    $.ajax({
        method: 'GET',
        url: createQueryURL(),
        success: function (data) {
            //TODO: Do something here too ;D
            console.log(data);
        }
    });

};
