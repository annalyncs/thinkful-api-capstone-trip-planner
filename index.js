$(document).ready(function () {
    $('.category-button').click(function () {
        $('button').removeClass("selected");
        $(this).addClass("selected");
    });


    const WEATHER_SEARCH_URL = "http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=d86b9843fdc4941e520f985922146256"
    const FOURSQUARE_SEARCH_URL = "https://api.foursquare.com/v2/venues/explore?&client_id=FPRD2S2RFIB4QLBNBBHNAMLYOUF2AZSZ21ZK53QYASWCRJ1Z&client_secret=FEFA44EG0YDZ0XKA1UWX5ZWLZJLE30E2GYRLGB44PKE5KZ0E&v=20170915"

    function enterLocation() {
        $('.search-form').submit(function (event) {
            event.preventDefault();
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

            function displayResultsNav() {
                return `
                <nav role="navigation" class="navigation" id="results-navigation">
                    <div class="options row">
                        <button class="category-button" id="food-button">FOOD</button>
                        <button class="category-button" id="nightlife-button">NIGHTLIFE</button>
                        <button class="category-button" id="shops-button">SHOPS</button>
                        <button class="category-button" id="outdoors-button">OUTDOORS</button>
                        <button class="category-button" id="entertainment-button">ENTERTAINMENT</button>
                    </div>
                </nav>
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
