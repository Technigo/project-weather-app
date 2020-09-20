let container = document.getElementById('weather')
console.log(container)

let getWeather = () => {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1fdca83a9693b3d0d79182ed5ca69207')
        .then(response => response.json())
        .then((result) => {

            let temperature = Math.round(result.main.temp * 10)/10
            let timeAM = new Date(result.sys.sunrise * 1000)
            let timePM = new Date(result.sys.sunset * 1000)
            
            console.log(timeAM)
            container.innerHTML = `${temperature}`
            container.innerHTML += `${result.name}`
            container.innerHTML += `${result.weather[0].description}`
            container.innerHTML += `Sunrise at ${timeAM}`
            container.innerHTML += `Sundown at ${timePM}`
        });
};