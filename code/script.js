const apiNow =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ba408ec4b2f7f251f2dd0044bd3e07f2";
const currentCity = document.getElementById("city");
const liveTemperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("description");
const currentSunrise = document.getElementById("todaysWeatherSunrise")
const currentSunset = document.getElementById("todaysWeatherSunset")



fetch(apiNow)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    currentCity.innerHTML = json.name;
    liveTemperature.innerHTML = json.main.temp.toFixed(1);
    weatherDescription.innerHTML = json.weather[0].description;


    
// Sunrise and sunset // 
    const timestampSunrise = json.sys.sunrise
    const timestampSunset = json.sys.sunset

    let sunrise = new Date (timestampSunrise * 1000);
    let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    currentSunrise.innerHTML = `${sunriseTime}`  // prints in HTML

    let sunset = new Date (timestampSunset * 1000);
    let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })
    currentSunset.innerHTML = `${sunsetTime}`   // prints in HTML 

    console.log(json)


  })
  .catch((error) =>
    console.error("There has been a problem with your fetch operation:", error)
  );



/*
    .then((json) => {
        console.log(json )
        weather.innerHTML = json.weather.maps((weatherType) => {
            return weatherType.weather.main;
        }) */

      //  WEATHER  {json.weather[0].description}`
      //  TEMP   ${json.main.temp.toFixed(1)}


//      types.innerHTML = json.types.map((type) => {
//        return typeObject.type.name;
//      });
    

    /*    Your task is to present some data on your web app. Start with
    - the city name   ${json.name} ?? 
    - the temperature (rounded to 1 decimal place) 
    - and what type of weather it is (the "description" in the JSON */



    // weather: weather  > description
        /*0 Object
        description: "clear sky"
        icon: "01d"
        id: 800
        main: "Clear" */

    // temperature: main temp
