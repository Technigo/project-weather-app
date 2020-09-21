const containerToday = document.getElementById('weatherToday')
const descriptionToday = document.getElementById('text')
const apiUrlToday = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=95b6172379fabb04319de6c9e2aa34ae'

const calculateTemperature = (number) => {
    const roundedTemp = Math.round(number*10)/10 //By adding *10 AND adding /10 the number is rounded up to nearest integer with one decimal. If only using round() the number is rounded up to nearest integer.
    return roundedTemp
}

const fetchWeatherToday = () => {
    fetch(apiUrlToday)
    .then ((response) => {
        return response.json()
    })
    .then ((json) => {
        containerToday.innerHTML = `<h1>This is ${json.name}</h1>`
        const temperature = calculateTemperature(json.main.temp)//This is using json.main.temp as a parameter instead of number.
        descriptionToday.innerHTML = `The temperature today is ${temperature} degrees and it's ${json.weather[0].description} outside.`//Since weather is an array, we need to access the index of 0, and then we can locate the object keyvalues i.e .description. This has to be done even if there is only one array, as in this case.
    })
}



