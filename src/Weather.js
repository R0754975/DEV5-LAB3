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

            });
    }
}