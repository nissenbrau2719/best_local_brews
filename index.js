let locationArr;
let searchLocation;
let searchRadius;
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
  $('#js-results').prepend(`<iframe
  width="1000"
  height="700"
  frameborder="0" style="border:0"
  src="https://www.google.com/maps/embed/v1/search?key=AIzaSyAXNQdYbdFDBIn-VOTayp_jWh2M0x7Zlj4&q=breweries+near+${searchLocation}" allowfullscreen>
  </iframe>`)
$('form, header').addClass('hidden');
$('#js-results').removeClass('hidden');
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
      getMap()
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