// Global DOM Selectors
const body = document.querySelector('body')
const topSection = document.getElementById('topSection')
const middleSection = document.getElementById('middleSection')
// const weatherQuip = document.createElement('h1');
const bottomSection = document.getElementById('bottomSection')


fetch('https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=1d70a07080ab5151e3f54886ea0d8389')
  .then((res) => res.json())
  .then((data) => {
    console.log('data', data);
    console.log(data.weather[0].main);
    const weatherDescription = data.weather[0].description
    if (data.weather[0].main.includes("Clear")) {
      body.classList.add("sunny")
      body.classList.remove("cloudy")
      body.classList.remove("rainy")
    } else if (data.weather[0].main.includes("Clouds")) {
      body.classList.remove("sunny")
      body.classList.add("cloudy")
      body.classList.remove("rainy")
    } else {
      body.classList.remove("sunny")
      body.classList.remove("cloudy")
      body.classList.add("rainy")
    }
    const todayTemp = Math.round(data.main.temp)
    middleSection.innerHTML = `
    <h1>${data.name}</h1>
    <p>${todayTemp}°</p>
    <p>${weatherDescription}</p>
    `
  });

// weather[0].main: Clear = Sunny, Clouds = Cloud, Rain = Rain
// Documentation from openweathermap https://openweathermap.org/weather-conditions