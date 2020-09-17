/* API Key to Open Weather: 3f1c95b540a45d2a48ff596267d9d939 */

const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3f1c95b540a45d2a48ff596267d9d939')
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    console.log(json);

    cityName.innerText = json.name;
    temperature.innerText = Math.floor(json.main.temp);
    description.innerText = json.weather[0].description;

    const sunriseValue = json.sys.sunrise; //Sunrise and Sunset times in UNIX
    const sunsetValue = json.sys.sunset;

    /* Multiply by 1000 because the data is given to us in UNIX which is in seconds, but Javascript uses milliseconds internally, this way we get the right date. */
    const sun = new Date(sunriseValue * 1000);
    const set = new Date(sunsetValue * 1000);

    /* From the Date format we got above from sun and set, extract only the hours and minutes - using slice method on the minutes part so that it shows the 0 when minutes are less than 10, otherwise it will show 19:2 instead of 19:02. Got this from StackO: https://stackoverflow.com/questions/8935414/getminutes-0-9-how-to-display-two-digit-numbers */
    sunrise.innerText = `${sun.getHours()}:${('0'+ sun.getMinutes()).slice(-2)}`;
    sunset.innerText = `${set.getHours()}:${('0'+ set.getMinutes()).slice(-2)}`;
  })

  .catch((error) => {
    console.log(error);
  });