const container = document.getElementById('weather')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,sweden&APPID=00620bb638ed0fa5525452696e39c3ed')
  .then((response) =>{
    return response.json()
  })
  .then((json) => {
    console.log(json)
    container.innerHTML = `<p>Kolla om ${json.main.temp} funkar</p> `
  })

/*Jason.outlook.forEach((json) => {
  container.innerHTML += `Försöker med ${json}`
})*/