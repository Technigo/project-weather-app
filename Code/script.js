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
let cloudSun = "./pics/Group34.png"
let Rise = "./pics/sunrise.png"
let Sunset = "./pics/1.webp"



const SthlmTemp = () => {
    fetch(OurAPI).then((response) => {
        return response.json();
    }).then((json) => {
        
        // Local Variables 
        const weatherToday = json.list[0]["weather"][0]["description"]
        const city = json.city["name"]
        const currentWeatherIcon = json.list[0]["weather"][0]["icon"]
        const tempToday = Math.round(json.list[0]["temp"]["day"])
        const minTempToday = Math.round(json.list[0]["temp"]["min"])
        const maxTempToday = Math.round(json.list[0]["temp"]["max"])
      
      
        //Sunset time
        const unixSet = json.list[0].sunset;
        //Calculation to convert unix stamp to normal timezone
        const dateSet = new Date(unixSet*1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  
        //Sunrise time
        const unixRise = json.list[0].sunrise;
        //Calculation to convert unix stamp to normal timezone
        const dateRise = new Date(unixRise*1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        
        //Temperature for 10 days
        const temperatureArrayDays =  Array.from(
            json.list, item => item.temp.day
        );
        //Rounding the temperature to integer
        const temperatureArrayDaysRounded = temperatureArrayDays.map((element) => {
          const roundedTemp = Math.round(Number(element));
          return roundedTemp
        });
        //Temperature 5 days
        const temperatureFiveDays = temperatureArrayDaysRounded.filter((day, index) => {
          return index > 0 && index < 6
        });
        console.log(temperatureFiveDays);
        //Temperature current day
        const tempertureCurrentDay = temperatureArrayDaysRounded[0];
        
        //Day of the week
        const dateArray = Array.from(
          json.list, item => item.dt
      );
        const newDateArray = dateArray.map( (date) =>{
            const launchDate = new Date((date)*1000);
            const dateDateString = launchDate.toLocaleDateString('en-US', {
                weekday:'short',
            });
            return dateDateString
        });
        //Five days
        const dateFiveDays = newDateArray.filter ((date, index) => {
          return index > 0 && index < 6
        });
        //Date Current Day
        const dateCurrentDay = newDateArray[0];
        console.log(dateCurrentDay)

        //Weather ID
        const weatherIdArray = Array.from(
            json.list, item => item.weather[0].icon // This one starting from 0 and prints out all of our Icons
        );
        //Current Weather ID
        const currentWeatherId = weatherIdArray[0];
        //Weather Five dayes
        const fiveDaysId = weatherIdArray.filter((day, index) => {
            return index >0 && index <6
            }
        )
        const array = [1, 4, ]

      console.log(fiveDaysId[0])

      // Adding API information into HTML elements 
        highlight.innerHTML = `Today the ${weatherToday}`
        cityName.innerHTML = `<h3>${city}</h3>`
        tempCelsius.innerHTML = ` Current: <img src='http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png'> ${tempToday}℃ / Min: ${minTempToday}℃  /Max: ${maxTempToday}℃` // The weather icon will be changed depending on time and is affected by an function that will trigger and if else statement(its its cloudy === this picture etc.)
        sunRise.innerHTML = `The Sun rises at ${dateRise} AM <img src=${Rise} width="40"> ` 
        sunSet.innerHTML = `The Sunset is at ${dateSet} PM <img src=${Sunset} width="40">` //${cloudSun}


    // for (let i = 0; i < dateFiveDays.length && i < temperatureFiveDays.length; i++) {
    //     dayOne.innerHTML += `<dt>${dateFiveDays[i]}: ${temperatureFiveDays[i]} <img src="http://openweathermap.org/img/wn/11d@2x.png" width="40px" > </dt>`
    // }
    dateFiveDays.forEach((date, index)=>{
      const temperature = temperatureFiveDays[index];
      const icon = fiveDaysId[index];
      dayOne.innerHTML += `<dt>${date}: ${temperature} <img src="http://openweathermap.org/img/wn/${icon}@2x.png" width="40px" > </dt>`

    })

    



        /*dayOne.innerHTML = `${newDateArray[1]}: ${Weather[1]} ℃`;
        dayTwo.innerHTML = `${newDateArray[2]}: ${json.list[2]["temp"]["day"]} ℃ : <img src='http://openweathermap.org/img/wn/${json.list[0]["weather"][0]["icon"]}@2x.png' >`;
        dayThree.innerHTML = `${newDateArray[3]}: ${json.list[3]["temp"]["day"]} ℃`;
        dayFour.innerHTML = `${newDateArray[4]}: ${json.list[4]["temp"]["day"]} ℃`;
        dayFive.innerHTML = `${newDateArray[5]}: ${json.list[5]["temp"]["day"]} ℃`;*/


        /*const displayIcons = () => {
          if (WEATHER_ICONS.attribute === )
        }
*/


    })
}

SthlmTemp()



