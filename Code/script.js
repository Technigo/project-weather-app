// All the DOMs are here
const cityName = document.getElementById("cityName")
const tempCelsius = document.getElementById("tempCelsius")
const sunSet = document.getElementById("sunSet")
const sunRise = document.getElementById("sunRise")
const highlight = document.getElementById("highlight")
const container = document.getElementById("container")
const dayOne = document.getElementById("dayOne")
const dayTwo = document.getElementById("dayTwo")
const dayThree = document.getElementById("dayThree")
const dayFour = document.getElementById("dayFour")
const dayFive = document.getElementById("dayFive")


// TO do = Find how you can get access to the upcoming 5 days weather forecast. 
// Global Variable
const OurAPI = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Stockholm&cnt=10&appid=886705b4c1182eb1c69f28eb8c520e20&units=metric"
//http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&appid=3c8d0ca53cf60cf5802dc4c0325edd88

// Global Variable
let Weather


const SthlmTemp = () => {
    fetch(OurAPI).then((response) => {
        return response.json();
    }).then((json) => {
        
        Weather = [
            json.list[0]["temp"]["day"],
            json.list[1]["temp"]["day"],
            json.list[2]["temp"]["day"],
            json.list[3]["temp"]["day"],
            json.list[4]["temp"]["day"],
            json.list[5]["temp"]["day"]
        ]
        /*let datte = json.list[0].sunrise;
        let dateRise = new Date(unixRise*1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        console.log(dateRise)*/
        // console.log(json.list[1].dt) commented out

        let cloudSun = "./pics/Group34.png"
        let Rise = "./pics/sunrise.png"

        //Calculation to convert unix stamp to normal timezone
        let unixRise = json.list[0].sunrise;
        //let dateRise = new Date(unixRise*1000);
        //console.log(unixRise) Commented out
        let dateRise = new Date(unixRise*1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        
        const dateArray = [json.list[0].dt, json.list[1].dt, json.list[2].dt, json.list[3].dt, json.list[4].dt, json.list[5].dt];

        
        //
        let newDateArray = dateArray.map( (date) =>{
            const launchDate = new Date((date)*1000);
            //const dateTimeString = launchDate.toLocaleTimeString('en-US', {
                //timestyle:'short',
                //hour12:false,
            //});
            const dateDateString = launchDate.toLocaleDateString('en-US', {
                weekday:'short',
            })
            return dateDateString
        })
         //console.log(newDateArray)
    


        let unixSet = json.list[0].sunset;
        //let dateSet = new Date(unixSet*1000);
        let dateSet = new Date(unixSet*1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

        highlight.innerHTML = `Today the ${json.list[0]["weather"][0]["description"]}`
        cityName.innerHTML = `<h3>${json.city["name"]}</h3>`
        tempCelsius.innerHTML = ` Current: <img src=${cloudSun}> </img> ${json.list[0]["temp"]["day"]}℃ / Min: ${json.list[0]["temp"]["min"]}℃  /Max: ${json.list[0]["temp"]["max"]}℃` // The weather icon will be changed depending on time and is affected by an function that will trigger and if else statement(its its cloudy === this picture etc.)
        sunRise.innerHTML = `The Sun rises at ${dateRise} AM `
        sunSet.innerHTML = `The Sunset is at ${dateSet} PM` 
        // The upcoming 5 days temp (PS! We need a function that prints the day automatically )
        
        /*let dates = newDateArray.forEach((date) => {
            dayOne.innerHTML += `<dt class ="date">${date}</dt>`
            //dates = document.getElementsByClassName("date")
        });

        let weath = Weather.forEach((weather) =>{
            dayOne.innerHTML += `${weather}`
        });
        
        dayOne.innerHTML = `${dates}: ${weath}`*/


    /*const dateAndWeather = {
        date: newDateArray,
        weather: Weather,
    }       
    const testArray = [dateAndWeather];
    console.log(testArray)

    testArray.forEach((test) => {
        dayOne.innerHTML += `${test.date[0]}:${test.weather[0]}`
    })*/
    for (let i = 1; i < newDateArray.length && i < Weather.length; i++) {
        dayOne.innerHTML += `<dt>${newDateArray[i]}: ${Weather[i]} </dt>`
    }




        /*dayOne.innerHTML = `${newDateArray[1]}: ${Weather[1]} ℃`;
        dayTwo.innerHTML = `${newDateArray[2]}: ${json.list[2]["temp"]["day"]} ℃`;
        dayThree.innerHTML = `${newDateArray[3]}: ${json.list[3]["temp"]["day"]} ℃`;
        dayFour.innerHTML = `${newDateArray[4]}: ${json.list[4]["temp"]["day"]} ℃`;
        dayFive.innerHTML = `${newDateArray[5]}: ${json.list[5]["temp"]["day"]} ℃`;*/

    })
}

SthlmTemp()



