import { handleWeatherUrl } from "./geolocation.js";

export const handleSearchForm = (e) => {
  e.preventDefault();
  const searchInput = document.getElementById("search-input");

  const city = searchInput.value.toLowerCase();

  handleWeatherUrl(city);
};
