const container = document.getElementById(`weather`);

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b0bce0ead37d18acc13ad506864e75ac"
)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    console.log(json);
    const roundedTemperature = parseFloat(json.main.temp).toFixed(1);
    //const temperature = Math.round(json.main.temp);
    container.innerHTML += `
    <h1>${roundedTemperature}°C</h1>
    <h2>${json.name}</h2>
    
    
    `;
  });
