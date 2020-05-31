$(document).ready(function () {

    var apiKey = "&appid=6d4852a634a4e23b1d44d3709537773d";

    var lat;
    var long;
    var cityNames = [];

    var question = confirm('Do you want this app to track your location? Ok for Yes , Cancel for No');
    if (question === true) {
        alert("This application will now track your location. Please go to your browser's setting and enable location.");
        getLocation();
    }
    else {
        $('#info').text('Enter a city on the search box!');
        $('#info2').text('Forget the weather person on your local cable network. Today, smartphone and web apps provide up-to-the-minute weather alerts and updates that can’t be found anywhere else.');//
    }


    function getLocation() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess);
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function geoSuccess(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        $('#info').remove();
        $('#info2').remove();

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=imperial" + apiKey,
            type: "GET",
            dataType: "json",
            success: function (data) {

                var today = new Date(Date.now());
                var date = today.toDateString();
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                var iconObj = data.weather[0].icon;


                $('#location').text(data.name);
                $('#dateNow').text(date);
                $('#con').text('Current condition: ' + data.weather[0].description);
                $('#temp').text('Now: ' + (parseInt(data.main.temp).toFixed(1)) + ' ' + String.fromCharCode(176) + 'F');
                $('#humidity').text('Humidity: ' + data.main.humidity + '%');
                $('#windSpeed').text('Wind Speed: ' + data.wind.speed + ' MPH');
                $('#like').text('Feels like: ' + (parseInt(data.main.feels_like).toFixed(1) + ' ' + String.fromCharCode(176) + 'F'));
                $('#low').text('Lows for today : ' + (parseInt(data.main.temp_min).toFixed(1) + ' ' + String.fromCharCode(176) + 'F'));
                $('#high').text('Highs for today: ' + (parseInt(data.main.temp_max).toFixed(1) + ' ' + String.fromCharCode(176) + 'F'));
                $('#rise').text('Sunrise: ' + unix_Time(data.sys.sunrise));
                $('#set').text('Sunset: ' + unix_Time(data.sys.sunset));
                $('#pressure').text('Pressure: ' + data.main.pressure + ' ' + 'Pa');
                console.log(unix_Time(data.sys.sunrise));
                updateUvIndex(lat, lon);

                var iconURL = "https://openweathermap.org/img/w/" + iconObj + ".png";
                var cityImg = $("<img>");
                cityImg.attr("src", iconURL);
                $('#location').append(cityImg);

                fiveDayFor(data.name);

            }
        });

    }

    