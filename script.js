const container = document.getElementById("forcast");

fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=tokyo&units=metric&appid=e6dd4de800de3576c7c23ef944a736c4"
  )
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    container.innerHTML = `<h1>I spot some ${json.weather[0].description}<h1>`
    container.innerHTML += `<h1>in ${json.name}<h1>`
    container.innerHTML += `<h1>and it feels like it's ${round(json.main.feels_like)} degrees<h1>`

    // json.forEach((element) => {
    //   container.innerHTML += `<p>Temp: ${element.temp}</p>`
    // });
  });

const round = (number) => {
  const rounded = Math.round(number * 10) / 10
  return rounded
}