document.addEventListener('DOMContentLoaded', () => {

    // 1. Element References
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const statusContainer = document.getElementById('status-container');
    const weatherCard = document.getElementById('weather-card');

    const cityNameEl = document.getElementById('city-name');
    const apiUrlDisplay = document.getElementById('api-url-display');
    const temperatureEl = document.getElementById('temperature');
    const conditionEl = document.getElementById('condition');
    const humidityEl = document.getElementById('humidity');
    const windSpeedEl = document.getElementById('wind-speed');
    const descriptionEl = document.getElementById('description');
    const weatherDynamicIcon = document.getElementById('weather-dynamic-icon');
    const jsonRawDisplay = document.getElementById('json-raw-display');
    const cityChips = document.querySelectorAll('.city-chip');

    // 2. Fallback dataset (if local file CORS restrictions occur)
    const mockDataFallback = {
        "chennai": {
            "city": "Chennai",
            "temperature": 32,
            "condition": "Partly Cloudy",
            "humidity": 72,
            "wind_speed": 14,
            "description": "The weather is warm with partly cloudy conditions and a pleasant coastal breeze."
        },
        "mumbai": {
            "city": "Mumbai",
            "temperature": 30,
            "condition": "Humid & Sunny",
            "humidity": 80,
            "wind_speed": 18,
            "description": "Hot and humid weather with strong sea breeze and clear skies."
        },
        "delhi": {
            "city": "Delhi",
            "temperature": 28,
            "condition": "Hazy Sunshine",
            "humidity": 55,
            "wind_speed": 10,
            "description": "Mild afternoon temperatures accompanied by light atmospheric haze."
        },
        "london": {
            "city": "London",
            "temperature": 15,
            "condition": "Light Rain",
            "humidity": 85,
            "wind_speed": 22,
            "description": "Cool temperatures with intermittent light rain showers throughout the day."
        },
        "new york": {
            "city": "New York",
            "temperature": 22,
            "condition": "Clear Sky",
            "humidity": 60,
            "wind_speed": 15,
            "description": "Pleasant autumn temperatures with clear blue skies and crisp wind."
        },
        "tokyo": {
            "city": "Tokyo",
            "temperature": 20,
            "condition": "Cloudy",
            "humidity": 68,
            "wind_speed": 12,
            "description": "Overcast skies with mild and comfortable ambient weather."
        },
        "paris": {
    "city": "Paris",
    "temperature": 18,
    "condition": "Overcast",
    "humidity": 70,
    "wind_speed": 16,
    "description": "Cool and cloudy skies with occasional drizzle making for a typical autumn day."
},
"sydney": {
    "city": "Sydney",
    "temperature": 25,
    "condition": "Sunny",
    "humidity": 60,
    "wind_speed": 20,
    "description": "Bright and sunny weather with a refreshing coastal breeze."
},
"singapore": {
    "city": "Singapore",
    "temperature": 31,
    "condition": "Thunderstorms",
    "humidity": 85,
    "wind_speed": 12,
    "description": "Hot and humid conditions with scattered thunderstorms in the afternoon."
},
"berlin": {
    "city": "Berlin",
    "temperature": 12,
    "condition": "Foggy",
    "humidity": 78,
    "wind_speed": 8,
    "description": "Chilly morning fog with limited visibility, clearing slightly by afternoon."
},
"toronto": {
    "city": "Toronto",
    "temperature": 19,
    "condition": "Partly Cloudy",
    "humidity": 65,
    "wind_speed": 14,
    "description": "Mild temperatures with a mix of sun and clouds, pleasant for outdoor activities."
},
"cairo": {
    "city": "Cairo",
    "temperature": 34,
    "condition": "Hot & Dry",
    "humidity": 30,
    "wind_speed": 10,
    "description": "Scorching desert heat with dry winds and clear skies."
},
"rio de janeiro": {
    "city": "Rio de Janeiro",
    "temperature": 27,
    "condition": "Sunny & Humid",
    "humidity": 75,
    "wind_speed": 18,
    "description": "Warm tropical sunshine with high humidity and a lively sea breeze."
},
"moscow": {
    "city": "Moscow",
    "temperature": 10,
    "condition": "Cold & Cloudy",
    "humidity": 68,
    "wind_speed": 9,
    "description": "Chilly weather with dense cloud cover and a crisp breeze."
}

    };

    // 3. Primary AJAX Function using XMLHttpRequest
    function fetchWeatherData(cityName) {
        const queryCity = cityName.trim();

        // Validation 1: Empty input check
        if (!queryCity) {
            showStatus('warning', 'Please enter a city name.');
            hideWeatherCard();
            return;
        }

        // Display hypothetical endpoint URL
        apiUrlDisplay.textContent = `https://example.com/api/weather?city=${encodeURIComponent(queryCity)}`;

        // Validation 2: Show loading status while processing AJAX
        showStatus('loading', 'Fetching weather data via AJAX request...');
        hideWeatherCard();

        // Small delay (600ms) to visibly demonstrate asynchronous loading
        setTimeout(() => {
            
            // Step A: Create XMLHttpRequest Object (AJAX Core)
            const xhr = new XMLHttpRequest();

            // Step B: Configure Request (GET method, endpoint 'weather.json', Async=true)
            xhr.open('GET', 'weather.json', true);

            // Step C: Monitor readyState changes
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) { // 4 = Request Finished
                    if (xhr.status === 200 || xhr.status === 0) {
                        try {
                            // Step D: Parse returned JSON text into JavaScript Object
                            let allWeatherData = xhr.responseText ? JSON.parse(xhr.responseText) : mockDataFallback;
                            processWeatherJSON(allWeatherData, queryCity);
                        } catch (parseError) {
                            processWeatherJSON(mockDataFallback, queryCity);
                        }
                    } else {
                        processWeatherJSON(mockDataFallback, queryCity);
                    }
                }
            };

            // Network Error Listener
            xhr.onerror = function () {
                processWeatherJSON(mockDataFallback, queryCity);
            };

            // Step E: Send the AJAX Request
            xhr.send();

        }, 600);
    }

    // 4. Process Parsed JSON & Update DOM
    function processWeatherJSON(data, queryCity) {
        const cityKey = queryCity.toLowerCase();

        if (data && data[cityKey]) {
            const cityData = data[cityKey];

            hideStatus();

            // Dynamic DOM Updates
            cityNameEl.textContent = cityData.city;
            temperatureEl.textContent = cityData.temperature;
            conditionEl.textContent = cityData.condition;
            humidityEl.textContent = cityData.humidity;
            windSpeedEl.textContent = cityData.wind_speed;
            descriptionEl.textContent = cityData.description;

            // Raw JSON viewer for demonstration
            jsonRawDisplay.textContent = JSON.stringify(cityData, null, 2);

            // Dynamic Weather Icon
            updateWeatherIcon(cityData.condition);

            showWeatherCard();
        } else {
            // Validation 3: City not found error
            showStatus('error', 'Weather data not found.');
            hideWeatherCard();
        }
    }

    // Helper functions
    function updateWeatherIcon(condition) {
        const lowerCond = condition.toLowerCase();
        let iconClass = 'fa-sun';
        let iconColor = '#f59e0b';

        if (lowerCond.includes('rain')) { iconClass = 'fa-cloud-showers-heavy'; iconColor = '#38bdf8'; }
        else if (lowerCond.includes('cloud')) { iconClass = 'fa-cloud-sun'; iconColor = '#94a3b8'; }
        else if (lowerCond.includes('haze')) { iconClass = 'fa-smog'; iconColor = '#cbd5e1'; }

        weatherDynamicIcon.innerHTML = `<i class="fa-solid ${iconClass}" style="color: ${iconColor};"></i>`;
    }

    function showStatus(type, message) {
        statusContainer.classList.remove('hidden');
        if (type === 'loading') {
            statusContainer.innerHTML = `<div class="loading-box"><div class="spinner"></div><span>${message}</span></div>`;
        } else if (type === 'error') {
            statusContainer.innerHTML = `<div class="error-box"><i class="fa-solid fa-circle-exclamation"></i><span>${message}</span></div>`;
        } else if (type === 'warning') {
            statusContainer.innerHTML = `<div class="warning-box"><i class="fa-solid fa-triangle-exclamation"></i><span>${message}</span></div>`;
        }
    }

    function hideStatus() { statusContainer.classList.add('hidden'); }
    function showWeatherCard() { weatherCard.classList.remove('hidden'); }
    function hideWeatherCard() { weatherCard.classList.add('hidden'); }

    // Event Listeners
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents page refresh
        fetchWeatherData(cityInput.value);
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents page refresh
            fetchWeatherData(cityInput.value);
        }
    });

    cityChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const selectedCity = chip.getAttribute('data-city');
            cityInput.value = selectedCity;
            fetchWeatherData(selectedCity);
        });
    });
});