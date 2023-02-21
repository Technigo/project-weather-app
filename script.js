const container = document.getElementById('card')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ddf98774bfc0041a16a7d95948e68934')
    .then((response)=> {
        return response.json()
    })