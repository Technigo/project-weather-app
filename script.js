const weather = document.getElementById('weather')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=9c5547207014dca2db40f4f51bbb601a')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
    })