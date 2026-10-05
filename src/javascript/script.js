document.querySelector("#search").addEventListener("submit", async (event) => {
    event.preventDefault();

    const cityName = document.querySelector("#city-name").value;

    if (!cityName) {
        return showAlert("Digite uma cidade.");
    }

    const apiKey = '17123e95da9b9887accab9604f16d8cc';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        })
    } else {
        showAlert("Não foi possível localizar...");
    }
});

function showInfo(json) {
    showAlert('');
    document.querySelector("#weather").classList.add('show');
}

function showAlert(msg) {
    document.querySelector("#alert").innerHTML = msg;
}