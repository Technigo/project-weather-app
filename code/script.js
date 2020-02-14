const place = document.getElementById('place')
const temperature = document.getElementById('temperature')
const description = document.getElementById('description')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=224e607ac22e4aef9578da3aaa6f0b85')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    place.innerHTML = `<h2>There are ${json.name} number of people in space right now.</h2>`
    description.innerHTML = `<h2>The weather is ${json.weather[0].description} right now.</h2>`
    temperature.innerHTML = `<h2>It is ${json.main.temp.toFixed(1)} degrees celsius.</h2>`


  })





















// const place = document.getElementById('place')

// fetch('http://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=224e607ac22e4aef9578da3aaa6f0b85')
//   .then((response) => {
//     return response.json()
//   })
//   .then((json) => {
//     place.innerHTML = `<h2>You are in ${json.place} right now.</h2>`
//     temperature.innerHTML = `<h2>It is ${json.temperature} degrees.</h2>`
//     description.innerHTML = `<h2>It is ${json.description} right now.</h2>`

//   })







// http://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=224e607ac22e4aef9578da3aaa6f0b85