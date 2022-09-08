const apiKey = '8ba8157c8f9c786166631ade41fce81c';
const container = document.getElementById('container');

const forecast = document.getElementById('forecast');

const btnSearchCity = document.getElementById('btn-searchCity');
const allInfo= document.querySelector('allInfo');
const cityName= document.getElementById('city')
const degree= document.getElementById('degree')
const weather= document.getElementById('weather')
const sunrise= document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
// const hour = document.getElementById('hour')

const today = new Date()
const date = (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes();
const CurrentDateTime = date + ' ' + time;


btnSearchCity.addEventListener('click', () => {
  const city = document.getElementById('search').value;
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
 

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      hour.innerHTML=time;
      hour.innerHTML = data.list[0].dt_txt;

      cityName.innerHTML= data.city.name;
      degree.innerHTML = (Math.round(data.list[0].main.temp_kf.toFixed(1) * 9 / 5) + 32);
      weather.innerHTML = data.list[0].weather[0].main;

      sunrise.innerHTML = new Date(data.city.sunrise * 1000).toLocaleString().split(", ").slice(1).join(", ");

      sunset.innerHTML = new Date(data.city.sunset * 1000).toLocaleString().split(", ").slice(1).join(", ");


      // btnSearchCity.value = "  "; 
      
      
      console.log(data)

   
    })

    const animator=()=>{
      fetch('https://maxst.icons8.com/vue-static/landings/animated-ic')
    }
})

//*******  5 days weather forecast *********
fetch(
  'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7d5ebdb08a9c797cf1689d3a1ad108be'
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);


    const filteredForecast = json.list.filter((item) => item.dt);
    console.log('filtered forecast', filteredForecast);

    const filteredTemp = json.list.filter((item) =>
      item.dt_txt.includes('12:00')
    );
    console.log('filtered temp', filteredTemp);

    const weekdayName = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    filteredTemp.forEach((item) => {
      const date = new Date(item.dt * 1000);
      let dayName = weekdayName[date.getDay()];
      let icon = getIcon(item.weather[0].main);

      console.log(icon);

      forecast.innerHTML += `
        <div class="weekdays"> 
          <div class="weekday-name">
            <p>${dayName}<p>
            <div class="temp-weather">
            <img class="weather-icon" src="${icon}"/>
            <p>${Math.floor(item.main.temp)} °C</p>
            
           
            </div>
          </div>
        </div>
      `;
    });
  });


const getIcon = (condition) => {
  switch (condition) {
    case 'Clouds':
      return 'img/cloud3.png';
    case 'Rain':
      return 'img/rain.png';
    case 'Clear':
      return 'img/clear.png';

    default:
      console.log(`condition not found ${condition}.`);
  }
};
