// Here we output all the functions that "help out" with trasforming data or other small tasks
const convertTimestampToTime = (timestamp, timezoneOffset) => {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hours}.${minutes}`;
}

const convertTimestampToDate = (timestamp, timezoneOffset) => {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// This a helper function that takes an object of parameters and converts it into "q=Stockholm,Sweden&units=metric&APPID=XXXX"
const buildQueryString = (params) => {
  return new URLSearchParams(params).toString();
}