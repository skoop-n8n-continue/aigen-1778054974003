const apiKey = "YOUR_API_KEY"; // Not needed for Open-Meteo

const miamiLat = 25.7617;
const miamiLon = -80.1918;

const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${miamiLat}&longitude=${miamiLon}&current_weather=true`;

const weatherInfoDiv = document.getElementById('weather-info');

async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log(data); // Log data to inspect structure if needed

        const temperature = data.current_weather.temperature;
        const weatherDescription = getWeatherDescription(data.current_weather.weathercode);

        weatherInfoDiv.innerHTML = `
            <p class="temperature">${temperature}°C</p>
            <p class="description">${weatherDescription}</p>
        `;

    } catch (error) {
        console.error("Could not fetch weather data:", error);
        weatherInfoDiv.innerHTML = "<p>Could not retrieve weather data. Please try again later.</p>";
    }
}

// Function to map weather codes to human-readable descriptions
function getWeatherDescription(weathercode) {
    // Weather code mapping based on Open-Meteo documentation
    // https://open-meteo.com/en/docs#current-weather-codes
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Slight snow fall',
        73: 'Moderate snow fall',
        75: 'Heavy snow fall',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Slight thunderstorm with hail',
        97: 'Slight thunderstorm with heavy hail'
    };
    return descriptions[weathercode] || 'Unknown weather';
}

fetchWeather();
