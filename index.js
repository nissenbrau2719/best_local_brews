console.log("connected")

function getSearchArea() {
  $('form').on('click', $('#js-findBreweries'), function() {
    event.preventDefault();
    console.log('get search area');
  })
}

function watchForm() {
  $('form').one('click', $('#js-getStarted'), function(){
    event.preventDefault();
    console.log('ran watchForm');
    $('form').empty();
    $('form').append(`
    <fieldset>
      <legend><h2>Let's find the best breweries in your area!</h2></legend>
      <label for="location">Enter an address or location to search nearby:</label>
      <input type="text" name="location" id="location" required>
      <label for="searchRadius">How many miles are you willing to travel?:</label>
      <input type="number" id="searchRadius" value="5" min="1" max="31" required>
      <button type="submit" id="js-findBreweries">Find Breweries</button>
    </fieldset>
    `);
    getSearchArea();
  });
}

$(watchForm);