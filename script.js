const city = document.getElementById('city')



const fetchWeatherData = () => {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=800ddea444fa8b1532e3492f09d4432d')
        .then((reponse) => {
            return response.json()
        })
        .then((json) => {
            console.log(json)
        })
}









// const fetchPokemons = () => {
//   /*Fetch all pokemons here*/
//   fetch("https://pokeapi.co/api/v2/pokemon/?limit=10")
//     .then((response) => {
//       return response.json();
//     })
//     .then((json) => {
//       console.log(json.results);
//       console.log(json.results[0].name);
//       json.results.forEach((pokemons) => {
//         console.log(pokemons.name);
//       });
//     });
// };