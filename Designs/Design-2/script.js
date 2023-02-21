const container = document.getElementById('city')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=06edb4af2e0738583f1bc67674449140')
    .then ((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        container.innerHTML = `<h1>The weather in ${json.name} is ${json.weather.description} today.</h1>`

        /*json.weather.array.forEach((city) => {
            container.innerHTML += `<p>${city.name} is in ${city.country}</p>`
        });*/
    })