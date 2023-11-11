const ingredientsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const cocktailsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
const form = document.getElementById('form');
const searchChx = $("#searchChx");
let drinkIds = []; // this is an empty array to store the ids that the function assigns to it later
let ingredients = []; //// this is an empty array to store the ingredients that the function assigns to it later
let ingr; //this need to be global to get the data for the drink ingredients to the function that uses it
let drinks; //this need to be global to get the data for the drink ids to the function that uses it
let ingredientsIds = []
let randomDrink = [];

fetch(ingredientsUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        ingr = data; //this assigns the data to a global variable.
        ingredients = ingr.drinks; //this creates an array from all the elements from the drink lable in the data object
        console.log(ingredients);
        $.each(ingredients, function (_, item) { //this each function creates a loop through each item in the ingredients array
            //the code below creates a check button for each ingredient in the API and creates a unique id for each input element
            const id = item.strIngredient1;
            ingredientsIds.push(id);
            const liEl = $('<li>');
            const divEl = $('<div>');
            const chxBx = $('<input>');
            const ingredientBx = $(`<label>`);
            searchChx.append(liEl);
            liEl.append(divEl);
            divEl.append(chxBx);
            divEl.append(ingredientBx);
            divEl.attr('class', "flex items-center pl-3");
            chxBx.attr('class', 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500');
            chxBx.attr('type', 'checkbox');
            chxBx.attr('value', "");
            chxBx.attr('id', id);
            ingredientBx.attr("for", id);
            ingredientBx.attr('class', 'w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300');
            ingredientBx.text(item.strIngredient1);
            console.log(ingredientBx);



        });
        const getSelectedOptions = $('#searchBtn')
        $(document).ready(function () {
            (getSelectedOptions).click(function () {
                let selectedOptions = [];

                $('input[type="checkbox"]').each(function () {
                    if ($(this).is(':checked')) {
                        let checkboxId = $(this).attr('id');
                        selectedOptions.push(checkboxId);
                    }
                });

                console.log(selectedOptions);
            });
        });

    });


fetch(cocktailsUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data2) {
        drinks = data2 //this assigns the data to a global variable.
        drinks = drinks.drinks //this changes the global variable to be an array instead of an object.
        console.log(drinks);

        //The following code generates a random drink recipe and grabs its id
        randomDrink = drinks[Math.floor(Math.random() * drinks.length)]
        let randomDrinkId = parseInt(randomDrink.idDrink);
        console.log(randomDrink)
        console.log(randomDrinkId);
        localStorage.setItem('randomId', randomDrinkId);
    })

function getIds() { // this is the function to get the ids of every cocktail available from the api.
    for (let i = 0; i < drinks.length; i++) {
        drinkIds.push(drinks[i].idDrink)
    }
}

form.addEventListener("submit", function (event) { // this is the submit button for the form with the prevent default already in place.
    event.preventDefault()
})
