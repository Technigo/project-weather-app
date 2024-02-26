// 1. Get the geoloction from the user
// 2. Fetch the weather from that geoocation

export const fetchWeatherDataByCity = (crd) => {
  const lat = crd.latitude;
  const lon = crd.longitude;

  console.log(lat, lon);
};

console.log("test");
