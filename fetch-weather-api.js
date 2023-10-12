// FOUNDATION //
// Step 1 - Get started with the weather API //

// HTML variables
// const weatherConditions = "";
// const temperature = "";
//
// const sunrise = "";
// const sunset = "";

// const city = "";
// const weather-message-container = "";
// weatherIcon

// const forcast = "";
// const forecastDay = "";
// const temperature = "";


// const types = document.getElementById("types"); //

let URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=19e3f1df0b9dcbf3b903658b9bf5177c";
let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8174b34f755933df367987fbb0eefd50";
const container = document.getElementById("activity");

const fetchWeather = async () => {
  try {
    // Handle the response data here
    const response = await fetch(URL);
    const resJson = await response.json();
    console.log(resJson);

    // Save data in respective variables
    const timeZone = resJson.timezone;
    const temp = resJson.main.temp;
    // Example usage: Display the values in HTML elements
    weight.textContent = timeZone;
    element.textContent = temp;
  } catch (error) {
    container.innerText = error;
  }
};
fetchWeather();


const fetchForecastWeather = async () => {
  try {
    // Handle the response data here
    const response = await fetch(forecastURL);
    const cod = await response.json();
    console.log(cod);
  } catch (error) {
    container.innerText = error;
  }
};
fetchForecastWeather();


/* const fetchPokemonsTryCatch = async () => {
  try {
    let shortUrl = "https://pokeapi.co/api/v2/pokemon";
    let longUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

    const responseFromApi = await fetch(longUrl);
    const individualPokemon = await responseFromApi.json();

    let pokeApi = individualPokemon.results;
    pokeApi.forEach((pokemon) => console.log(pokemon));
  } catch (error) {
    console.log(error);
  }
};

//fetchPokemonsTryCatch();

// 2) a) As you can see, we get some metadata as well as
//    the results of the fetch. Change the console.log so
//    that you only log the array of pokemon objects.

//    b) Log only the name of the first pokemon in the
//    pokemon objects array

//    c) Log the names of all pokemons in the array

// 3) You might know that there are more than 20 pokemons
//    in the pokedex (1050 to be exact). Add a query parameter
//    called "limit" to the URL, and set it to a number of your
//    choice, like this: https://pokeapi.co/api/v2/pokemon/?limit=151
//    and pick a pokemon that you would like to continue
//    working with. Copy the pokemon's URL.

// 4) Now that we've picked a pokemon, we will do a new fetch
//    to the URL we copied. Since that's another endpoint,
//    we will create a new fetch inside the fetchBulbasaurData
//    function (change the function's name to fit your pokemon).
//    Log the data in the console and see what you find.

const fetchCharizardData = async () => {
  try {
    let pokemonById = "https://pokeapi.co/api/v2/pokemon/6/";

    const responseFromApi = await fetch(pokemonById);
    const individualPokemon = await responseFromApi.json();

    const pokeApi = individualPokemon;
    console.log(pokeApi);

    // Save data in respective variables
    const nameValue = pokeApi.name;
    const heightValue = pokeApi.height;
    const weightValue = `${pokeApi.weight} KG's`;
    const typesValue = pokeApi.types.map((type) => type.type.name);
    const strengthValue = pokeApi.id;
    const pokemonImage = pokeApi.sprites.front_default;

    // Example usage: Display the values in the console
    console.log(nameValue);
    console.log(heightValue);
    console.log(weightValue);
    console.log(typesValue);

    // Example usage: Display the values in HTML elements
    name.textContent = nameValue;
    height.textContent = heightValue;
    weight.textContent = weightValue;
    types.textContent = typesValue.join(", ");
    element.textContent = strengthValue;
    image.src = pokemonImage;
  } catch (error) {
    console.log(error);
  }
};
fetchCharizardData();
// 5) After familiarizing with the data, we will use the data
//    to change our table. We will give you the image as a start.
//    If you named the data something else than json, you change the
//    word json below so it corresponds with your code. Here goes:
//    image.src = json.sprites.front_default;
//    Copy that line into the fetchBulbasaurData and hopefully
//    the image in the HTML updates.

// 6) Update the innerHTML of the other rows as well after
//    you've found the correct path in the json.
//    HINT --> Log stuff in the console to try things out
//    HINT --> If it's an array - map over the array

// ***BONUS***
// Check out the API's documentation and try to fetch from another
// endpoint! There are many - as you can see in the first link

const fetchPokemonDataReusable = async (pokemonId) => {
  try {
    let pokemonById = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

    const responseFromApi = await fetch(pokemonById);
    const individualPokemon = await responseFromApi.json();

    const pokeApi = individualPokemon;
    console.log(pokeApi);

    // Save data in respective variables
    const nameValue = pokeApi.name;
    const heightValue = pokeApi.height;
    const weightValue = `${pokeApi.weight} KG's`;
    const typesValue = pokeApi.types.map((type) => type.type.name);
    const strengthValue = pokeApi.id;
    const pokemonImage = pokeApi.sprites.front_default;

    // Example usage: Display the values in the console
    console.log(nameValue);
    console.log(heightValue);
    console.log(weightValue);
    console.log(typesValue);

    // Example usage: Display the values in HTML elements
    name.textContent = nameValue;
    height.textContent = heightValue;
    weight.textContent = weightValue;
    types.textContent = typesValue.join(", ");
    element.textContent = strengthValue;
    image.src = pokemonImage;
  } catch (error) {
    console.log(error);
  }
};

// const userInput = prompt("Enter the Pokemon ID:");
// fetchPokemonDataReusable(userInput);

// Function to be attached as event listener
const handleButtonClick = () => {
  const userInput = prompt("Enter the Pokemon ID:");
  fetchPokemonDataReusable(userInput);
}; */