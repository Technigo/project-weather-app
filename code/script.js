"use strict";

let currentWeather;
let dayIndex;
let didInputWork = false;

let citiesLocalStorage;
let inputNoitem;
let cities = ["Berlin", "Kalix", "Osaka", "Stockholm", "Mexico City"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weatherCondition = ["Clouds", "Rain", "Clear", "Thunderstorm", "Snow", "Mist"];
let cityName = cities[0];
let clickIndex = 0;

// for HTML elements
const card = document.querySelector(".card");
const inputHolder = document.getElementById("input");

const searchBtn = document.getElementById("search-btn");
const clickBtnR = document.getElementById("click-btn-right");
const clickBtnL = document.getElementById("click-btn-left");
const dotsBox = document.querySelector(".slider-dots");
const modalWindow = document.querySelector(".modal-window");
const citiesBox = document.querySelector(".cities-conatiner");
const menuBtn = document.querySelector(".menu");
const closeBtn = document.querySelector(".icon-close");
const deleteBtn = document.getElementById("delete-btn");

// This is for calling an api for main/ upper section

async function callApiCurrentWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3a2e7d598cb1958aefb452acd4215121&cnt=7`
    );
    const data = await res.json();
    const {
      main: { temp, feels_like, temp_min, temp_max },
      name,
      weather: [{ description: weather, icon, main }],
      sys: { sunrise, sunset },
      timezone,
    } = data;

    const sunriseCalcStarter = sunrise + timezone;
    const sunsetCalcStarter = sunset + timezone;

    const currentTimeArr = new Date(new Date().getTime() + timezone * 1000)
      .toUTCString()
      .split(" ");

    const currentTime = currentTimeArr[4].split(":").splice(0, 2).join(":");

    const currentDay = currentTimeArr[0].slice(0, -1);
    dayIndex = days.indexOf(currentDay);
    console.log(dayIndex, currentDay);

    const sunriseTime = new Date(sunriseCalcStarter * 1000)
      .toUTCString()
      .split(" ")[4]
      .split(":")
      .splice(0, 2)
      .join(":");

    const sunsetTime = new Date(sunsetCalcStarter * 1000)
      .toUTCString()
      .split(" ")[4]
      .split(":")
      .splice(0, 2)
      .join(":");

    currentWeather = {
      city: name,
      weather: weather,
      time: currentTime,
      temp: temp,
      fllesLike: feels_like,
      tempMax: temp_max,
      tempMin: temp_min,
      sunset: sunsetTime,
      sunrise: sunriseTime,
      day: currentDay,
      icon: icon,
      main: main,
    };

    storeCityLocalStorage(city);

    createCardUpper(currentWeather);
    callApiFiveDaysWeather(city);
  } catch {
    (error) => {
      console.log(error);
      handleErorr(error, city);
    };
  }
}

// This is for calling api for 4 more days
async function callApiFiveDaysWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=30&APPID=3a2e7d598cb1958aefb452acd4215121`
    );
    const data = await res.json();

    console.log(data);
    const weatherArr = data.list.filter((obj) => obj.dt_txt.includes("03:00"));
    weatherArr.shift();
    createCardUnder(weatherArr);
  } catch {
    (error) => {
      console.error(error);
    };
  }
}

