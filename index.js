const WEATHER_SEARCH_URL = "https://api.openweathermap.org/data/2.5/weather?id=524901&APPID=d86b9843fdc4941e520f985922146256"
const FOURSQUARE_SEARCH_URL = "https://api.foursquare.com/v2/venues/explore?&client_id=FPRD2S2RFIB4QLBNBBHNAMLYOUF2AZSZ21ZK53QYASWCRJ1Z&client_secret=FEFA44EG0YDZ0XKA1UWX5ZWLZJLE30E2GYRLGB44PKE5KZ0E&v=20170915"

//press on submit button and scroll to results
function scrollPageTo(myTarget, topPadding) {
    if (topPadding == undefined) {
        topPadding = 0;
    }
    var moveTo = $(myTarget).offset().top - topPadding;
    $('html, body').stop().animate({
        scrollTop: moveTo
    }, 200);
}


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
            scrollPageTo('#weather-display', 15);
        }
    });
}

function displayWeather(data) {
    return `
    <div class="weather-results">
        <h1><strong>Current Weather for ${data.name}</strong></h1>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <p style="font-size:30px; margin-top:10px;">${data.weather[0].main}</p>
        <p style="color:steelblue;" ">Description:</p><p"> ${data.weather[0].description}</p>
        <p style="color:steelblue;">Temperature:</p><p> ${data.main.temp} &#8457; / ${(((data.main.temp)-32)*(5/9)).toFixed(2)} &#8451;</p>
        <p style="color:steelblue;">Min. Temperature:</p><p> ${data.main.temp_min} &#8457; / ${(((data.main.temp_min)-32)*(5/9)).toFixed(2)} &#8451</p>
        <p style="color:steelblue;">Max. Temperature:</p><p> ${data.main.temp_max} &#8457; / ${(((data.main.temp_max)-32)*(5/9)).toFixed(2)} &#8451</p>
        <p style="color:steelblue;">Humidity:</p><p> ${data.main.humidity} &#37;</p>
    </div>
`;
}

//retrieve data from FourSquare API
function getFourSquareData() {
    $('.category-button').click(function () {
        let city = $('.search-query').val();
        let category = $(this).text();
        $.ajax(FOURSQUARE_SEARCH_URL, {
            data: {
                near: city,
                venuePhotos: 1,
                limit: 9,
                query: 'recommended',
                section: category,
            },
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                try {
                    let results = data.response.groups[0].items.map(function (item, index) {
                        return displayResults(item);
                    });
                    $('#foursquare-results').html(results);
                    scrollPageTo('#foursquare-results', 15);
                } catch (e) {
                    $('#foursquare-results').html("<div class='result'><p>Sorry! No Results Found.</p></div>");
                }
            }
        });
    });
}

function displayResults(result) {
    return `
        <div class="result col-3">
            <div class="result-image" style="background-image: url(https://igx.4sqi.net/img/general/width960${result.venue.photos.groups[0].items[0].suffix})" ;>
            </div>
            <div class="result-description">
                <h2 class="result-name"><a href="${result.venue.url}" target="_blank">${result.venue.name}</a></h2>
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
    $('.category-button').click(function () {
        $('button').removeClass("selected");
        $(this).addClass("selected");
    });

    $('.search-form').submit(function (event) {
        event.preventDefault();
        $('.navigation').removeClass("hide");
        $('#weather-display').html("");
        $('#foursquare-results').html("");
        getWeatherData();
        getFourSquareData();
        $('button').removeClass("selected");
    });
}

//autocomplete location name in form
function activatePlacesSearch() {
    let options = {
        types: ['(regions)']
    };
    let input = document.getElementById('search-term');
    let autocomplete = new google.maps.places.Autocomplete(input, options);
}


$(enterLocation);
