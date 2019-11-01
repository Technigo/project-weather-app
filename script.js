const apiKey = "79a5016dc063fba5a823f15d23b3fb1f";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const monthShortNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let city = "";

function locationRetrieved(pos) {
  let crd = pos.coords;
  city = `lat=${crd.latitude}&lon=${crd.longitude}`;
  return city;
}

function locationError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function toggle() {
  this.classList.toggle("active");
}

function rotate() {
  this.classList.toggle("rotate");
}

const clearData = () => {
  document.getElementById("city").innerHTML = "";
  document.getElementById("summary").innerHTML = "";
  document.getElementById("icon").style.display = "none";
  document.getElementById("forecast").innerHTML = "";
  document.getElementById("sunrise-sunset").innerHTML = "";
};

function showPosition(position) {
  console.log("before: " + city);
  city = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
  console.log("after: " + city);
}

const getWindDirection = degrees => {
  if (degrees < 45) {
    return "N";
  } else if (degrees < 90) {
    return "NE";
  } else if (degrees < 135) {
    return "E";
  } else if (degrees < 180) {
    return "SE";
  } else if (degrees < 225) {
    return "S";
  } else if (degrees < 270) {
    return "SW";
  } else if (degrees < 315) {
    return "W";
  } else if (degrees <= 360) {
    return "NW";
  }
};

const getBackgroundVideo = cod => {
  if (cod >= 200 && cod < 300) {
    return "assets/thunderstorm";
  } else if (cod >= 300 && cod < 400) {
    return "assets/drizzle";
  } else if (cod >= 500 && cod < 600) {
    return "assets/rain";
  } else if (cod >= 600 && cod < 700) {
    return "assets/snow";
  } else if (cod >= 700 && cod < 800) {
    return "assets/fog";
  } else if (cod === 800) {
    return "assets/clear";
  } else if (cod > 800) {
    return "assets/cloudy";
  }
};

function inCaseOfError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert(
        "User denied the request for Geolocation. Please type a city on the search bar."
      );
      break;
    case error.POSITION_UNAVAILABLE:
      alert(
        "Location information is unavailable. Please type a city on the search bar."
      );
      break;
    case error.TIMEOUT:
      alert(
        "The request to get user location timed out. Please type a city on the search bar."
      );
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred. Please type a city on the search bar.");
      break;
  }
}

const getWeather = () => {
  if (document.getElementById("location").value === "") {
    alert("Please type in a city.");
  } else {
    let position = `q=${document.getElementById("location").value}`;
    refreshWeather(position);
    document.getElementById("search-bar").reset();
  }
};

const getActualWeather = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${city}&units=metric&APPID=${apiKey}`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      if (json.cod === 200) {
        let sunrise = new Date((json.sys.sunrise + json.timezone) * 1000);
        let sunset = new Date((json.sys.sunset + json.timezone) * 1000);

        // document
        //   .getElementById("video")
        //   .setAttribute("src", getBackgroundVideo(json.weather[0].id));
        document.getElementById(
          "video"
        ).innerHTML += `<source src="${getBackgroundVideo(
          json.weather[0].id
        )}.mp4" type="video/mp4"></source><source src="${getBackgroundVideo(
          json.weather[0].id
        )}.webm" type="video/webm"></source><p>This browser doesn't support video...</p>`;
        document.getElementById(
          "city"
        ).innerHTML = `${json.name}, ${json.sys.country}`;
        document.getElementById(
          "summary"
        ).innerHTML += `<p class="temperature">${json.main.temp.toFixed(
          1
        )}°</p>${json.weather[0].main.toLowerCase()}`;
        document.getElementById("sunrise-sunset").innerHTML = `sunrise ${(
          "0" + sunrise.getHours()
        ).slice(-2)}:${("0" + sunrise.getMinutes()).slice(-2)} | sunset: ${(
          "0" + sunset.getHours()
        ).slice(-2)}:${("0" + sunset.getMinutes()).slice(-2)}`;
        document.getElementById("icon").style.display = "block";
        document.getElementById(
          "icon"
        ).src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
      } else if (json.cod === 404) {
        // alert(`There was an error retrieving the location.`);
        document.getElementById(
          "city"
        ).innerHTML = `There was an error retrieving the location.`;
      } else {
        //alert(`City not found.`);
        document.getElementById("city").innerHTML = `Location not found.`;
      }
    })
    .catch(err => {
      return err;
    });
};

const getNextHoursForecast = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?${city}&cnt=5&units=metric&APPID=${apiKey}`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);
      index = 1;
      json.list.forEach(weather => {
        let dt = new Date(0);
        dt.setUTCSeconds(weather.dt);
        document.getElementById(
          "forecast"
        ).innerHTML += `<div class="main-forecast" id="section${index}"><div>${dt.getDate()} ${
          monthShortNames[dt.getMonth()]
        } ${("0" + dt.getHours()).slice(-2)}:${("0" + dt.getMinutes()).slice(
          -2
        )}</div><div class="forecast-info">${weather.main.temp.toFixed(
          1
        )}°<img src="https://openweathermap.org/img/wn/${
          weather.weather[0].icon
        }.png" alt="Weather representation"> <span id="arrow${index}">&#x25B6;</span></div></div>
        <div class="detail">
        <p><b>Weather description:</b> ${weather.weather[0].description}</p>
        <p><b>Wind speed (m/s):</b> ${weather.wind.speed.toFixed(0)}</p>
        <p><b>Wind direction:</b> ${getWindDirection(weather.wind.deg)}</p>
        <p><b>Atmospheric pressure (hPa):</b> ${weather.main.pressure}</p>
        <p><b>Humidity (%):</b> ${weather.main.humidity}</p></div>`;

        index++;
      });

      document.getElementById("section1").onclick = toggle;
      document.getElementById("section2").onclick = toggle;
      document.getElementById("section3").onclick = toggle;
      document.getElementById("section4").onclick = toggle;
      document.getElementById("section5").onclick = toggle;
      document.getElementById("arrow1").onclick = rotate;
      document.getElementById("arrow2").onclick = rotate;
      document.getElementById("arrow3").onclick = rotate;
      document.getElementById("arrow4").onclick = rotate;
      document.getElementById("arrow5").onclick = rotate;
    })
    .catch(err => {
      console.log("caught error", err);
    });
};

const refreshWeather = position => {
  if (typeof position === "object") {
    city = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
  } else if (typeof position === "string") {
    city = position;
  }

  clearData();

  getActualWeather();

  getNextHoursForecast();
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(refreshWeather, inCaseOfError);
} else {
  refreshWeather("Stockholm, SE");
}
