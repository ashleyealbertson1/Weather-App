var today = moment();
$('#date').text(today.format('dddd, MMM Do, YYYY'));

var time = moment().format("h" + ':' + "mm" + "a")
$("#time").html(time);

var searchBtn = document.getElementById('submitBtn');
var inputValue = document.getElementById('inputValue');


// var city = document.getElementById("city");
var weatherForecastEl = document.getElementById("weather-forecast");
var currentTemp = document.getElementById("current-temp");
var currentWeather = document.getElementById('current-weather');
var citySearch = []


var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var API_KEY = '0368f81a3c79a0ab876bb2c48d0174f3';

var searchHistory = JSON.parse(localStorage.getItem("citySearch"));
var searchHistoryDiv = document.getElementById('search-history')
searchHistoryDiv.innerHTML = ""
for (i = 0; i < searchHistory.length; i++) {
    console.log(searchHistory[i])
    var cityDivEl = document.createElement("div")
    cityDivEl.setAttribute('data', searchHistory[i])
    cityDivEl.addEventListener('click', function(event){
        console.log(event.target)
        var cityName = event.target.getAttribute('data')
        console.log('city: ' + cityName)
    });
    cityDivEl.innerText = searchHistory[i]
    searchHistoryDiv.appendChild(cityDivEl)
}



searchBtn.addEventListener('click', function (event) {
    console.log('it works')

    var city = document.getElementById('inputValue').value;
    var locationApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
    console.log(locationApiUrl)
    fetch(locationApiUrl)
        .then(response => response.json())
        .then(data => {
            var lat = data[0].lat
            var lon = data[0].lon;
            console.log(lat, lon)
            getWeather(lat, lon);


            citySearch.push(city);
            if (localStorage.getItem("citySearch")) {
                console.log('test')
                var history = JSON.parse(localStorage.getItem("citySearch"));
                history.push(city);
                localStorage.setItem("citySearch", JSON.stringify(history));

            } else {
                localStorage.setItem("citySearch", JSON.stringify(citySearch));
            }

            var searchHistory = JSON.parse(localStorage.getItem("citySearch"));
            var searchHistoryDiv = document.getElementById('search-history')
            searchHistoryDiv.innerHTML = ""
            for (i = 0; i < searchHistory.length; i++) {
                console.log(searchHistory[i])
                var cityDivEl = document.createElement("div")
                cityDivEl.innerText = searchHistory[i]
                searchHistoryDiv.appendChild(cityDivEl)
            }
        })
})

navigator.geolocation.getCurrentPosition((data) => {
    console.log(data);

    var lat = data.coords.latitude;
    var lon = data.coords.longitude;
    getWeather(lat, lon);
})

function getWeather(lat, lon) {


    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            showWeather(data);
        })
}

