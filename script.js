//Step 1 - use fetch() to load the weather data
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=db63b41efc78e9f2c60ec93f035d8cff"
)
  //Step 2 - Present some data on your web app
  .then((response) => response.json())
  .then((data) => {
    //Access the elements where I want to display
    const cityNameElement = document.getElementById("city-name");
    const temperatureElement = document.getElementById("temperature");
    const descriptionElement = document.getElementById("description");
    //Update the content of above elements with the data from API
    cityNameElement.textContent = `City Name: ${data.name}`;
    temperatureElement.textContent = `Temperature: ${data.main.temp.toFixed(
      1
    )}°C`; //1は、小数点以下の桁数。もし18.37度だったら、18.3と表示
    descriptionElement.textContent = `Weather: ${data.weather[0].description}`;
  })
  .catch((error) => console.error("There was an error!", error));
