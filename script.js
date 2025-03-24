const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const historyList = document.getElementById('historyList');
const unitsSelect = document.getElementById('units');

const apiKey = '17db7d806c565bd7d86a62ce8847f008';

// Función para obtener los datos del clima
async function getWeatherData(city) {
    const units = unitsSelect.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=es`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeatherData(data);
        saveSearch(city);
        displayHistory();
    } catch (error) {
        console.error('Error:', error);
        weatherInfo.innerHTML = 'Ciudad no encontrada';
    }
}

// Función para mostrar los datos del clima
function displayWeatherData(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperatura: ${data.main.temp}°${unitsSelect.value === 'metric' ? 'C' : 'F'}`;
    description.textContent = data.weather[0].description;
    weatherIcon.src = 'src/icono.png';
    humidity.textContent = `Humedad: ${data.main.humidity}%`;
    windSpeed.textContent = `Viento: ${data.wind.speed} ${unitsSelect.value === 'metric' ? 'm/s' : 'mph'}`;
}

// Función para guardar la búsqueda en el historial
function saveSearch(city) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (!searches.includes(city)) {
        searches.push(city);
        localStorage.setItem('searches', JSON.stringify(searches));
    }
}

// Función para mostrar el historial de búsquedas
function displayHistory() {
    historyList.innerHTML = '';
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        li.addEventListener('click', () => {
            cityInput.value = city;
            getWeatherData(city);
        });
        historyList.appendChild(li);
    });
}

// Event listener para el botón de búsqueda
searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    }
});

// Event listener para el selector de unidades
unitsSelect.addEventListener('change', () => {
    const city = cityName.textContent;
    if (city) {
        getWeatherData(city);
    }
});

// Mostrar el historial al cargar la página
displayHistory();
