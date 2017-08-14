$(document).ready(function () {
    $('.category-button').click(function () {
        $('button').removeClass("selected");
        $(this).addClass("selected");
    });

}); // end ready

//autocomplete location name in form
function activatePlacesSearch() {
    let input = document.getElementById('search-term');
    let autocomplete = new google.maps.places.Autocomplete(input);
};
