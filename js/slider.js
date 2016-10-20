var Slider = (function () {
    
    var _slider = document.querySelector('#slider');
    var _slideWidth = $('#slider ul li').width();

    var _init = function () {
        _config();
        _bindEvents();
        setInterval(function () {
            _moveRight();
        }, 8000);
    };

    var _config = function () {

        _slider.style.display = "block";
        
        var slideCount = $('#slider ul li').length;
        var slideHeight = $('#slider ul li').height();

        var sliderUlWidth = slideCount * _slideWidth;

        $('#slider').css({ width: _slideWidth, height: slideHeight });
        $('#slider ul').css({ width: sliderUlWidth, marginLeft: - _slideWidth });
        $('#slider ul li:last-child').prependTo('#slider ul');

    };

    var _bindEvents = function () {
        $('a.control_prev').click(function () {
            _moveLeft();
        });
        $('a.control_next').click(function () {
            _moveRight();
        });
    };

    var _moveLeft = function () {
        $('#slider ul').animate({
            left: + _slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    var _moveRight = function () {
        $('#slider ul').animate({
            left: - _slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    return {
        init: _init
    };

}());
