const apiKey = '8ba8157c8f9c786166631ade41fce81c';
const container = document.getElementById('container');
const btnSearchCity= document.getElementById('btn-searchCity');

const today = new Date()
var date = (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes();
var CurrentDateTime = date + ' ' + time;


const sunrise= document.getElementById('sunrise')
const sunset= document.getElementById('sunset')


btnSearchCity.addEventListener('click', ()=>{
  const city = document.getElementById('search').value;
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`; 
 
 
  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    container.innerHTML = `
    <p>${time}</p>
      <h1>${data.city.name}</h1>
       <h1>${Math.round(data.list[0].main.temp_kf.toFixed(1))} ${'&#8451;'}</h1>
      <h3>${data.list[0].weather[0].main}</h3>
      <p> Sunset: ${data.city.sunrise}</p>
     
      `
      

      // const sunrise = new Date(json.sys.sunrise * 1000);
// const sunset = new Date(json.sys.sunset * 1000);
    // const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    // const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

  console.log(data)
    const degree = Math.round(data.list[0].main.temp_kf.toFixed(1));
    // const result= (degree-32) * (5/9) ;
    // const result = (degree-32)/1.8;
    const result= degree * 9/5 +32;
    console.log(result)


    // const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    // // console.log(data.list[0].weather[0].main)
    // const suRise= (data.city.sunriseTime.sys)
    // console.log(sunriseTime)

    // Temp as a string with 1 decimal pointed;
//  const temp = data.main.temp.toFixed(1);
  // console.log(Math.round(data.main.temp * 10) / 10);
  })

})





