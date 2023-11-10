const randomJokeApi = 'https://geek-jokes.sameerkumar.website/api?format=json'
let randomJoke;
let joke = [];
let recipe;
let recipeById = [];
const mainContainer = $('#container');

//the followind fetch grabs the info from the API, creates an element and renders the API text in the new element
fetch(randomJokeApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (jokeData) {
        randomJoke = jokeData;
        joke = randomJoke.joke;
        const pEl = $('<p>').text(joke);
        mainContainer.append(pEl);
    });

//The following function takes the id from the previous page and grabs the corresponding recipe
function getRecipeById() {
    const randomDrinkId = localStorage.getItem('randomId');
    console.log(randomDrinkId);
    const recipeIdApi = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + randomDrinkId;

    //The following code grabs a random joke from the API and renders it to the page
    fetch(recipeIdApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (recipeData) {
            recipe = recipeData;
            recipeById = recipe.drinks;
            console.log(recipeById)
        });
}