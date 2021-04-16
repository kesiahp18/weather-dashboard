const apiKey = "3d9fddb8f2cb58ac30bf4b03843a1044"
const date = moment().format("MM/DD/YYYY");
const searchButtonEl = document.getElementById("searchButton");


searchButtonEl.addEventListener("click", function (event) {
    event.preventDefault();

    const city = document.querySelector("#city-search").value.trim();
    console.log(city);
    
    if (city) {
      saveSearch(city)
      displayWeather(city);
      document.getElementById('error-message').innerHTML = ``
    } else {
      document.getElementById('error-message').innerHTML += `<h5 class="center">Please enter a city name!</h5>`
    }
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
          <h3 class="title center">Weather for ${data.name} ${date}</h3>
          <p>High: ${data.main.temp_max} F </p>
          <p>Low: ${data.main.temp_min} F </p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind: ${data.wind.speed} mph</p>
          
         `;
        console.log(data);
   
        var lat = data.coord.lat;
        var lon = data.coord.lon;
 
        fiveDayForcast(lat, lon);
        //need to fetch call a different API to get the UI index, this API uses lat and long rather than city name
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiKey}`
        )
        .then(function (response) {
            return response.json();
        })
        .then(function (uviData) {
          if(uviData.current.uvi > 11) {
            todaysWeather.innerHTML += `<p class="red-background">UV Index: ${uviData.current.uvi}</p>`;
          } else if (uviData.current.uvi > 6) {
            todaysWeather.innerHTML += `<p class="orange-background">UV Index: ${uviData.current.uvi}</p>`;
          } else if (uviData.current.uvi > 3) {
            todaysWeather.innerHTML += `<p class="yellow-background">UV Index: ${uviData.current.uvi}</p>`;
          } else {
            todaysWeather.innerHTML += `<p class="green-background">UV Index: ${uviData.current.uvi}</p>`;
          }
        });
    });
}

function fiveDayForcast(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=imperial&appid=${apiKey}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        document.querySelector("#five-day-forecast").innerHTML = "";
        for (var i = 0; i < 5; i++) {
          document.querySelector("#five-day-forecast").innerHTML += `
            <div class="card text-white bg-primary mb-3 add-margin-s" style="max-width: 18rem;">
            <div class="card-header">${moment
                .unix(data.daily[i].dt)
                .format("MM/DD/YYYY")} </div>
            <div class="card-body blue-background">
            <h5 class="card-title"><img src="http://openweathermap.org/img/wn/${
                data.daily[i].weather[0].icon
            }@2x.png" /> </h5>
            <p class= "card-text"> Temp: ${data.daily[i].temp.day}</p>
            <p class= "card-text"> Humidity: ${data.daily[i].humidity}</p>
                </div>
            `;
        }
    });
}

function saveSearch(city) {
    if (!localStorage.getItem("cities")) {
      localStorage.setItem("cities", JSON.stringify([]));
    }
    var cityArray = JSON.parse(localStorage.getItem("cities"));
    cityArray.push(city);
  
    localStorage.setItem("cities", JSON.stringify(cityArray));
    displaySavedSearches();
}

function displaySavedSearches() {
    document.querySelector("#city-list").innerHTML = "";
    var cityArray = JSON.parse(localStorage.getItem("cities"));
    console.log(cityArray)
    cityArray.forEach((city)=> {
       document.querySelector("#city-list").innerHTML += `<li class="flex city-list-item">${city}</li>`
    }) 
    document.querySelectorAll(".city-list-item").forEach((city) => {
        city.addEventListener("click", function (event) {
          event.preventDefault();
          var city = this.textContent
          displayWeather(city);
        });
    })
}

displaySavedSearches();