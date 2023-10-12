const url = "https://api.openweathermap.org/data/2.5/weather?q=Uppsala,Sweden&units=metric&APPID=f40f4543214ad55ead8d6ca12cb39ee0"
const thursday = document.getElementById("thursday")
const fetchWeather =  async () => {
    try{
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      thursday.innerHTML = data.main.temp
    
    }catch(error) {
  console.error(error)
    }
};
fetchWeather()