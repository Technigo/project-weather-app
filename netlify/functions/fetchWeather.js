exports.handler = async function(event) {
  const API_KEY = process.env.API_KEY; 
  const { city } = event.queryStringParameters;

  if (!city) {
      return {
          statusCode: 400,
          body: JSON.stringify({ error: "City is required" }),
      };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  
  try {
      const response = await fetch(url);
      const data = await response.json();
      
      return {
          statusCode: 200,
          body: JSON.stringify(data),
      };
  } catch (error) {
      return {
          statusCode: 500,
          body: JSON.stringify({ error: "Failed to fetch weather data" }),
      };
  }
};

