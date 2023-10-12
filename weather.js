const urlForOneDay = "https://api.openweathermap.org/data/2.5/weather?q=Knivsta,Sweden&units=metric&APPID=f40f4543214ad55ead8d6ca12cb39ee0"
const urlForMoreDays ="https://api.openweathermap.org/data/2.5/forecast?q=Knivsta,Sweden&units=metric&APPID=f40f4543214ad55ead8d6ca12cb39ee0"
const thursday = document.getElementById("thursday")
const city = document.getElementsByClassName("get-your-sunnies")
const fetchWeather =  async () => {
    try{
      const response = await fetch(urlForMoreDays);
      const data = await response.json();
      console.log(data)
    //   thursday.innerHTML = Math.round(data.main.temp)+"°"
      thursday.innerHTML = Math.round(data.list[4].main.temp)+"°"
      const howIsTheWeather = `Get your sunnies on. ${data.name} is looking rather great today.`
      city[0].innerHTML = howIsTheWeather
    }catch(error) {
  console.error(error)
    }
};
fetchWeather()