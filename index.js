const WEATHER_SEARCH_URL = "http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=d86b9843fdc4941e520f985922146256"
const FOURSQUARE_SEARCH_URL = "https://api.foursquare.com/v2/venues/explore?&client_id=FPRD2S2RFIB4QLBNBBHNAMLYOUF2AZSZ21ZK53QYASWCRJ1Z&client_secret=FEFA44EG0YDZ0XKA1UWX5ZWLZJLE30E2GYRLGB44PKE5KZ0E&v=20170915"

//press on submit button and scroll to results
function scrollPageTo(myTarget, topPadding) {
    if (topPadding == undefined) {
        topPadding = 0;
    }
    var moveTo = $(myTarget).offset().top - topPadding;
    $('html, body').stop().animate({
        scrollTop: moveTo
    }, 500);
}

//add and remove styling to currently selected button
$('.category-button').click(function () {
    $('button').removeClass("selected");
    $(this).addClass("selected");
});

//retrieve data from OpenWeather API
function getWeatherData() {
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
}

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

//retrieve data from FourSquare API
function getFourSquareData() {
    let city = $('.search-query').val();
    $.ajax(FOURSQUARE_SEARCH_URL, {
        data: {
            near: city,
            venuePhotos: 1,
            limit: 9,
            query: 'recommended'
        },
        dataType: 'jsonp',
        type: 'GET',
        success: function (data) {
            let results = data.response.groups[0].items.map(function (item, index) {
                return displayResults(item);
            });
            $('#foursquare-results').html(results);
            $('button').removeClass("selected");
            scrollPageTo('#weather-display', 15);
        }
    });
}

function clickCategory() {
    $('.category-button').click(function () {
        let category = $(this).text();
        let city = $('.search-query').val();
        $.ajax(FOURSQUARE_SEARCH_URL, {
            data: {
                section: category,
                near: city,
                venuePhotos: 1,
                limit: 9,
            },
            dataType: 'jsonp',
            type: 'GET',
            success: function (data) {
                let results = data.response.groups[0].items.map(function (item, index) {
                    return displayResults(item);
                });
                $('#foursquare-results').html(results);
            }
        })
    });
}


function displayResults(result) {
    return `
        <div class="result col-3">
            <div class="result-image" style="background-image: url(https://igx.4sqi.net/img/general/width960${result.venue.photos.groups[0].items[0].suffix})" ;>
            </div>
            <div class="result-description">
                <h2 class="result-name">${result.venue.name}</h2>
                <span class="icon">
                    <img src="${result.venue.categories[0].icon.prefix}bg_32${result.venue.categories[0].icon.suffix}" alt="category-icon">
                </span>
                <span class="icon-text">
                    ${result.venue.categories[0].name}
                </span>
                <p class="result-address">${result.venue.location.formattedAddress[0]}</p>
                <p class="result-address">${result.venue.location.formattedAddress[1]}</p>
                <p class="result-address">${result.venue.location.formattedAddress[2]}</p>
            </div>
        </div>
`;
}



function enterLocation() {
    $('.search-form').submit(function (event) {
        event.preventDefault();
        $('.navigation').removeClass("hide");
        getWeatherData();
        getFourSquareData();
    });
}

//autocomplete location name in form
function activatePlacesSearch() {
    let input = document.getElementById('search-term');
    let autocomplete = new google.maps.places.Autocomplete(input);
};

$(enterLocation);
$(clickCategory);
