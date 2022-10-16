export default class Weather {
    constructor(api_key) {
        this.apiKey = api_key;

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