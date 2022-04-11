// var searchBtn = document.getElementById("searchBtn");
// var searchValue = document.getElementById("inputValue");
// var city = document.getElementById("name");
// var weather = document.getElementById("weather");
// var temp = document.getElementById("temp");

const api_key = "0368f81a3c79a0ab876bb2c48d0174f3"

const searchInput = document.querySelector("#search");

const search = async (e) => {
    let value = e.target.value
    console.log(value)

    let lat = null;
    let lon = null;

    //Convert city to latitude longitude
    let geoData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=${10}&appid=${api_key}`, {
        method: 'GET',
        mode:"cors",
        //   body: new FormData(),
    })

    let geoResults = await geoData.json()
    lat = geoResults[0].lat;
    lon = geoResults[0].lon;


    let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`, {
        method: 'GET',
        mode:"cors",
    //   body: new FormData(),
    })
    let weatherResults = await weatherData.json();
    console.log(weatherResults)


        //What type of data to display to exxtract from object 
        //display next week of data from weatherResults.daily[0,1,2,3,4,5,6] - save this as an array and loop through the array
        //temperature predicture, weather prediction, 
        //Google JQuery.empty and .append
}


searchInput.addEventListener("change", search)