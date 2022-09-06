// Api 
const API = 'https://api.openweathermap.org/data/2.5/weather?q=Amsterdam,Netherlands&units=metric&appid=26500228b15aa40fc0617041c68bf843'
const apiForeCast = 'https://api.openweathermap.org/data/2.5/forecast?q=Amsterdam,Netherlands&units=metric&appid=26500228b15aa40fc0617041c68bf843'

// Global DOM selectors

const container = document.getElementById('header')
const phrase = document.getElementById('phrase')
const forCast = document.getElementById('forCast')

// fetch the API for header section 
fetch (API)
.then ((response) => {
    return response.json ()
})
.then ((json) => {
//declare the API fetch for current temp.
const temperature= json.main.temp.toFixed(0)

// new declare the API fetch for current descprition. 
const currentDescription = json.weather[0].description

const sunrise= json
const nameCity = json.name

 console.log (temperature,currentDescription,nameCity) // test for console that the function is working. 

 //print out the API fetch for header
 container.innerHTML=`<h1> ${currentDescription} | ${temperature} ${nameCity} </h1>`

})

// turning the date to a string short weekday. 
const weekDay = (data) => {
    const currentDate = new Date (data * 1000); // set to millisec. 
    return currentDate.toLocaleDateString('en-GB', {
        weekday:'short',
    });
};


//ForeCast table for 5 days - fetch API from new api URL 
fetch(apiForeCast)
.then((response) => response.json())
.then((json) => {

// new variable for filter the table and choose the same time everyday. 
    const filterTable = json.list.filter((item) =>
    item.dt_txt.includes('12:00')
  );
  
  // printed out forcast. filterTable [x] changes depends of which day. 
  forCast.innerHTML += `
  <div class="day">${weekDay(filterTable[0].dt)}</div>
  <div class="temp"> ${filterTable[0].main.temp.toFixed(0)}</div>
  <div class="day">${weekDay(filterTable[1].dt)}</div>
  <div class="temp"> ${filterTable[1].main.temp.toFixed(0)}</div>
  <div class="day">${weekDay(filterTable[2].dt)}</div>
  <div class="temp"> ${filterTable[2].main.temp.toFixed(0)}</div>
  <div class="day">${weekDay(filterTable[3].dt)}</div>
  <div class="temp"> ${filterTable[3].main.temp.toFixed(0)}</div>
  <div class="day">${weekDay(filterTable[4].dt)}</div>
  <div class="temp"> ${filterTable[4].main.temp.toFixed(0)}</div>
 
  `
})




 //THIS IS DANIEL SEARCH BAD
 //mainSearchbar.addEventListener('change', (event) => {
    //fetch(`https://api.openweathermap.org/data/2.5/weather?q={event.target.value}&units=metric&appid=26500228b15aa40fc0617041c68bf843`)
    //.then(response => {
        //if(response.status ==200) {
            //return response.json();
        //} else {
            //throw(new Error('bad response'));
        //})
        //.then(readableResponse =. {
            //xxx.innerHTML = readableResponse.xxx
            //xxx.innerHTML = readableResponse.xxx
        //})
 