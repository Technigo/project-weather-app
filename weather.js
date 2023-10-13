const url ="https://api.openweathermap.org/data/2.5/forecast?q=Knivsta,Sweden&units=metric&APPID=f40f4543214ad55ead8d6ca12cb39ee0"
const mon = [].slice.call(document.querySelectorAll(".mon"),2)
const weekday = ["sun","mon","tue","wed","thu","fri","sat"];


const fetchWeather =  async () => {
    try{
      const response = await fetch(url);
      const data = await response.json();
 
      const fiveDays = data.list.filter(d =>  {
        const date = new Date(d.dt * 1000);
        let time = 11;
        let dtTime = date.getHours();
        return time === dtTime;
        });

    setDayName(fiveDays);    
    
    setTemperature(fiveDays);

    }catch(error) {
        console.error(error);
    }

    function setTemperature(fiveDays) {
        for (let index = 5; index < mon.length; index++) {
            mon[index].innerHTML = Math.round(fiveDays[index - 5].main.temp) + "°";
        }
    }

    function setDayName(fiveDays) {
        for (let index = 0; index < 5; index++) {
            const date = new Date(fiveDays[index].dt * 1000);
            mon[index].innerHTML = weekday[date.getDay()];
        }
    }
};
fetchWeather();


