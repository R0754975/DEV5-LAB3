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

}