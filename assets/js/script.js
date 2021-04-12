const apiKey = "3d9fddb8f2cb58ac30bf4b03843a1044"
const date = moment().format("MM/DD/YYYY");
const searchButtonEl = document.getElementById("searchButton");


searchButtonEl.addEventListener("click", function (event) {
    event.preventDefault();

    var city = document.querySelector("#city-search").value.trim();
    console.log(city);

});
