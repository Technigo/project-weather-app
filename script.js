const container = document.getElementById('card')

fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=14156af54d10ce159e1b521416adb87f")
    .then((response)=> {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        container.innerHTML = `
        <h1> Check the weather in ${json.name} </h1>
        <h2> The visibility is ${json.visibility} </h2>
        <h3> The temperature is ${json.main.temp}</h3>
        `
    })