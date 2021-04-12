const apiKey = "3d9fddb8f2cb58ac30bf4b03843a1044"
const date = moment().format("MM/DD/YYYY");
const searchButtonEl = document.getElementById("searchButton");


searchButtonEl.addEventListener("click", function (event) {
    event.preventDefault();

    const city = document.querySelector("#city-search").value.trim();
    console.log(city);

    displayWeather(city);
});

function displayWeather(city) {
    const todaysWeather = document.getElementById("weather-report");
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
      )
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        todaysWeather.innerHTML = `
          <h3>${data.name} (${date})</h3>
          <p>High: ${data.main.temp_max} F </p>
          <p>Low: ${data.main.temp_min} F </p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind: ${data.wind.speed} mph</p>
          
         `;
        console.log(data);
   
    });
}