async function getWeather(lat, lon) {
  try {
    const apiKey = "82b9e45792cb471ebc7134049250807"; // Replace with your WeatherAPI key
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
    );
    if (!response.ok) throw new Error("Weather API error");

    const weatherData = await response.json();

    document.getElementById("city").textContent = weatherData.location.name;
    document.getElementById("temp").textContent =
      `${weatherData.current.temp_f}°F`;
    document.getElementById("condition").textContent =
      weatherData.current.condition.text;

    if (document.getElementById("icon")) {
      document.getElementById("icon").src =
        "https:" + weatherData.current.condition.icon;
    }
  } catch (error) {
    console.error("Weather widget error:", error);
    document.getElementById("city").textContent = "Unable to load weather.";
    document.getElementById("temp").textContent = "-";
    document.getElementById("condition").textContent = "-";
  }
}

function initWeatherWidget() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeather(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        document.getElementById("city").textContent =
          "Location permission denied.";
        document.getElementById("temp").textContent = "-";
        document.getElementById("condition").textContent = "-";
      }
    );
  } else {
    console.error("Geolocation not supported.");
    document.getElementById("city").textContent =
      "Geolocation not supported.";
    document.getElementById("temp").textContent = "-";
    document.getElementById("condition").textContent = "-";
  }
}

initWeatherWidget();
