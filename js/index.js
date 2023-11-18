let todayName = document.getElementById("todayname")
let todayNumber = document.getElementById("todaynum")
let todayMonth = document.getElementById("todaymonth")
let todayLocation = document.getElementById("location")
let todayTemp = document.getElementById("temp")
let weatherImg = document.getElementById("weatherImg")
let condition = document.getElementById("condition")
let deg = document.getElementById("deg")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")
let nextDay = document.getElementsByClassName("dayaftertomorrow")
let nextMaxTemp = document.getElementsByClassName("dgreeNextdays")
let nextMinTemp = document.getElementsByClassName("minDeg")
let nextConditionImg = document.getElementsByClassName("imgNext")
let nextConditionText = document.getElementsByClassName("nextCondition")
let searchInput = document.getElementById("submit")




  async function getWeatherData(cityName)
{
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d6e0dc5dec1147fab3290952231408&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    

    return weatherData
}

function showDataToday(data){

  let todayDate = new Date()
  todayName.innerHTML = todayDate.toLocaleDateString("en-US" , {weekday:"long"})
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-US" , {month:"long"})
  todayNumber.innerHTML = todayDate.getDate()
todayLocation.innerHTML = data.location.name
todayTemp.innerHTML = data.current.temp_c + "" +` <sup>o</sup> C`
weatherImg.setAttribute("src" , data.current.condition.icon)
condition.innerHTML = data.current.condition.text
deg.innerHTML = data.current.humidity + "%"
wind.innerHTML = data.current.wind_kph+"km/h"
windDirection.innerHTML = data.current.wind_dir
}

function getNextDays(data){
let forecastData = data.forecast.forecastday
for(let i=0; i< 2; i ++){

  let nextDate = new Date(forecastData[i+1].date)
  nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
  nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c + "" +` <sup>o</sup> C`
  nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c + "" +` <sup>o</sup> C`
  nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
  nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
}
}


async function start(city="cairo"){
  let weatherToday= await getWeatherData(city)
  showDataToday(weatherToday)
  getNextDays(weatherToday)
}

start()


searchInput.addEventListener("input" , function(){
  start(searchInput.value)
})