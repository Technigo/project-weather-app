const container = document.getElementById("forecast");

// Fetch data from Open Weather map
fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=61a23a5c50a7b6f6de8daad2de48ae27"
)
  // If promise is fulfilled convert response to json and return it
  .then(response => {
    return response.json();
  })
  // Console log json
  .then(json => {
    console.log(json);
  });
