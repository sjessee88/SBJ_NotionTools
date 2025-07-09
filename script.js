async function getWeather(lat, lon) {
  try {
    const apiKey = "82b9e45792cb471ebc7134049250807"; // replace with your WeatherAPI key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather API error");

    const data = await response.json();

    document.getElementById("city").textContent = data.location.name;
    document.getElementById("temp").textContent = `${data.current.temp_f}°F`;
    document.getElementById("condition").textContent = data.current.condition.text;

    const icon = document.getElementById("icon");
    if (data.current.condition.icon) {
      icon.src = "https:" + data.current.condition.icon;
      icon.style.display = "block";
    }
  } catch (error) {
    console.error("Weather widget error:", error);
    document.getElementById("city").textContent = "Unable to load weather.";
    document.getElementById("temp").textContent = "-";
    document.getElementById("condition").textContent = "-";
    document.getElementById("icon").style.display = "none";
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
