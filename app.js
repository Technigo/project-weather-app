const apiKey = '8ba8157c8f9c786166631ade41fce81c';
const container = document.getElementById('container');
const btnSearchCity= document.getElementById('btn-searchCity');

const today = new Date()
const date = (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes();
const CurrentDateTime = date + ' ' + time;
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
    <h2>${time}</h2>
      <h1>${data.city.name}</h1>
       <h1>${Math.round(data.list[0].main.temp_kf.toFixed(1) * 9 / 5 + 32)} ${'&#8451;'}</h1>
      <h3>${data.list[0].weather[0].main}</h3>
      <p> Sunrise: ${data.city.sunrise}</p>
      <p> Sunset: ${data.city.sunset}</p>
     
      `
  console.log(data)

    const degree = Math.round(data.list[0].main.temp_kf.toFixed(1));
    // const result= (degree-32) * (5/9) ;
    // const result = (degree-32)/1.8;
    const result= degree * 9/5 +32;
    console.log(result)

    // Temp as a string with 1 decimal pointed;
//  const temp = data.main.temp.toFixed(1);
  // console.log(Math.round(data.main.temp * 10) / 10);
  })

  const gethours = function(){

  }

})





