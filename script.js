async function getWeather() {
  try {
    const ipRes = await fetch("https://ip-api.com/json/");
    const ipData = await ipRes.json();
    const { city, lat, lon } = ipData;

    const apiKey = "82b9e45792cb471ebc7134049250807"; // Replace with your actual WeatherAPI key
    const weatherRes = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
    );
    const weatherData = await weatherRes.json();

    document.getElementById("city").textContent = city;
    document.getElementById("temp").textContent = `${weatherData.current.temp_f}°F`;
    document.getElementById("condition").textContent = weatherData.current.condition.text;
  } catch (error) {
    console.error("Weather widget error:", error);
    document.getElementById("city").textContent = "Unable to load weather.";
  }
}

getWeather();
