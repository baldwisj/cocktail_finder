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
let recipeIng1 = [];
let savedRecipes = [];
const mainContainer = $('#container');
const footer = $('footer');
mainContainer.attr('class', 'text-center m-3');
footer.attr('class', 'text-center h-12 bg-green-400 pt-5 pb-5 text-white mt-5')



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
                const divRec = $('<div>');
                const divEl11 = $('<div>');
                const divEl21 = $('<div>');
                const drinkImg1 = $('<img>');
                const drinkH11 = $('<h1>');
                const instrEl1 = $('<p>');
                const ingredUlEl1 = $('<ul>');
                const srchSvBtn = $('<button>');
                divRec.attr('class','space-x-3 flex flex-row mt-6')
                ingredUlEl1.attr('class','content-center m-6')
                instrEl1.attr('class','m-6')
                instrEl1.text(drinkInstructions1);
                drinkH11.text(drinkName1);
                drinkH11.attr('class', 'font-bold text-2xl w-full mt-6')
                drinkImg1.attr('src', imageLink1);
                drinkImg1.attr('class', ' w-100 m-5');
                divEl11.attr('class', 'inline-block w-4/12');
                divEl21.attr('class', 'inline-block w-8/12')
                srchSvBtn.attr('class', "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2")
                srchSvBtn.text('Save Recipe');
                srchSvBtn.attr('id', 'saveSearch')
                mainContainer.append(drinkH11);
                mainContainer.append(divRec);
                divRec.append(divEl11);
                divRec.append(divEl21);
                divEl11.append(drinkImg1);
                divEl21.append(ingredUlEl1);
                divEl21.append(instrEl1);
                divEl21.append(srchSvBtn);

                //This function creates a list item for each ingredient and appends it to the list
                $.each(selectMeasurement, function (index, value) {
                    if (value) {
                        const ingredListItem1 = $('<li>');
                        ingredListItem1.text(selectMeasurement[index] + recipeIng1[index]);
                        ingredUlEl1.append(ingredListItem1);
                        console.log(ingredListItem1.text())
                    };
                })
                const savedSearch = $('#saveSearch');
                function handleSaveRecipe() {
                    let allSavedRecipes = localStorage.getItem('savedRecipes');
                    if (allSavedRecipes) {
                        savedRecipes = JSON.parse(allSavedRecipes);
                    }
                    if (allSavedRecipes && allSavedRecipes.includes(selectedDrinkId)) {
                        const recipeExistingSave = $('<p>');
                        divEl21.append(recipeExistingSave);
                        recipeExistingSave.text('Recipe Already Saved');
                        recipeExistingSave.attr('class','italic font-light text-purple-900')
                    } else {
                        savedRecipes.push(selectedDrinkId);
                        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
                        const recipeSvdMessage = $('<p>');
                        divEl21.append(recipeSvdMessage);
                        recipeSvdMessage.text('Recipe Saved');
                        recipeSvdMessage.attr('class', 'italic font-light text-purple-900');
                    };
                };
                savedSearch.on('click', handleSaveRecipe);

                //The following code grabs a random joke from the API and renders it to the page
                fetch(randomJokeApi)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (jokeData) {
                        randomJoke = jokeData;
                        joke = randomJoke.joke;
                        const pEl = $('<p>').text(joke);
                        footer.append(pEl);
                    });

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
                const divRec2 = $('<div>');
                const divEl = $('<div>');
                const divEl2 = $('<div>');
                const drinkImg = $('<img>');
                const drinkH1 = $('<h1>');
                const instrEl = $('<p>');
                const ingredUlEl = $('<ul>');
                const randSvBtn = $('<button>');
                divRec2.attr('class','space-x-3 flex flex-row mt-6')
                ingredUlEl.attr('class','content-center m-6')
                instrEl.attr('class','m-6')
                instrEl.text(drinkInstructions);
                drinkH1.text(drinkName);
                drinkH1.attr('class', 'font-bold text-2xl w-full mt-6')
                drinkImg.attr('src', imageLink);
                drinkImg.attr('class', ' w-100 m-5');
                divEl.attr('class', 'inline-block w-4/12');
                divEl2.attr('class', 'inline-block w-8/12')
                randSvBtn.attr('class', "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2")
                randSvBtn.text('Save Recipe');
                randSvBtn.attr('id', 'saveRand');
                mainContainer.append(drinkH1);
                mainContainer.append(divRec2);
                divRec2.append(divEl);
                divRec2.append(divEl2);
                divEl.append(drinkImg);
                divEl2.append(ingredUlEl);
                divEl2.append(instrEl);
                divEl2.append(randSvBtn);

                //This function creates a list item for each ingredient and appends it to the list
                $.each(measurement, function (index, value) {
                    if (value) {
                        const ingredListItem = $('<li>');
                        ingredListItem.text(measurement[index] + recipeIng[index]);
                        ingredUlEl.append(ingredListItem);
                        console.log(ingredListItem.text())
                    };
                })
                const randSearch = $('#saveRand');
                function handleSaveRecipe2() {
                    let allSavedRecipes = localStorage.getItem('savedRecipes');
                    if (allSavedRecipes) {
                        savedRecipes = JSON.parse(allSavedRecipes);
                    }
                    if (allSavedRecipes && allSavedRecipes.includes(randomDrinkId)) {
                        const recipeExistingSave = $('<p>');
                        divEl2.append(recipeExistingSave);
                        recipeExistingSave.text('Recipe Already Saved');
                        recipeExistingSave.attr('class','italic font-light text-purple-900')
                    } else {
                        savedRecipes.push(randomDrinkId);
                        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
                        const recipeSvdMessage = $('<p>');
                        divEl2.append(recipeSvdMessage);
                        recipeSvdMessage.text('Recipe Saved');
                        recipeSvdMessage.attr('class', 'italic font-light text-purple-900');
                    };
                };
                randSearch.on('click', handleSaveRecipe2);



                //The following code grabs a random joke from the API and renders it to the page
                fetch(randomJokeApi)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (jokeData) {
                        randomJoke = jokeData;
                        joke = randomJoke.joke;
                        const pEl = $('<p>').text(joke);
                        footer.append(pEl);
                    });

            }

        });



}
getRandomRecipeById();