const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=6afa2e7606c18a4e48270ffd081e86a3';
const weatherForcastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=c292983c49498a3cff73c1806ef955ba';
const weatherSection = document.getElementById('weatherSection');
const forcast = document.getElementById('forcast');


//let unix

fetch(weatherUrl)
  .then((response) => {
    return response.json()
  })
  .then((json)=> {
    // console.log(json)
    let sunriseAPI = `${json.sys.sunrise}`
    let sunsetAPI = `${json.sys.sunset}`
    let sunrise = new Date(sunriseAPI*1000).toLocaleTimeString([], {timeStyle: 'short'});
    let sunset = new Date(sunsetAPI*1000).toLocaleTimeString([], {timeStyle: 'short'});

    weatherSection.innerHTML = `
    <h2>${json.name}</h2>
    <h3>${json.main.temp} °C</h2>  
    <p>The humidity is ${json.main.humidity} %</p>
    <p>Today: ${json.weather[0].description} </p>
    <p>The sunrise is: ${sunrise}</p>
    <p>The sunset is: ${sunset}</p>
    `

    //let temp = `${json.main.temp}` //Försöker få temp med bara en decimal. 
    // temp= temp.toFixed(1)
    // console.log(temp)
  })
  
fetch(weatherForcastUrl)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00')) //Vill få ut temp och typ av väder från alla 5 dagar. Göra en forEach.. hur? 
    console.log(filteredForecast);
    
    // Math.round
    // forcast.innerHTML = `
    // <p>Temp at 12 tomorrow: ${filteredForecast[0].main.temp} °C</p>
    // <p>Temp at 12 day after tomorrow: ${filteredForecast[1].main.temp} °C</p>   
    // `

    filteredForecast.forEach((filteredForecast) => {
      forcast.innerHTML += `<p> ${filteredForecast.main.temp} </p>`
    })
  })

//Vill ha en decimal på temp på forcast
  
