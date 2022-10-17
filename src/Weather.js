import Edamam from './Edamam';

const edamam = new Edamam("c8df7e6609724fa671ed4c1d44b2b4a7", "26d9a8b7");

export default class Weather {
    constructor(api_key) {
        this.apiKey = api_key;

        // check if weather data is in localstorage
        // check if timestamp from localstorage is older than 10 minutes

        if (localStorage.getItem('weather') && Date.now() - localStorage.getItem('timestamp') < 600000 // 10 minutes
        ) {
        // get data from localstorage
            const weatherData = JSON.parse(localStorage.getItem('weather'));
        } else {
            this.getLocation();
        }
    }
   
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    getWeather(position) {
        console.log(position);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${lat},${lon}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                
                // save to localstorage
                localStorage.setItem('weather', JSON.stringify(data));
                // save timestamp
                localStorage.setItem('weather_timestamp', Date.now()); // Date.now() returns the number of milliseconds since January 1, 1970 00:00:00 UTC.

                let temp = data.current.temp_c;
                let edamamText = document.querySelector(".edamam__text");

                if(temp < 0) {
                    edamam.getRecipe("08ec480fab2bc79530c47ae3d8f4269b");
                    edamamText.innerHTML = "Brrrr! It's really cold outside. Here's a recipe for a hot drink.";
                  }
                  else if(temp < 10) {
                    edamam.getRecipe("b373d8987afb5808439ff243c16ccb63");
                    edamamText.innerHTML = "It's pretty cold outside. Here's a recipe for some soup.";
                  }
                  else if(temp < 20) {
                    edamam.getRecipe("b79327d05b8e5b838ad6cfd9576b30b6");
                    edamamText.innerHTML = "It's an oke temperature outside. Have some chicken.";
                  }
                  else if(temp < 30) {
                    edamam.getRecipe("b20815eac65ee2fa5f848f56c16056dd");
                    edamamText.innerHTML = "It's hot outside. Let's keep it cool and just have a salad.";
                  }
                  else if(temp < 40) {
                    edamam.getRecipe("480fd56ab4d71c204c2b75e16edbbd21");
                    edamamText.innerHTML = "It's really hot outside. Here's a recipe for some frozen treats.";
                  }



            });
    }
}