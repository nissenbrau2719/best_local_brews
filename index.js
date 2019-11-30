
let searchLocation;
let searchRadius;
// let lat;
// let long;
// let coord = {};

const searchForm = 
`<fieldset>
  <legend><h2>Let's find the best breweries in your area!</h2></legend>
  <label for="location">Enter an address or location to search nearby:</label>
  <input type="text" name="location" id="location" required>
  <label for="searchRadius">How many miles are you willing to travel?:</label>
  <input type="number" id="searchRadius" value="5" min="1" max="31" required>
  <button type="submit" id="js-findBreweries">Find Breweries</button>
</fieldset>`;

function findBreweries(latitude, longitude) {
  // let coord = {
  //   "lat": latitude,
  //   "long": longitude
  // };
  // console.log(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=breweries&location=${latitude},${longitude}&radius=${searchRadius}&key=${gKey}`);
  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=breweries&location=${latitude},${longitude}&radius=${searchRadius}&key=${gKey}`)
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson))
    .catch(error => alert(`Something went wrong: ${error.message}`));
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
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${gKey}`, )
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error(response.statusText)
      })
    .then(responseJson => {
      findBreweries(responseJson.results[0].geometry.location.lat, responseJson.results[0].geometry.location.lng)
      // coord = responseJson.results[0].geometry.location
      // lat =  responseJson.results[0].geometry.location.lat;
      // long = responseJson.results[0].geometry.location.lng;
    })
    
    // .then(findBreweries())
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
      let locationArr = $('#location').val().split(" ");
      searchLocation = locationArr.join("+");
      searchRadius = $('#searchRadius').val() * 1609.344;
      getGeoLocation();
      // getMap();
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