//https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript //Frida

let unix_timestamp = 1549312452;
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

console.log(formattedTime);

const sunriseUnix = json.sys.sunrise; // object based on the unix timestamp for sunrise
let daterise = new Date(sunriseUnix * 1000); // multiplied by 1000 so that it is in milliseconds, not seconds
let hoursrise = daterise.getHours(); // hours part from the unix timestamp
let minutesrise = "0" + daterise.getMinutes(); //minutes part from the unix timestamp
let formattedTimeSunrise = hoursrise + ":" + minutesrise.substr(-2); //creates the timestamp in hour and minute-form
const sunsetUnix = json.sys.sunset; // same thing but with sunset
let dateset = new Date(sunsetUnix * 1000);
let hoursset = dateset.getHours();
let minutesset = "0" + dateset.getMinutes();
let formattedTimeSunset = hoursset + ":" + minutesset.substr(-2);

//Forecast
const weekday = (data) => {
  const currentDate = new Date(data * 1000); // sets to millisec.
  return currentDate.toLocaleDateString("en-GB", { weekday: "short" });
};
// fetch the data from the API. Then if you console.log the json
// you'll see that we only care about the array called list.

const filteredForecast = json.list.filter((item) =>
  item.dt_txt.includes("12:00")
);
// filteredForecast is now an array with only the data from 12:00 each day.
