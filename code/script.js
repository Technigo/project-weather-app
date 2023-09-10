fetch('https://api.openweathermap.org/data/2.5/weather?q=Varberg,Sweden&units=metric&APPID=6e3a3db02f585218db04cdc935f5290c')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        let weatherData = json;
        console.log(weatherData);
    })
    .catch((error) => {
        console.error('Something went wrong', error);
    })