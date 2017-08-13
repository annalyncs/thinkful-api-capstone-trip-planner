//URL for foursquare API endpoint
const FOURSQUARE_SEARCH_URL = "https://api.foursquare.com/v2/venues/explore"
//URL for weather API endpoint
const WEATHER_CALL_URL = "api.openweathermap.org/data/2.5/weather"

//function to retrieve API data from Foursquare
//include Name of place, category, address

//function to retrieve API data from weather
//include weather icon

//function to iterate over API data from Foursquare and to insert new HTML

//function to retrieve location from form input and use weather API to insert data into HTML


//click on navigation button add/remove selected class

//autocomplete location name in form
function activatePlacesSearch() {
    var input = document.getElementById('search-term');
    var autocomplete = new google.maps.places.Autocomplete(input);
}
