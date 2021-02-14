const cityName = document.getElementById("cityName")
const tempCelsius = document.getElementById("tempCelsius")
const sunSet = document.getElementById("sunSet")
const sunRise = document.getElementById("sunRise")
const highlight = document.getElementById("highlight")

const SthlmTemp = () => {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=b75d2c8e0b553d63367f547b94b6b40c&units=metric").then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json)

        //Calculation to convert unix stamp to normal timezone
        let unixRise = json.sys["sunrise"];
        //let dateRise = new Date(unixRise*1000);
        let dateRise = new Date(unixRise*1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        let unixSet = json.sys["sunset"];
        //let dateSet = new Date(unixSet*1000);
        let dateSet = new Date(unixSet*1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

        highlight.innerHTML = `Today the weather condition is: ${json.weather[0]["main"]}`
        cityName.innerHTML = `${json.name}`
        tempCelsius.innerHTML = `${json.main["temp"]}℃`
        sunRise.innerHTML = `The Sun rises at ${dateRise} AM`
        sunSet.innerHTML = `The Sunset is at ${dateSet} PM`
        //console.log(date)
    })
}

SthlmTemp()