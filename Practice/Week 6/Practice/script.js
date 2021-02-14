// To continue on with the pokemon theme, we've found a
// pokemon API for you to practice on --> https://pokeapi.co/.
// If you go to this page --> https://pokeapi.co/api/v2/,
// you can see all of the endpoints available.
// We will start with the endpoint named pokemon.

// The goal is to change the content of our mystery table in
// HTML to contain info about one specific pokemon. To get you
// started, we've created some variables for you to use later on:

let image = document.getElementById("image");
let name = document.getElementById("name");
let element = document.getElementById("element");
let weight = document.getElementById("weight");
let height = document.getElementById("height");
let types = document.getElementById("types");

// 1) Start with updating the fetchPokemons function so that
//    it's fetching the pokemons from the pokemon endpoint and
//    log the results in the console.
//    HINT --> Don't forget to invoke the function



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
//    working with. Copy the URL.


  // 4) Now that we've picked a pokemon, we will do a new fetch
//    to the URL we copied. Since that's another endpoint,
//    we will create a new fetch inside the fetchBulbasaurData
//    function (change the function name to fit your pokemon).
//    Log the data in the console and see what you find.
const fetchPokemons = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=10").then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json.results)

        /*json.results.forEach((names) => {
            console.log(names)
        })*/
    })
  };

  fetchPokemons()

const fetchCharizardData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/6/").then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json)
        
        /*json.results.forEach((names) => {
            console.log(names)
        })*/
    })
 
}

fetchCharizardData()


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



  