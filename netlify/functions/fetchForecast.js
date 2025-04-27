
exports.handler = async function (event) {
  const API_KEY = process.env.API_KEY; 
  const { city } = event.queryStringParameters;

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "City is required" }),
    };
  }

  // Forecast-endpoint
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: `Failed to fetch forecast data (status ${response.status})` 
        }),
      };
    }

    const data = await response.json();

    if (!data.list) {
      return {
        statusCode: 404,
        body: JSON.stringify({ 
          error: "No forecast data found for that city" 
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch forecast data" }),
    };
  }
};

