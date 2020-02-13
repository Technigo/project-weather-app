fetch("https://api.openweathermap.org/data/2.5/weather?q=stockholm,Sweden&units=metric&APPID=8ba6b8f613b670c947149eaad6fdfef7")
  .then((response) => {
    return response.json();
  })
  .then ((json) => {
    console.log(json)    
  })
  .catch((err) =>{
    console.log("caught error", err)
  })