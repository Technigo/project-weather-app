export const getWeatherToday = (data) => {
  let html = "";

  html += `
    <h1>${data.temp} &deg;C - ${data.type}</h1>
    <h2>${data.city}</h2>
    <div class="header-info sun-times__wrapper">
        <h3>Sunrise</h3>
        <h3>${data.sunrise}</h3>
        <h3>Sunset</h3>
        <h3>${data.sunset}</h3>
    </div>
    `;

  return html;
};
