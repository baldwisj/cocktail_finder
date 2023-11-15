const randomJokeApi = 'https://geek-jokes.sameerkumar.website/api?format=json'
let randomJoke;
let joke = [];
let recipe;
let recipe1;
let recipeById = [];
let selectedRecipeId = [];
let selectMeasurement = [];
let measurement = [];
let recipeIng = [];
let recipeIng1 = []
const mainContainer = $('#container');

//The following code grabs a random joke from the API and renders it to the page
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
function getSelectedRecipeById() {
    const selectedDrinkId = localStorage.getItem('selectedDrinkId')
    console.log(selectedDrinkId);
    const selectedRecipeIdApi = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + selectedDrinkId;

  

    
    fetch(selectedRecipeIdApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (recipeData1) {
            recipe1 = recipeData1;
            selectedRecipeId = recipe1.drinks;
            console.log(selectedRecipeId)

            //This following code checks to make sure there is a value to grab from localstorage for the randome recipe id
            //if there isn't this function will not run
            if (selectedDrinkId) {

                //The following variables take values from the array that was extracted from the object
                const imageLink1 = selectedRecipeId[0].strDrinkThumb;
                const drinkName1 = selectedRecipeId[0].strDrink;
                const drinkInstructions1 = selectedRecipeId[0].strInstructions;
                console.log(imageLink1)
                //The following for loop grabs all the values in the array with the specified keys
                for (let key in selectedRecipeId[0]) {
                    if (key.startsWith("strMeasure")) {
                        selectMeasurement.push(selectedRecipeId[0][key]);

                    } else if (key.startsWith("strIngredient")) {
                        recipeIng1.push(selectedRecipeId[0][key]);
                    }

                }

                //This will create and append the elements to render the random recipe on the page
                const divEl1 = $('<div>');
                const drinkImg1 = $('<img>');
                const drinkH11 = $('<h1>');
                const instrEl1 = $('<p>');
                const ingredUlEl1 = $('<ul>')
                instrEl1.text(drinkInstructions1);
                drinkH11.text(drinkName1);
                drinkImg1.attr('src', imageLink1);
                divEl1.attr('class', 'recipeContainer');
                mainContainer.append(divEl1);
                divEl1.append(drinkImg1);
                divEl1.append(drinkH11);
                divEl1.append(ingredUlEl1);
                divEl1.append(instrEl1);
                divEl1.append(ingredUlEl1)

                //This function creates a list item for each ingredient and appends it to the list
                $.each(selectMeasurement, function (index, value) {
                    if (value) {
                        const ingredListItem1 = $('<li>');
                        ingredListItem1.text(selectMeasurement[index] + recipeIng1[index]);
                        ingredUlEl1.append(ingredListItem1);
                        console.log(ingredListItem1.text())
                    };
                })


                console.log(recipeIng1)

            }

        });

}
getSelectedRecipeById()



//The following function takes the id from the previous page and grabs the corresponding recipe
function getRandomRecipeById() {
    const randomDrinkId = localStorage.getItem('randomId');
    console.log(randomDrinkId);
    const randRecipeIdApi = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + randomDrinkId;

    
    fetch(randRecipeIdApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (recipeData2) {
            recipe2 = recipeData2;
            randRecipeById = recipe2.drinks;
            console.log(randRecipeById)

            //This following code checks to make sure there is a value to grab from localstorage for the randome recipe id
            //if there isn't this function will not run
            if (randomDrinkId) {

                //The following variables take values from the array that was extracted from the object
                const imageLink = randRecipeById[0].strDrinkThumb;
                const drinkName = randRecipeById[0].strDrink;
                const drinkInstructions = randRecipeById[0].strInstructions;
                console.log(imageLink)
                //The following for loop grabs all the values in the array with the specified keys
                for (let key in randRecipeById[0]) {
                    if (key.startsWith("strMeasure")) {
                        measurement.push(randRecipeById[0][key]);

                    } else if (key.startsWith("strIngredient")) {
                        recipeIng.push(randRecipeById[0][key]);
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

               //this function stores in local stoarge
               function display () {
               localStorage.setItem("Recipe", recipe);
               console.log(localStorage.getItem(recipeById));
               localStorage.getItem(recipeById)
            }



                console.log(recipeIng)

            }

        });



}
getRandomRecipeById();