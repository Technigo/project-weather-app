const apiKey = "f9321b12d77c24027e5a25c9f625e63b";
console.log("hi");
const getWeather = () => {
  console.log("hi");
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=gothenburg&unit=metric&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
    });
};

getWeather();
