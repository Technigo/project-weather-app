const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=c51f401bafb99cdf6e4b149c98e89cc3";
const cityName = document.getElementById("name");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const sunTime = document.getElementById("suntimes");

fetch(API_URL)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    console.log("city:", json.name);
    cityName.innerHTML = `
    <p>${json.name}</p>`;

    console.log("temp:", json.main.temp);
    const tempDecimal = json.main.temp.toFixed(0); //Kriss&Sofia took the decimal away!
    console.log(tempDecimal);
    temp.innerHTML = `
    <p>${tempDecimal}°c</p>`;

    console.log("description:", json.weather[0].description);
    description.innerHTML = `
    <p>${json.weather[0].description}</p>`;
    console.log("suntimes:", json.sys.sunset);

    const rise = new Date(json.sys.sunrise * 1000); // new Date() shows todays date. The json.sys.sunrise gets the time for the sunrise in ms x 1000 to get a whole second
    const up = rise.toLocaleTimeString([], {
      // returns the date object as a string, using local (timezone) conventions
      hour: "2-digit", // show the time as 00:00 hour/minute
      minute: "2-digit",
    });
    sunTime.innerHTML = `<p>Sunrise: ${up}</p>`;

    console.log("SUNRISE:", rise);
    const set = new Date(json.sys.sunset * 1000);
    const down = set.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log("SUNSET:", set);
    sunTime.innerHTML += `<p>Sunset: ${down}</p>`;
  });
