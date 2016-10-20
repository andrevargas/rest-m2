var Menu = (function () {

    var _menu = document.querySelector('#cbp-spmenu-s1');

    var _close = function () {
        classie.remove(_menu, 'cbp-spmenu-open');
        classie.remove(document.body, 'active');
        slider.style.display = "none";
    };

    var _appendContent = function (weatherData, giphyData) {

        var city = document.querySelector('#city');
        var weatherInfo = document.querySelector('#weatherInfo');
        var weatherGifs = document.querySelector('#weatherGifs');

        city.innerHTML = "<h4>" + weatherData.weather[0].description + "</h4>";
        weatherGifs.innerHTML = "<li><img class='weatherGif' src='" + giphyData.data[0].images.original.url + "' /></li><li><img class='weatherGif' src='" + giphyData.data[1].images.original.url + "' /></li><li><img class='weatherGif' src='" + giphyData.data[2].images.original.url + "' /></li><li><img class='weatherGif' src='" + giphyData.data[3].images.original.url + "' /></li><li><img class='weatherGif' src='" + giphyData.data[4].images.original.url + "' /></li>";
        weatherInfo.innerHTML = "<h3>" + weatherData.name + " (" + weatherData.main.temp + " °C)</h3><table><tr><th>Maximum Temperature</th><td>" + weatherData.main.temp_max + " °C</td></tr><tr><th>Minimum Temperature</th><td>" + weatherData.main.temp_min + " °C</td></tr><tr><th>Pressure</th><td>" + weatherData.main.pressure + "</td></tr><tr><th>Humidity</th><td>" + weatherData.main.humidity + "%</td></tr><tr><th>Wind Speed</th><td>" + weatherData.wind.speed + " meter/sec</td></tr><tr><th>Wind Direction</th><td>" + weatherData.wind.deg + "°</td></tr></table>";
    
    };

    var _open = function (weatherData, giphyData) {
        _appendContent(weatherData, giphyData);
        classie.add(document.body, 'active');
        classie.add(_menu, 'cbp-spmenu-open');
        Slider.init();
    };

    return {
        close: _close,
        open: _open
    };

}(Slider));
