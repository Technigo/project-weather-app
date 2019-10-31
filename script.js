


const container = document.getElementById("weatherHeadline")

fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e57c9fd6de5974ecd857b3b40415a881")
  .then((response) => {
    return response.json()
  })


  // .then((json) => {
  //   console.log(json)
  // })

  .then((json) => {
    container.innerHTML = `<h1>The weather in Stockholm right now is ${json.weather[Description]}</h1 > `

  })


