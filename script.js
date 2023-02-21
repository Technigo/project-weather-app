//DOM-selectors
const today = document.getElementById("weatherToday");
const dailyTextMsg = document.getElementById("dailyText");
const dayFive = document.getElementById("fiveDays");


//api for stockholm
const apiLisbon = "http://api.openweathermap.org/data/2.5/weather?q=Lisbon,Portugal&units=metric&APPID=4f9ca5d3e70c95a041bc513ac8b31ff8"

fetch(apiLisbon)
.then(response => {
    return response.json()
})
.then( dataLis => {
    console.log(dataLis);  //We want to save this data in variable for later us

//can we do this shorter and easier
const sunriseTime = dataLis.sys.sunrise;
const sunsetTime = dataLis.sys.sunset;

const sunriseDate = new Date(sunriseTime * 1000);
const hours = sunriseDate.getHours() + ":" + sunriseDate.getMinutes();
const sunsetDate = new Date(sunsetTime * 1000);
const hoursSunset = sunsetDate.getHours() + ":" + sunsetDate.getMinutes()
const sunriseTimeString =sunriseDate.toLocaleTimeString();

const sunsetTimeString =sunsetDate.toLocaleTimeString();
console.log("Sunrise: " + sunriseTimeString)
console.log("Sunset: " + sunsetTimeString)

//weather today starts here

    today.innerHTML = `
    <p>${dataLis.weather[0].description} | ${Math.round(dataLis.main.temp)}°C</p>
   

    <div>
        <p class="sunrises" id="sunrise"> 
         Sunrise ${hours} </p>
        </div>
 
        
        <div>
        <p class="sunsets" id="sunset"> 
        Sunset ${hoursSunset} 
        </p>`


});

//Fetching city name and changing weather (image/text)
fetch(apiLisbon)
.then(response => {
    return response.json()
})
.then( dataLis => {
    console.log(dataLis.weather[0].main);

    if (dataLis.weather[0].main === 'clouds'){

dailyTextMsg.innerHTML=   `<div id="cloud" class="cloudy">
<img src="/Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="">
    <p>oh oooo Its cloudy in ${dataLis.name} right now</p>
</div>`
}


});


/*//Array holding all weather messages
const weatherMessages = [
    `<div id="cloud" class="cloudy">
<img src="/Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="">
    <p>oh oooo Its cloudy in ${dataLis.name} right now</p>
</div>`,

`
<div id="sunGlasses" class="sunglasses">
  <img src="/Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="">
    
  <p>it's sunny on ${dataLis.name} right now</p>
</div>
`,
`
<div id="umbrella" class="umbrellas">
  <img src="/Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="">
  <p>Raindropps on ${dataLis.name} right now</p>
</div>
`,

]



console.log( weatherMessages[0])*/ 







