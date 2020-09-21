
const apiWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3d0d86970b5aff224fe8f40e9b4e2e78'
const container = document.getElementById('main');
const weather = document.getElementById('weatherInfo');

fetch(apiWeatherUrl)

.then((response) => {
  return response.json();
})
.then((weatherArray) => {
  
    weatherInfo.innerHTML = weatherArray.name;
    // console.log()

//   // Add HTML content for each launch
//   weatherArray.forEach((launch) => {
//     container.innerHTML += generateHTMLForLaunch(launch);
//   });
});

// const generateHTMLForLaunch = (launch) => {
//     // Create time strings for launch
//     const launchDate = new Date(launch.launch_date_utc);
//     const launchTimeString = launchDate.toLocaleTimeString('en-US', {
//       timestyle: 'short',
//       hour12: false,
//     });
//     const launchDateString = launchDate.toLocaleDateString('en-US', {
//       weekday: 'short',
//     });