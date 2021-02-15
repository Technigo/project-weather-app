//console.log('hej hej')
const SwedenAPI = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1f53b6ca8e6cbcf1c51848ca6c257778'
const cityName = document.getElementById('cityName')

console.log('API fetch starting')

fetch(SwedenAPI)
  .then((response) => {
    console.log(`Response ok? ${response.ok}`)
    console.log(`Response status: ${response.status}`)
    console.log('API Response Received');

    return response.json()
  })
    .then((json) => {
      console.log(json);
      console.log(json.weather[0].description)
  
      cityName.innerHTML += `Stockholm`
    }) //it's all in one line now. 


  //console.log(Object.keys(weather));