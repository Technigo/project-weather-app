
    function convertTime(unixTime){
      let date = new Date(unixTime * 1000)
      let hours = date.getHours()
      let minutes = "0" + date.getMinutes()
      let time = hours + ":" + minutes.substr(-2)
      return time
      console.log(time)
    };

    let sunrise = convertTime(data.sys.sunrise)
    test.innerHTML += `The sun rises at ${sunrise}
    `
    let sunset = convertTime(data.sys.sunset)
    test.innerHTML += `The sun sets at ${sunset}
    `
})


