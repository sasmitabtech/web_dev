const apiKey = "853b9f53d5ad90bb9746d2190fa3ceea"; // Replace with your OpenWeatherMap API key

const cityInput = document.getElementById("city-input");
const fetchWeatherButton = document.getElementById("fetch-weather");
const weatherInfoDiv = document.getElementById("weather-info");
const cityElement = document.getElementById("city");
const descriptionElement = document.getElementById("description");
const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");

fetchWeatherButton.addEventListener("click", () => {
    const city = cityInput.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=853b9f53d5ad90bb9746d2190fa3ceea&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            cityElement.textContent = data.name;
            descriptionElement.textContent = data.weather[0].description;
            temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherInfoDiv.innerHTML = "Error fetching weather data. Please try again.";
        });
});