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

function getSearchParams() {
  $('form').on('click', '#js-findBreweries', function(event) {
    event.stopPropagation();
    event.preventDefault();
    if($('#location').val() === "") {
      alert("Please enter an address or location");
    } else if($('#searchRadius').val() < 1 || $('#searchRadius').val() > 31 ) {
      alert("Please enter a search radius between 1 and 31");
    } else {
      searchLocation = $('#location').val();
      console.log(searchLocation)
      searchRadius = $('#searchRadius').val();
      console.log(searchRadius);
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