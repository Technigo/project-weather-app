fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ead60d2e1c3fff29cccec12bd6a43922')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
    })