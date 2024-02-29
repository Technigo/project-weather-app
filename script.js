//Step 1 - use fetch() to load the weather data
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=db63b41efc78e9f2c60ec93f035d8cff"
)
  //Step 2 - Present some data on your web app
  //.then()ブロックの内部でのみデータのアクセス可能
  .then((response) => response.json())
  .then((data) => {
    //Access the elements where I want to display
    const cityNameElement = document.getElementById("city-name");
    const temperatureElement = document.getElementById("temperature");
    const descriptionElement = document.getElementById("description");
    //Update the content of above elements with the data from API
    cityNameElement.textContent = `City Name: ${data.name}`;
    temperatureElement.textContent = `Temperature: ${data.main.temp.toFixed(
      1
    )}°C`; //1は、小数点以下の桁数。もし18.37度だったら、18.3と表示
    descriptionElement.textContent = `Weather: ${data.weather[0].description}`;

    //Step 3 - Features
    //Feature - sunset and sunrise
    /*
1. まず読みやすい形式にデータを加工する
- new Date(): ミリ秒を受け取って、それを日時に変換する
- *1000: UNIXタイムスタンプは秒で測定されますが、JavaScriptのDateオブジェクトはミリ秒を期待しているので、1000を掛けて秒からミリ秒に変換
- .toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}): Dateオブジェクトを、特定のロケール（地域や言語）に適した時間の文字列に変換
- []: デフォルトのロケール（ブラウザやシステムの設定に基づく）を使用
- 2-digit: 時間を2桁の数字（"03"など）
*/
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    /*
2. 次に、加工したデータをDOM（Document Object Model）に挿入して表示する
- まず必要なデータを準備してから、そのデータをウェブページに表示するという流れになり、コードの読みやすさと整理がよくなる
- データを表示するための要素（<p id="sunrise"></p>、<p id="sunset"></p>）は、事前にHTMLに用意しておく
*/
    document.getElementById("sunrise").textContent = `Sunrise: ${sunriseTime}`;
    document.getElementById("sunset").textContent = `Sunset: ${sunsetTime}`;
  })

  .catch((error) => console.error("There was an error!", error));

//Feature - weather forecast
fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=db63b41efc78e9f2c60ec93f035d8cff"
)
  .then((response) => response.json())
  .then((forecastData) => {
    //12:00のデータのみをフィルタリング
    const noonForecasts = forecastData.list.filter((forecast) => {
      //この式が true を返す予報アイテムのみが、フィルタリングの結果として残る → 日中の正午（12:00）の予報データのみが選択される
      //.dt_txtは、単純にAPI設計者がこの名前を付けたから
      return forecast.dt_txt.includes("12:00:00");
    });

    //.then()ブロックから次の.then()ブロックへデータを「渡す」ためにreturnを使用
    return noonForecasts;
  })
  .then((noonForecasts) => {
    noonForecasts.forEach((forecast) => {
      // 新しいリストアイテム（li要素）を作成
      const forecastElement = document.createElement("li");
      // リストアイテムの内容を設定
      forecastElement.textContent = `Date: ${forecast.dt_txt}, Highest Temprature: ${forecast.main.temp_max}°C, Weather: ${forecast.weather[0].description}`;
      // li要素をHTMLのidがforecast-listの要素の中に追加
      //.appendChild = DOM（Document Object Model）に動的に要素を追加
      document.getElementById("forecast-list").appendChild(forecastElement);
    });
  });
