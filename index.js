$(document).ready(function () {
    $('.category-button').click(function () {
        $('button').removeClass("selected");
        $(this).addClass("selected");
    });


    const WEATHER_SEARCH_URL = "http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=d86b9843fdc4941e520f985922146256"
    const FOURSQUARE_SEARCH_URL = "https://api.foursquare.com/v2/venues/explore?&client_id=FPRD2S2RFIB4QLBNBBHNAMLYOUF2AZSZ21ZK53QYASWCRJ1Z&client_secret=FEFA44EG0YDZ0XKA1UWX5ZWLZJLE30E2GYRLGB44PKE5KZ0E&v=20170915"

    function scrollPageTo(myTarget, topPadding) {
        if (topPadding == undefined) {
            topPadding = 0;
        }
        var moveTo = $(myTarget).offset().top - topPadding;
        $('html, body').stop().animate({
            scrollTop: moveTo
        }, 500);
    }

    function enterLocation() {
        $('.search-form').submit(function (event) {
            event.preventDefault();
            $('.navigation').removeClass("hide");

            let city = $('.search-query').val();

            $.ajax(WEATHER_SEARCH_URL, {
                data: {
                    units: 'imperial',
                    q: city
                },
                dataType: 'jsonp',
                type: 'GET',
                success: function (data) {
                    let widget = displayWeather(data);
                    $('#weather-display').html(widget);
                }
            });

            $.ajax(FOURSQUARE_SEARCH_URL, {
                data: {
                    near: city,
                    venuePhotos: 1,
                    limit: 9
                },
                dataType: 'jsonp',
                type: 'GET',
                success: function (data) {
                    let results = data.response.groups[0].items.map(function (item, index) {
                        return displayResults(item);
                    });
                    $('#foursquare-results').html(results);
                    scrollPageTo('#weather-display', 15);
                }
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

            function displayResults(result) {
                return `
                    <div class="result col-3">
                        <div class="result-image" style="background-image: url(https://igx.4sqi.net/img/general/width960/PF3gPzpfID61aJDeu6FWbsLDinvb4c5UbTHOiHTqX1w.jpg)" ;>
                        </div>
                    <div class="result-description">
                        <h2 class="result-name">${result.venue.name}</h2>
                        <p class="category">${result.venue.categories[0].name}</p>
                        <p class="result-address">${result.venue.location.formattedAddress}</p>
                    </div>
                    </div>
                `;
            }
        });
    }

    enterLocation();
}); // end ready

//autocomplete location name in form
function activatePlacesSearch() {
    let input = document.getElementById('search-term');
    let autocomplete = new google.maps.places.Autocomplete(input);
};


// display navigation in HTML
// write functionality for a new AJAX call to be made
// each time a category button is clicked