// This is for creating a upper section of a card
function createCardUpper(obj) {
  const { city, weather, time, temp, fllesLike, tempMax, tempMin, sunset, sunrise, main } = obj;

  const innerCard = document.createElement("div");
  innerCard.classList.add("upper--card_main");

  const iconurl = chooseIcons(main);
  const backgroundImgUrl = chooseBackgroundImg(main);

  let htmlElm = `
    <div class="main-degree">
    <h1  ${main === "Clouds" ? `class="dark-text"` : ""}>${Math.round(
    temp
  )}<span class="degree-large">&#x2103;</span></h1>

    <div>
     <img src=${iconurl} class="icon-main">
      <p>${Math.round(tempMax)}<span class="degree">&#x2103;</span>/${Math.round(
    tempMin
  )}<span class="degree">&#x2103;</span></p>
   </div>
   </div>

<div class="currenttime-wrapper">
  <h2 ${main === "Clouds" ? `class="dark-text"` : ""}>${city}</h2>
  <p class="currenttime-wrapper-p">time: <span>${time}</span></p>
</div>

<div class="main-details-box">
  <p class="weather-des">${weather}</p>
  <p>feels like: ${Math.round(fllesLike)}<span class="degree">&#x2103;</span></p>
  <p>sunrise  ${sunrise}</p> <p>sunset  ${sunset}</p>
</div>

<svg class="wave" style="transform:rotate(0deg); transition: 0.3s" viewBox="0 0 1440 250" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(255, 251, 235, 1)" offset="0%"></stop><stop stop-color="rgba(255, 255, 255, 1)" offset="100%"></stop></linearGradient></defs><path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)" d="M0,175L34.3,162.5C68.6,150,137,125,206,120.8C274.3,117,343,133,411,154.2C480,175,549,200,617,212.5C685.7,225,754,225,823,220.8C891.4,217,960,208,1029,183.3C1097.1,158,1166,117,1234,95.8C1302.9,75,1371,75,1440,91.7C1508.6,108,1577,142,1646,145.8C1714.3,150,1783,125,1851,100C1920,75,1989,50,2057,58.3C2125.7,67,2194,108,2263,125C2331.4,142,2400,133,2469,145.8C2537.1,158,2606,192,2674,170.8C2742.9,150,2811,75,2880,54.2C2948.6,33,3017,67,3086,70.8C3154.3,75,3223,50,3291,58.3C3360,67,3429,108,3497,129.2C3565.7,150,3634,150,3703,133.3C3771.4,117,3840,83,3909,83.3C3977.1,83,4046,117,4114,141.7C4182.9,167,4251,183,4320,162.5C4388.6,142,4457,83,4526,50C4594.3,17,4663,8,4731,29.2C4800,50,4869,100,4903,125L4937.1,150L4937.1,250L4902.9,250C4868.6,250,4800,250,4731,250C4662.9,250,4594,250,4526,250C4457.1,250,4389,250,4320,250C4251.4,250,4183,250,4114,250C4045.7,250,3977,250,3909,250C3840,250,3771,250,3703,250C3634.3,250,3566,250,3497,250C3428.6,250,3360,250,3291,250C3222.9,250,3154,250,3086,250C3017.1,250,2949,250,2880,250C2811.4,250,2743,250,2674,250C2605.7,250,2537,250,2469,250C2400,250,2331,250,2263,250C2194.3,250,2126,250,2057,250C1988.6,250,1920,250,1851,250C1782.9,250,1714,250,1646,250C1577.1,250,1509,250,1440,250C1371.4,250,1303,250,1234,250C1165.7,250,1097,250,1029,250C960,250,891,250,823,250C754.3,250,686,250,617,250C548.6,250,480,250,411,250C342.9,250,274,250,206,250C137.1,250,69,250,34,250L0,250Z"></path></svg>
`;

  innerCard.insertAdjacentHTML("beforeend", htmlElm);
  card.insertAdjacentElement("beforeend", innerCard);

  const upperCard = document.querySelector(".upper--card_main");

  upperCard.style.backgroundImage = `url(${backgroundImgUrl})`;

  clickBtnL.style.display = "block";
  clickBtnR.style.display = "block";
  menuBtn.style.display = "block";
  dotsBox.style.display = "block";

  createDots();
}

// This is for creating an under section of a card.
function createCardUnder(arr) {
  const innerCard = document.createElement("div");
  innerCard.classList.add("card--under");

  let isToday = dayIndex;

  for (let i = 0; i < 4; i++) {
    const {
      main: { temp, temp_min, temp_max },
      weather: [{ main }],
    } = arr[i];
    const iconurl = chooseIcons(main);
    if (isToday < 6) {
      isToday++;
    } else if (isToday === 6) {
      isToday = 0;
    }

    const html = `
      <div class="card--under_inner">
      <p ${days[isToday] === days[5] || days[isToday] === days[6] ? `class="red"` : ""}>${
      days[isToday]
    }  <img  src="${iconurl}" class="icon-weather-sm"/>
    
    <sapn class="min-max-temp-under-box">${Math.round(temp_max)}&#176;/${Math.round(
      temp_min
    )}&#176;</span></p>
      </div>
     `;
    innerCard.insertAdjacentHTML("beforeend", html);
  }
  card.insertAdjacentElement("beforeend", innerCard);
}

