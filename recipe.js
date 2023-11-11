const randomJokeApi = 'https://geek-jokes.sameerkumar.website/api?format=json'
let randomJoke;
let joke = [];
let recipe;
let recipeById = [];
let measurement = [];
let recipeIng = [];
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

            //This following code checks to make sure there is a value to grab from localstorage for the randome recipe id
            //if there isn't this function will not run
            if (randomDrinkId) {

                //The following variables take values from the array that was extracted from the object
                const imageLink = recipeById[0].strDrinkThumb;
                const drinkName = recipeById[0].strDrink;
                const drinkInstructions = recipeById[0].strInstructions;
                console.log(imageLink)
                //The following for loop grabs all the values in the array with the specified keys
                for (let key in recipeById[0]) {
                    if (key.startsWith("strMeasure")) {
                        measurement.push(recipeById[0][key]);

                    } else if (key.startsWith("strIngredient")) {
                        recipeIng.push(recipeById[0][key]);
                    }

                }

                //This will create and append the elements to render the random recipe on the page
                const divEl = $('<div>');
                const drinkImg = $('<img>');
                const drinkH1 = $('<h1>');
                const instrEl = $('<p>');
                const ingredUlEl = $('<ul>')
                instrEl.text(drinkInstructions);
                drinkH1.text(drinkName);
                drinkImg.attr('src', imageLink);
                divEl.attr('class', 'recipeContainer');
                mainContainer.append(divEl);
                divEl.append(drinkImg);
                divEl.append(drinkH1);
                divEl.append(ingredUlEl);
                divEl.append(instrEl);
                divEl.append(ingredUlEl)

                //This function creates a list item for each ingredient and appends it to the list
                $.each(measurement, function (index, value) {
                    if (value) {
                        const ingredListItem = $('<li>');
                        ingredListItem.text(measurement[index] + recipeIng[index]);
                        ingredUlEl.append(ingredListItem);
                        console.log(ingredListItem.text())
                    };
                })


                console.log(recipeIng)

            }

        });



}
getRecipeById();