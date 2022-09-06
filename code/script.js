fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1ecbebf1161e80b656c352a8c659aec8")
.then((response) => {
    return response.json()
})
.then ((json) => {
    console.log(json)
})
