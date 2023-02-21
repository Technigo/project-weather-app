const container = document.getElementById('card')

fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=14156af54d10ce159e1b521416adb87f")
    .then((response)=> {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        container.innerHTML = `
        <h1>${json.name} </h1>
        <h2> Math.round(${json.main.temp})°C</h2>
        <h3> visibility:${json.visibility}meters</h3>
        <h4> ${json.weather[0].description}</h4>
        `
    })