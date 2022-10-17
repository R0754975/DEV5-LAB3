export default class Edamam {
    constructor(api_key, app_id) {
        this.apiKey = api_key;
        this.appId = app_id;
    }

    getRecipe(query) {
        const url = `https://api.edamam.com/api/recipes/v2/${query}?type=public&app_id=${this.appId}&app_key=${this.apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {

                let image = data.recipe.image;
                let imagelink = data.recipe.url;
                let title = data.recipe.label;
                this.displayRecipe(image, imagelink, title);

            });
    }

    displayRecipe(image, imagelink, title) {

        let imagedom = document.querySelector(".edamam__image");
        imagedom.src = image;
        let imagelinkdom = document.querySelector(".edamam__link");
        imagelinkdom.href = imagelink;
        let titledom = document.querySelector(".edamam__title");
        titledom.innerHTML = title;
    }

}