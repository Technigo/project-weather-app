const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e205e8ad7da5418f24fd968d3b9c30f1';
const forecastApi = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=e205e8ad7da5418f24fd968d3b9c30f1'
const container = document.getElementById('container')
const forecast = document.getElementById('forecast')


const sunTime = (time) => {
    let sunHours = new Date(time * 1000)

    return sunHours.toLocaleTimeString("sv-SE", {
        hour: "2-digit", 
        minute: "2-digit",
        hour12: false
    })
}


fetch(apiUrl)
    .then((response) => {
        console.log(response) 
        return response.json() 
    }) 
    .then((data) => {
        let fixedTemperature = data.main.temp.toFixed(1)
        let sunrise = data.sys.sunrise
    
        container.innerHTML += `
        <h2 class="city-name">${data.name}</h2>
        <h4>${data.weather[0].description}</h4>
        <h1 class="temperature">${fixedTemperature}</h1>
        <h4>Sunrise: ${sunTime(data.sys.sunrise)} Sunset: ${sunTime(data.sys.sunset)}</h4>
        `
        console.log(data)
    })



fetch(forecastApi)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        
        const filteringByTime = data.list.filter(item => item.dt_txt.includes('12:00'))
            console.log(filteringByTime)
            filteringByTime.forEach((item)=> {
                let fixedTempForecast = item.main.temp.toFixed(1)
                
                forecast.innerHTML += `<p>Veckodag ${fixedTempForecast}</p>` 
                
            })
    })