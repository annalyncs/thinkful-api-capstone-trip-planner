$(document).ready(function () {
    $('.category-button').click(function () {
        $('button').removeClass("selected");
        $(this).addClass("selected");
    });


    const WEATHER_SEARCH_URL = "http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=d86b9843fdc4941e520f985922146256"

    function enterLocation() {
        $('.search-form').submit(function (event) {
            event.preventDefault();
            var city = $('.search-query').val();

            $.ajax(WEATHER_SEARCH_URL, {
                data: {
                    units: 'imperial',
                    q: city
                },
                dataType: 'jsonp',
                type: 'GET',
                success: function (data) {
                    var widget = displayWeather(data);
                    $('#weather-display').html(widget);
                }
            });
        });

        function displayWeather(data) {
            return `
            <div class="weather-results">
                <h1><strong>Current Weather for ${data.name}</strong></h1>
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
                <p><strong>Weather:</strong> ${data.weather[0].main}</p>
                <p><strong>Description:</strong> ${data.weather[0].description}</p>
                <p><strong>Temperature:</strong> ${data.main.temp} &#8457;</p>
                <p><strong>Min. Temperature:</strong> ${data.main.temp_min} &#8457;</p>
                <p><strong>Max. Temperature:</strong> ${data.main.temp_max} &#8457;</p>
                <p><strong>Humidity:</strong> ${data.main.humidity} &#37;</p>
            </div>
            `;
        }
    }


    enterLocation();
}); // end ready

//autocomplete location name in form
function activatePlacesSearch() {
    let input = document.getElementById('search-term');
    let autocomplete = new google.maps.places.Autocomplete(input);
};
