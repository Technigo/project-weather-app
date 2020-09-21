const apiLink = ("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1aa12a879150a3460a48993824ba1347");

const fetchedApiInfo = () => {
    fetch(apiLink)
    .then((response) => {
        return response.json()
    })
    .then((weatherInfo) => {
        console.log(weatherInfo)
    })
};

fetchedApiInfo();