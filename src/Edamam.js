export default class Edamam {
    constructor(api_key, app_id) {
        this.apiKey = api_key;
        this.appId = app_id;
    }

    getRecipe(query) {
        const url = `https://api.edamam.com/api/recipes/v2/${query}?type=public&app_id=${this.appId}&app_key=${this.apiKey}`;
        const weatherData = JSON.parse(localStorage.getItem('weather'));
        let temp = weatherData.current.temp_c;

        fetch(url)
            .then(response => response.json())
            .then(data => {

                console.log(temp);

                if (temp < 20) {
                    console.log(data);

                    let image = data.recipe.image;
                    
                    let imagedom = document.querySelector(".edamam__image");
                    imagedom.src = image;

                    let imagelink = data.recipe.url;
                    let imagelinkdom = document.querySelector(".edamam__link");
                    imagelinkdom.href = imagelink;


                }
                else {
                    console.log("It's too hot for soup!");
                }

            });
    }

}