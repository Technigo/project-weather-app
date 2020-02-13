const containerToday = document.getElementById("todaysweather")

fetch("https://api.openweathermap.org/data/2.5/weather?q=stockholm,Sweden&units=metric&APPID=8ba6b8f613b670c947149eaad6fdfef7")
  .then((response) => {
    return response.json();
  })
  .then ((json) => {
    console.log(json);
    containerToday.innerHTML = `<h1> The weather in ${json.name} today is ${json.main.temp} celsius and ${json.weather[0].main}</h1>`
  })
  .catch((err) =>{
    console.log("caught error", err)
  })