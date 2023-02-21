// http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=775b6d69e24fcb088a070bee66d05057

fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=775b6d69e24fcb088a070bee66d05057"
)
  .then((present) => {
    console.log(present);
    return present.json();
  })
  .then((unwrappedPresent) => {
    console.log(unwrappedPresent);
    return unwrappedPresent;
  });