// This is for collecting value when a user writes a city name in an input
function getCityName() {
  let value = inputHolder.value.trim().toLowerCase() || inputNoitem.value.trim().toLowerCase();
  console.log(value);
  card.textContent = "";
  inputHolder.value = "";
  callApiCurrentWeather(value);
  closeModal();
  dotsBox.style.display = "block";
  clickBtnL.style.display = "inline-block";
  clickBtnR.style.display = "inline-block";
  menuBtn.style.display = "block";
}

// this is to store a city name to local storage
function storeCityLocalStorage(city) {
  localStorage.setItem(city, city);
  !cities.includes(city) ? cities.push(city) : "";
}

// This controls thenbackground image for upper section
function chooseBackgroundImg(weather) {
  let imgUrl;
  switch (weather) {
    case weatherCondition[0]:
      imgUrl = "assets/images/cloud.jpg";
      break;
    case weatherCondition[1]:
      imgUrl = "assets/images/rainny.jpg";
      break;
    case weatherCondition[2]:
      imgUrl = "assets/images/sunny.jpg";
      break;
    case weatherCondition[3]:
      imgUrl = "assets/images/cloud.jpg";
      break;
    case weatherCondition[4]:
      imgUrl = "assets/images/winter.jpg";
      break;
    case weatherCondition[5]:
      imgUrl = "assets/images/mist.jpg";
      break;
    default:
      imgUrl = "assets/images/mist2.jpg";
  }
  return imgUrl;
}

// This is for choosing icons
function chooseIcons(weather) {
  let iconPath;
  switch (weather) {
    case weatherCondition[0]:
      iconPath = "assets/icons/cloudy-day.png";
      break;
    case weatherCondition[1]:
      iconPath = "assets/icons/unb.png";
      break;
    case weatherCondition[2]:
      iconPath = "assets/icons/sun.png";
      break;
    case weatherCondition[3]:
      iconPath = "assets/icons/cloud-lightning.png";
      break;
    case weatherCondition[4]:
      iconPath = "assets/icons/snow.png";
      break;
    case weatherCondition[5]:
      iconPath = "assets/icons/cloudy-day.png";
      break;
    default:
      iconPath = "assets/icons/wind.png";
  }

  return iconPath;
}

// Erorr handling
// This will show up when the user wrote an invalid city
function handleErorr(message, wrongCity) {
  clickBtnL.style.display = "none";
  clickBtnR.style.display = "none";
  menuBtn.style.display = "none";
  dotsBox.style.display = "none";
  const innerCard = document.createElement("div");
  innerCard.classList.add("error-page");
  const html = `
  <div>
    <h2>"${wrongCity}" is not a recognizable city name!!<h2>
    <p>${message} </p>
    <button class="back-btn"onclick="backToCard()">Back</button>
    </div>
    `;
  innerCard.insertAdjacentHTML("beforeend", html);
  card.insertAdjacentElement("beforeend", innerCard);
}

// button function that is on en error handling page
function backToCard() {
  const errorPage = document.querySelector(".error-page");
  errorPage.style.display = "none";
  cities.length > 0 ? callApiCurrentWeather(cities[0]) : createNoitemPage();
}

// slider dots ( under card )
// This function creates dots under card to see how many cities are in array.
function createDots() {
  dotsBox.textContent = "";
  //   Create div for staoring all the dots
  const innerBox = document.createElement("div");
  innerBox.classList.add("dots-inner-box");
  //   createing dots
  let i = 0;
  for (let city in cities) {
    const dotDiv = document.createElement("div");
    dotDiv.classList.add("dot");
    dotDiv.setAttribute("id", `${i}`);

    innerBox.insertAdjacentElement("beforeend", dotDiv);

    dotDiv.addEventListener("click", (e) => {
      console.log(e.target);
      const id = e.target.id;
      changeCardByDot(id);
      card.textContent = "";
      clickIndex = id;
      changeActiveDots(clickIndex);
    });
    i++;
  }

  dotsBox.insertAdjacentElement("beforeend", innerBox);

  didInputWork ? (clickIndex = cities.length - 1) : "";
  console.log(clickIndex);
  changeActiveDots(clickIndex);
  didInputWork = false;
}

let activeDot;
// This function add class active to an active card dot.
function changeActiveDots(index) {
  console.log(index);
  const dots = document.querySelectorAll(".dot");
  console.log(dots);
  activeDot = dots[index];
  console.log(activeDot);
  activeDot.classList.add("active");
}

// this is for changing a card when you click a dot
function changeCardByDot(id) {
  const chosenCity = cities[id];
  callApiCurrentWeather(chosenCity);
}

