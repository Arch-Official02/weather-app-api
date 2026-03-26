async function getWeather() {
  const city = document.getElementById("city").value;
  const result = document.getElementById("result");

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // Keep key in .env

  if (!apiKey) {
    result.innerText = "API key not set. Check README for instructions.";
    return;
  }

  result.innerText = "Loading...";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (data.cod !== 200) {
      result.innerText = "City not found";
      return;
    }

    result.innerText = `
City: ${data.name}
Temp: ${data.main.temp}°C
Weather: ${data.weather[0].description}
    `;
  } catch (error) {
    result.innerText = "Error fetching data";
    console.error(error);
  }
}
