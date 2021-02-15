// All the DOMs are here
const cityName = document.getElementById("cityName")
const tempCelsius = document.getElementById("tempCelsius")
const sunSet = document.getElementById("sunSet")
const sunRise = document.getElementById("sunRise")
const highlight = document.getElementById("highlight")
const dayOne = document.getElementById("day1")
const dayTwo = document.getElementById("day2")
const dayThree = document.getElementById("day3")
const dayFour = document.getElementById("day4")
const dayFive = document.getElementById("day5")


// TO do = Find how you can get access to the upcoming 5 days weather forecast. 
// Global Variable
const OurAPI = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm&cnt=10&appid=b75d2c8e0b553d63367f547b94b6b40c&units=metric"

//http://api.openweathermap.org/data/2.5/forecast/daily?lat=35&lon=139&cnt=10&appid=886705b4c1182eb1c69f28eb8c520e20
//http://api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=10&appid=886705b4c1182eb1c69f28eb8c520e20
//http://api.openweathermap.org/data/2.5/forecast/daily?q=Stockholm&cnt=10&appid=886705b4c1182eb1c69f28eb8c520e20

const SthlmTemp = () => {
    fetch(OurAPI).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json)

        let cloudSun = "./pics/Group34.png"
        let Rise = "./pics/sunrise.png"

        //Calculation to convert unix stamp to normal timezone
        let unixRise = json.sys["sunrise"];
        //let dateRise = new Date(unixRise*1000);
        let dateRise = new Date(unixRise*1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        let unixSet = json.sys["sunset"];
        //let dateSet = new Date(unixSet*1000);
        let dateSet = new Date(unixSet*1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

        highlight.innerHTML = `Today the weather condition is: ${json.weather[0]["main"]}`
        cityName.innerHTML = `${json.name}`
        tempCelsius.innerHTML = `${json.main["temp"]}℃ <img src=${cloudSun}> </img>`
        sunRise.innerHTML = `The Sun rises at ${dateRise} AM `
        sunSet.innerHTML = `The Sunset is at ${dateSet} PM`
        //console.log(date)


        // The upcoming 5 days temp

    })
}

SthlmTemp()