function showWeather(data) {



    var d = new Date(data.daily[0].dt * 1000);
    var dayName = days[d.getDay()];
    console.log(dayName);
    var dayNameEl = document.getElementById('today');
    dayNameEl.textContent = dayName


    var currentMaxTemp = data.daily[0].temp.max;
    console.log(currentMaxTemp);
    var currentMaxTempEl = document.getElementById('currentMaxTemp');
    currentMaxTempEl.textContent = "Max Temp  " + currentMaxTemp + " °F";
    var currentMinTemp = data.daily[0].temp.min;
    console.log(currentMinTemp);
    var currentMinTempEl = document.getElementById('currentMinTemp');
    currentMinTempEl.textContent = "Min Temp  " + currentMinTemp + " °F";
    var currentWind = data.daily[0].wind_speed;
    console.log(currentWind);
    var currentWindEl = document.getElementById('currentWind');
    currentWindEl.textContent = "Wind Speed  " + currentWind + ' MPH';
    var currentUV = data.daily[0].uvi;
    console.log(currentUV);
    var currentUVEl = document.getElementById('currentUV');
    currentUVEl.textContent = "UVI  " + currentUV;
    var currentIcon = data.daily[0].weather[0].icon;
    console.log(currentIcon);
    currentIconEl = document.getElementById('current-w-icon');



    var d = new Date(data.daily[1].dt * 1000);
    var dayName = days[d.getDay()];
    console.log(dayName);
    var dayNameEl = document.getElementById('day2');
    dayNameEl.textContent = dayName
    var day2MaxTemp = data.daily[1].temp.max;
    console.log(day2MaxTemp);
    var day2MaxTempEl = document.getElementById('day2MaxTemp');
    day2MaxTempEl.textContent = "Max Temp  " + day2MaxTemp + " °F"
    var day2MinTemp = data.daily[1].temp.min;
    console.log(day2MinTemp);
    var day2MinTempEl = document.getElementById('day2MinTemp');
    day2MinTempEl.textContent = "Min Temp  " + day2MinTemp + " °F"
    var day2Wind = data.daily[1].wind_speed;
    console.log(day2Wind);
    var day2WindEl = document.getElementById('day2Wind');
    day2WindEl.textContent = "Wind Speed  " + day2Wind + "  MPH"
    var day2UV = data.daily[1].uvi;
    console.log(day2UV);
    var day2UVEl = document.getElementById('day2UV');
    day2UVEl.textContent = "UVI  " + day2UV
    var day2Icon = data.daily[1].weather[0].icon;
    console.log(day2Icon);


    var d = new Date(data.daily[2].dt * 1000);
    var dayName = days[d.getDay()];
    console.log(dayName);
    var dayNameEl = document.getElementById('day3');
    dayNameEl.textContent = dayName

    var day3MaxTemp = data.daily[2].temp.max;
    console.log(day3MaxTemp);
    var day3MaxTempEl = document.getElementById('day3MaxTemp');
    day3MaxTempEl.textContent = "Max Temp  " + day3MaxTemp + " °F";
    var day3MinTemp = data.daily[2].temp.min;
    console.log(day3MinTemp);
    var day3MinTempEl = document.getElementById('day3MinTemp');
    day3MinTempEl.textContent = "Min Temp  " + day3MinTemp + " °F"
    var day3Wind = data.daily[2].wind_speed;
    console.log(day3Wind);
    var day3WindEl = document.getElementById('day3Wind');
    day3WindEl.textContent = "Wind Speed  " + day3Wind + " MPH"
    var day3UV = data.daily[2].uvi;
    console.log(day3UV);
    var day3UVEl = document.getElementById('day3UV');
    day3UVEl.textContent = "UVI  " + day3UV;
    var day3Icon = data.daily[2].weather[0].icon;
    console.log(day3Icon);


    var d = new Date(data.daily[3].dt * 1000);
    var dayName = days[d.getDay()];
    console.log(dayName);
    var dayNameEl = document.getElementById('day4');
    dayNameEl.textContent = dayName

    var day4MaxTemp = data.daily[3].temp.max;
    console.log(day4MaxTemp);
    var day4MaxTempEl = document.getElementById('day4MaxTemp');
    day4MaxTempEl.textContent = "Max Temp  " + day4MaxTemp + "  °F"
    var day4MinTemp = data.daily[3].temp.min;
    console.log(day4MinTemp);
    var day4MinTempEl = document.getElementById('day4MinTemp');
    day4MinTempEl.textContent = "Min Temp  " + day4MinTemp + "  °F"
    var day4Wind = data.daily[3].wind_speed;
    console.log(day4Wind);
    var day4WindEl = document.getElementById('day4Wind');
    day4WindEl.textContent = "Wind Speed  " + day4Wind + "  MPH"
    var day4UV = data.daily[3].uvi;
    console.log(day4UV);
    var day4UVEl = document.getElementById('day4UV');
    day4UVEl.textContent = "UVI  " + day4UV
    var day4Icon = data.daily[3].weather[0].icon;
    console.log(day4Icon);

    var d = new Date(data.daily[4].dt * 1000);
    var dayName = days[d.getDay()];
    console.log(dayName);
    var dayNameEl = document.getElementById('day5');
    dayNameEl.textContent = dayName


    var day5MaxTemp = data.daily[4].temp.max;
    console.log(day5MaxTemp);
    var day5MaxTempEl = document.getElementById('day5MaxTemp');
    day5MaxTempEl.textContent = "Max Temp  " + day5MaxTemp + "  °F"
    var day5MinTemp = data.daily[4].temp.min;
    console.log(day5MinTemp);
    var day5MinTempEl = document.getElementById('day5MinTemp');
    day5MinTempEl.textContent = "Min Temp  " + day5MinTemp + "  °F"
    var day5Wind = data.daily[4].wind_speed;
    console.log(day5Wind);
    var day5WindEl = document.getElementById('day5Wind');
    day5WindEl.textContent = "Wind Speed  " + day5Wind + "  MPH"
    var day5UV = data.daily[4].uvi;
    console.log(day5UV);
    var day5UVEl = document.getElementById('day5UV');
    day5UVEl.textContent = "UVI  " + day5UV
    var day5Icon = data.daily[4].weather[0].icon;
    console.log(day5Icon);


    var d = new Date(data.daily[5].dt * 1000);
    var dayName = days[d.getDay()];
    console.log(dayName);
    var dayNameEl = document.getElementById('day6');
    dayNameEl.textContent = dayName

    var day6MaxTemp = data.daily[5].temp.max;
    console.log(day6MaxTemp);
    var day6MaxTempEl = document.getElementById('day6MaxTemp');
    day6MaxTempEl.textContent = "Max Temp  " + day6MaxTemp + "  °F"
    var day6MinTemp = data.daily[5].temp.min;
    console.log(day6MinTemp);
    var day6MinTempEl = document.getElementById('day6MinTemp');
    day6MinTempEl.textContent = "Min Temp  " + day6MaxTemp + "  °F"
    var day6Wind = data.daily[5].wind_speed;
    console.log(day6Wind);
    var day6WindEl = document.getElementById('day6Wind');
    day6WindEl.textContent = "Wind Speed  " + day6Wind + "  MPH"
    var day6UV = data.daily[5].uvi;
    console.log(day6UV);
    var day6UVEl = document.getElementById('day6UV');
    day6UVEl.textContent = "UVI  " + day6UV
    var day6Icon = data.daily[5].weather[0].icon;
    console.log(day6Icon);

    if(currentUV >= 0 && currentUV <= 2) {
        //change to green
        currentUVEl.style.backgroundColor = 'green';
    } else if (currentUV > 2 && currentUV <= 5) {
        //change to yellow
        currentUVEl.style.backgroundColor = 'yellow'
    } else if (currentUV > 5 && currentUV <= 7) {
        //change to orange
        currentUVEl.style.backgroundColor = 'orange'
    } else if (currentUV > 7 && currentUV <= 10) {
        //change to red
        currentUVEl.style.backgroundColor = 'red'

    }

}

