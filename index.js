let locationArr;
let searchLocation;
let searchRadius;
let latLng;
const searchForm = 
`<fieldset>
  <legend><h2>Let's find the best breweries in your area!</h2></legend>
  <label for="location">Enter an address or location to search nearby:</label>
  <input type="text" name="location" id="location" required>
  <label for="searchRadius">How many miles are you willing to travel?:</label>
  <input type="number" id="searchRadius" value="5" min="1" max="31" required>
  <button type="submit" id="js-findBreweries">Find Breweries</button>
</fieldset>`;

function findBreweries() {
  console.log('search ready');
  

}

function getMap() {
  $('#mapContainer').html(`<iframe
  frameborder="0" style="border:0"
  src="https://www.google.com/maps/embed/v1/search?key=${gKey}&q=breweries+near+${searchLocation}" allowfullscreen>
  </iframe>`)
$('form, header').addClass('hidden');
$('#js-results').removeClass('hidden');
}

function getGeoLocation() {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${gKey}`)
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error(response.statusText);
      })
    .then(responseJson => latLng = responseJson.results[0].geometry.location)
    .then(console.log(latLng))
    .then(findBreweries())
    .catch(error => alert(`Something went wrong: ${error.message}`));
}

function getSearchParams() {
  $('form').on('click', '#js-findBreweries', function(event) {
    event.stopPropagation();
    event.preventDefault();
    if($('#location').val() === "") {
      alert("Please enter an address or location");
    } else if($('#searchRadius').val() < 1 || $('#searchRadius').val() > 31 ) {
      alert("Please enter a search radius between 1 and 31");
    } else {
      locationArr = $('#location').val().split(" ");
      searchLocation = locationArr.join("+");
      searchRadius = $('#searchRadius').val();
      getGeoLocation();
      // getMap();
      findBreweries();
    }
  });  
}



function watchForm() {
  $('#js-getStarted').click(event => {
    event.stopPropagation();
    event.preventDefault();
    $('form').empty();
    $('form').html(searchForm);
    getSearchParams();
  });
}

$(watchForm);