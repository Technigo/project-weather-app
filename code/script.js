
let city = "Stockholm" //Default city

const fetchingWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d75b73cbadec04610cd0103495fdb88c`
    )
        .then((response) => {
            return response.json()
        })
}
