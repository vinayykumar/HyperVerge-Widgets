// Weather Widget Functionality
const apiKey = 'YOUR_WEATHER_API_KEY';

document.getElementById('get-weather').addEventListener('click', function() {
    const location = document.getElementById('location-input').value;
    getWeather(location);
});

function getWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
                document.getElementById('weather-description').textContent = `Weather: ${data.weather[0].description}`;
            } else {
                alert('Location not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Pomodoro Timer Functionality
let minutes = 25;
let seconds = 0;
let interval;

document.getElementById('start').addEventListener('click', function() {
    clearInterval(interval);
    interval = setInterval(timer, 1000);
});

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(interval);
    minutes = 25;
    seconds = 0;
    updateDisplay();
});

function timer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(interval);
            alert("Time's up!");
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Toggle Widget Visibility
const widgetToggles = {
    'google-slide': 'toggle-google-slide',
    'google-sheet': 'toggle-google-sheet',
    'google-form': 'toggle-google-form',
    'google-meet': 'toggle-google-meet',
    'chatgpt': 'toggle-chatgpt',
    'google-calendar': 'toggle-google-calendar',
    'pomodoro-timer': 'toggle-pomodoro-timer',
    'announcements': 'toggle-announcements',
    'steps-tracker': 'toggle-steps-tracker',
    'opportunity-board': 'toggle-opportunity-board',
    'leaderboard': 'toggle-leaderboard',
    'til-corner': 'toggle-til-corner',
    'weather': 'toggle-weather'
};

for (const widget in widgetToggles) {
    document.getElementById(widgetToggles[widget]).addEventListener('change', function() {
        document.getElementById(`widget-${widget}`).classList.toggle('hidden', !this.checked);
    });
}

// Steps/Health Tracker Functionality
let steps = 0;
document.getElementById('log-steps').addEventListener('click', function() {
    const stepsInput = parseInt(document.getElementById('steps-input').value) || 0;
    steps += stepsInput;
    document.getElementById('steps-log').textContent = `Steps walked today: ${steps}`;
    document.getElementById('steps-input').value = '';
});

// TIL Corner Functionality
document.getElementById('share-til').addEventListener('click', function() {
    const tilInput = document.getElementById('til-input').value;
    document.getElementById('til-log').textContent = `Latest learning: ${tilInput}`;
    document.getElementById('til-input').value = '';
});

// ChatGPT Integration
document.getElementById('chatgpt-submit').addEventListener('click', function() {
    const prompt = document.getElementById('chatgpt-prompt').value;
    getChatGPTResponse(prompt);
});

function getChatGPTResponse(prompt) {
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 150
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('chatgpt-response').textContent = data.choices[0].text.trim();
    })
    .catch(error => {
        console.error('Error fetching ChatGPT response:', error);
    });
}