// This is for modal window
function openModal() {
  citiesBox.textContent = "";
  const citiesInnerBox = document.createElement("ul");

  cities.forEach((el, i) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const icon = document.createElement("img");
    li.classList.add(`list${i}`);
    button.classList.add("delete-city");
    icon.classList.add("delete-icon");
    li.textContent = el;
    icon.setAttribute("src", "assets/icons/delete.png");
    button.insertAdjacentElement("beforeend", icon);
    li.insertAdjacentElement("beforeend", button);
    citiesInnerBox.insertAdjacentElement("beforeend", li);
  });

  citiesBox.insertAdjacentElement("beforeend", citiesInnerBox);
  deleteCity();
  modalWindow.style.display = "flex";
  modalWindow.style.zIndex = "1000";
}

// This is for a button to delete a specific city
function deleteCity() {
  const buttons = document.querySelectorAll(".delete-city");

  buttons.forEach((el) =>
    el.addEventListener("click", (e) => {
      const city = e.target.parentNode.parentNode;
      const cityText = city.textContent;
      console.log(cityText);
      localStorage.removeItem(cityText);
      const index = cities.indexOf(city);

      cities = cities.splice(index, 1);
      city.style.display = "none";
      if (buttons.length === 1) {
        localStorage.clear();
        cities = [];
        clickIndex = 0;
        modalWindow.style.display = "none";
        createNoitemPage();
      } else {
        callApiCurrentWeather(cities[0]);
      }
    })
  );
}

function closeModal() {
  modalWindow.style.display = "none";
  modalWindow.style.zIndex = "-1";
}

function createNoitemPage() {
  const html = `
  <div class="noitem-text-box">
  <h3>Please select a city to check the weather</h3>
  <div class="noItem-input-wrapper">
  <input type="text" placeholder="City..." id="input-noitem" />
  <button onclick ="getCityName()" id="noitem-btn"><img src="assets/icons/search.png" class="search-icon" /></button>
  </div>
  </div>

`;
  card.textContent = "";
  card.insertAdjacentHTML("beforeend", html);
  inputNoitem = document.getElementById("input-noitem");
  inputNoitem.addEventListener("keydown", (e) => {
    if (e.key === "Enter") getCityName();
  });
  dotsBox.style.display = "none";
  clickBtnL.style.display = "none";
  clickBtnR.style.display = "none";
  menuBtn.style.display = "none";
}

// Geolocation
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);

//     let lat = position.coords.latitude;
//     let long = position.coords.longitude;
//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

/*************************************************************************************************************/
//  Event Handlers   //
/*************************************************************************************************************/

// When you click search Btn, the city's weather will be shown on the card.
searchBtn.addEventListener("click", () => {
  didInputWork = true;
  getCityName();
});

window.addEventListener("load", () => {
  citiesLocalStorage = { ...localStorage };
  citiesLocalStorage ? (cities = []) : "";
  for (const [key, val] of Object.entries(citiesLocalStorage)) {
    cities.push(val);
  }
  if (localStorage.length === 0) {
    cities.map((city) => localStorage.setItem(city, city));
    if (cities.length === 0) {
      createNoitemPage();
      modalWindow.style.display = "none";
      document.querySelector(".error-page").style.display = "none";
    }
  }

  callApiCurrentWeather(cities[0]);
  console.log(localStorage);
});

// Slider EventListeners

// when you click butttons which are on card( arrow icons )

clickBtnR.addEventListener("click", () => {
  if (clickIndex < cities.length - 1) clickIndex++;
  else if (clickIndex === cities.length) return (clickIndex = cities.length - 1);
  else return;
  cityName = cities[clickIndex];
  callApiCurrentWeather(cityName);
  card.textContent = "";
  dotsBox.textContent = "";
});

clickBtnL.addEventListener("click", () => {
  if (clickIndex > 0) clickIndex--;
  else if (clickIndex === 0) return (clickIndex = 0);
  else return;
  cityName = cities[clickIndex];
  callApiCurrentWeather(cityName);
  card.textContent = "";
  dotsBox.textContent = "";
});

// Input search eventListner with "keydown"
inputHolder.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getCityName();
    didInputWork = true;
  }
});

// delete all the data from localstorage
deleteBtn.addEventListener("click", () => {
  localStorage.clear();
  cities = [];
  closeModal();
  createNoitemPage();
  clickIndex = 0;
});

// icon to open and close Modal window
menuBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
