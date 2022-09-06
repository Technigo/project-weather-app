const container = document.getElementById('city')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=021625534abeaac2039ba88d0c89b1ce')

.then((response) => {
    return response.json() 
})
.then((json) => {
    // container.innerHTML = `<h1>${json.name}</h1>`
    console.log(json)
    json.weather.map((type) => {
    container.innerHTML += `<p>${type.description} | ${json.main.temp.toFixed(0)}</p>`  
    })
})

