const container = document.getElementById('container');
const today = document.getElementById('details-today')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7d5ebdb08a9c797cf1689d3a1ad108be')
  .then(Response => {
    return Response.json();
  }).then(data => {
    container.innerHTML = `<h1>${data.name}</h1>
    <h3>${data.main.temp.toFixed(1)}</h3>
    <h4> ${data.weather[0].description} </h4>
    
    `
    console.log(data);

    // Temp as a string with 1 decimal pointed;
    const temp = data.main.temp.toFixed(1);
    // console.log(Math.round(data.main.temp * 10) / 10);
  


  });




