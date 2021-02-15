
const weatherSection = document.getElementById('weatherSection');



fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=6afa2e7606c18a4e48270ffd081e86a3')
  .then((response) => {
    return response.json()
  })
  .then((json)=> {
    console.log(json)
    weatherSection.innerHTML = `
    <h2>${json.name}</h2>
    <h3>${json.main.temp}</h2>  
    <p>The humidity is ${json.main.humidity}</p>
    <p>Today: ${json.weather[2]}
    `

    //let temp = `${json.main.temp}` //Försöker få temp med bara en decimal. 
    // temp= temp.toFixed(1)
    // console.log(temp)
  })
  
  
