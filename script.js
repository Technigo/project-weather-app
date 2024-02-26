const container = document.getElementById("overcast");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=07b1e3ac4ed3c5e09fa788587b7c0a21"
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);

    container.innerHTML = `<h1> City: ${response.name}</h1>`;
    container.innerHTML += `<h2> ${response.main.temp.toFixed(
      1
    )} °Celcius </h2>`;

    response.weather.forEach((clima) => {
      container.innerHTML += `<p> JSON Description: ${clima.description} </p>`;
    });
  });
