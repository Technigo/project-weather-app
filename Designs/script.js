

fetch('https://api.openweathermap.org/data/2.5/weather?q=York,uk&units=metric&appid=d38c8d249211767107a91f311ddf4268')
    .then((response) => {
        return response.json()
    })
    .then((test) => {
        console.log(test)
        document.getElementById('city').innerHTML = `City: ${test.name}`
        document.getElementById('temperature').innerHTML = `Current temperature: ${Math.round(test.main.temp)}`
        document.getElementById('description').innerHTML = `Description: ${test.weather[0].description}`

    });




