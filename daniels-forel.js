//https://www.omdbapi.com/?t=nightmare-alley&apikey=e170d343

// I have a present for you - the fetch(url)
/// .then I'm giving you the present, but you don't know what's inside yet
// .then you're unwrappping the present, so now you can take a look what is inside
fetch("https://www.omdbapi.com/?t=nightmare-alley&apikey=e170d343")
  .then((present) => {
    console.log(present);
    return present.json();
  })
  .then((unwrappedPresent) => {
    console.log(unwrappedPresent);
    return unwrappedPresent;
  });
// can't get value from here
const getMovieDetailsFromAPI = (movieTitle) => {
  fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=e170d343`)
    .then((present) => {
      console.log(present);
      return present.json();
    })
    .then((unwrappedPresent) => {
      console.log(unwrappedPresent);
      result = unwrappedPresent;
    });
  return result;
};
const form = document.getElementById("main-form");
const formInput = document.getElementById("movie-search");
const movieDescription = document.querySelector(".movie-body");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // V1
  //   fetch(`https://www.omdbapi.com/?t=${formInput.value}&apikey=e170d343`)
  //     .then((present) => {
  //       console.log(present);
  //       return present.json();
  //     })
  //     .then((unwrappedPresent) => {
  //       console.log(unwrappedPresent);
  //       movieDescription.innerText = unwrappedPresent.Plot;
  //       formInput.value = "";
  //     });

  // V2 - extracted everything to an outside function
  getMovieDetailsFromAPI2(formInput.value);
});

// can set values
const getMovieDetailsFromAPI2 = (movieTitle) => {
  fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=e170d343`)
    .then((present) => {
      console.log(present);
      return present.json();
    })
    .then((unwrappedPresent) => {
      console.log(unwrappedPresent); 
      result = unwrappedPresent;
      movieDescription.innerText = unwrappedPresent.Plot;
      unwrappedPresent.Ratings.forEach((element) => {
        console.log(element);
      });
      formInput.value = "";
    });
};
/*
// box of labels
const exampleArray = ["Test", "test2", "test3"];
// box of boxes, each of which has label inside
const arrayOfObjects = [
  { name: "test1" },
  { name: "test2" },
  { name: "test3" },
];
const firstObjectInArray = arrayOfObjects[0];
const nameOfTheFirstObjectInArray = firstObjectInArray.name;
arrayOfObjects[0].name;

// access array element -> arrayName[indexYouWantToAccess]
// access a property of an array element -> arrayName[indexYouWantToAccess].propertyName

/// Thursday
const myDate = new Date();
// console.log(myDate);

// create a function to get day name from date mm/dd/yyyy
// language needs to be provided in the following manner - en-EN, pl-PL
const getDayName = (dateAsString, language) => {
  const date = new Date(dateAsString);
  // console.log(date);
  const dayName = date.toLocaleDateString(language, { weekday: "long" });
  return dayName;
};

// const getDayName = (dateStr, locale) => {
//   const date = new Date(dateStr);
//   console.log(date);
//   return date.toLocaleDateString(locale, { weekday: "long" });
// };

const banana = "05/23/2014";
const millisecondTime = 628021800000;
const day = getDayName(millisecondTime, "en-EN");

console.log(day);

// 7 day - need to provide lat and long
//  const urlString = `https://api.openweathermap.org/data/2.5/onecall?lat=${}.44&lon=${}.04&exclude=hourly,daily&appid=${}`
// This will be possible after we will bundle our projets (ex webpack);
// const myKey = process.env.MY_KEY;
// fetch(
//   `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${myKey}`
// )
//   .then((response) => response.json())
//   .then((data) => console.log(data));

const fetchPokemons = () => {
  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
    });
};
fetchPokemons(); */
