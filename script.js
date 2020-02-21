/*
1. Visa dagens väder i Linköping i main-div
    omvandla temperaturen
    styla till
2. sunset/sunrise i förståelig text
    omvandla millisek till timma:minut
    animering uppgång/nedgång
3. Veckans väder i forEach
    fixa dagar och tid på dagen
    fixa animering sol, moln,regn   */


//Variables in global scope
const apiUrl1 = 'https://api.openweathermap.org/data/2.5/weather?q=Linkoping,Sweden&units=metric&APPID=b7b3760be0be4014c46afb19d0320b13'
const apiUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?q=Linkoping,Sweden&units=metric&APPID=b7b3760be0be4014c46afb19d0320b13'
const container = document.getElementById('main');
const sunUp = document.getElementById('sunRise');
const sunDown = document.getElementById('sunSet');
const weekDays = document.getElementById('week');

fetch(apiUrl1)
  .then((response) => {
    return response.json()
})
  .then((json) => {
            //Todays weather in main   
            //Here I wanted to use ${json.name} instead of writing the city, but I couldn´t make it work with the ö
    container.innerHTML =  `<h1>Todays weather in <br> Linköping <br> ${Math.round(json.main.temp)} °C </h1>`

             //Convert millisek to readable time for sunup/sundown
    const sunRiseTime = new Date(json.sys.sunrise * 1000)
    sunUp.innerHTML = `Sunrise: ${sunRiseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} `
    
    const sunSetTime = new Date(json.sys.sunset * 1000)
    sunDown.innerHTML += `Sunset: ${sunSetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} `
    });

fetch(apiUrl2)
  .then((response) => {
    return response.json()
})

  .then((json) => {
            //filter to list of only 12.00
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
            //forEachLoop 5 day forecast
    filteredForecast.forEach((day) => {
      let date = new Date(day.dt * 1000)
      let dayName = date.toLocaleDateString("en-US", {weekday: "long"})
      const dayTemp = day.main.temp
      const weekTemp= dayTemp.toFixed(0.1)

      weekDays.innerHTML += `<p>${dayName} | ${weekTemp} °C</p>`
    })
  })
