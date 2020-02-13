const container = document.getElementById("Gothenburg")

fetch('http://api.openweathermap.org/data/2.5/weather?id=5695743&appid=3b69213b480a303abeec34f0262802f0')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
  })