async function getWeather() {
  try {
    // Step 1: Get user's location by IP
    const ipRes = await fetch("http://ip-api.com/json/");
    const ipData = await ipRes.json();
    const { city, lat, lon } = ipData;

    // Step 2: Get weather using WeatherAPI.com
    const apiKey = "82b9e45792cb471ebc7134049250807";
    const weatherRes = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
    );
    const weatherData = await weatherRes.json();

    // Step 3: Update the widget
    document.getElementById("city").textContent = city;
    document.getElementById(
      "temp"
    ).textContent = `${weatherData.current.temp_f}°F`;
    document.getElementById("condition").textContent =
      weatherData.current.condition.text;
  } catch (error) {
    console.error("Weather widget error:", error);
  }
}

getWeather();