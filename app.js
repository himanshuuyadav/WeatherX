const urlCurr = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const apiKey = "c5432546b01bbe762cd776aac4e25d9d"

const searchBox = document.querySelector(`#search`);

const searchBtn = document.querySelector(`#search-btn`);

async function getWeather(city) {
    const response = await fetch(urlCurr + city + `&appid=${apiKey}`)

    var data = await response.json();

    document.querySelector(`#card-city`).innerHTML = data['name'];

    let temp = data[`main`]['temp'];
    temp = Math.round(temp);

    document.querySelector(`#temp-info`).innerHTML = temp + "°C";

    let feels_like = data[`main`]['feels_like'];
    feels_like = Math.round(feels_like);

    document.querySelector(`.feels-like`).innerHTML = "Feels like " + feels_like + "°C" + "<br>" + "Temperature is " + temp + "°C";

    document.querySelector(`#humid-info`).innerHTML = data[`main`]['humidity'] + "%";

    let wind = data[`wind`]['speed'];
    wind = Math.round(wind);

    document.querySelector(`#wind-info`).innerHTML = wind + " Km/hr";

    document.querySelector(`.humid-extra`).innerHTML = "Pressure is " + data[`main`][`pressure`] + " hPa" + "<br>" + "Humidity is " + data[`main`][`humidity`] + "%";

    let sunrise = data[`sys`]['sunrise'];
    let sunset = data[`sys`]['sunset'];

    let date = new Date(sunrise * 1000);
    let date1 = new Date(sunset * 1000);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let hours1 = date1.getHours();
    let minutes1 = date1.getMinutes();

    minutes = minutes < 10 ? '0' + minutes : minutes;
    minutes1 = minutes1 < 10 ? '0' + minutes1 : minutes1;

    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    let formattedTime = hours + ':' + minutes;

    let period1 = hours1 >= 12 ? 'PM' : 'AM';
    hours1 = hours1 % 12 || 12; 
    let formattedTime1 = hours1 + ':' + minutes1;

    document.querySelector(`.wind-extra`).innerHTML = `Sunrise at ` + formattedTime + " " + period + "<br>" + `Sunset at ` + formattedTime1 + " " + period1;
}
searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value);
});

searchBox.addEventListener(`keypress`, () => {
    if (event.key === "Enter") {
        getWeather(searchBox.value);
    }
})
