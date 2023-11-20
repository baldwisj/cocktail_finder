const ingredientsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const cocktailsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
const drinkList = document.getElementById("drink-options")
const form = document.getElementById('form');
const searchChx = $("#searchChx");
const randSrchBtn = $('#randomSearchBtn');
let drinkIds = []; // this is an empty array to store the ids that the function assigns to it later
let ingredients = []; //// this is an empty array to store the ingredients that the function assigns to it later
let ingr; //this need to be global to get the data for the drink ingredients to the function that uses it
let drinks; //this need to be global to get the data for the drink ids to the function that uses it
let ingredientsIds = []; //this is all the ids of every cocktail
let randomDrink = [];


function startFunction() {
    localStorage.removeItem('selectedDrinkId');
    localStorage.removeItem('randomId');
};
startFunction();


fetch(ingredientsUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        ingr = data; //this assigns the data to a global variable.
        ingredients = ingr.drinks; //this creates an array from all the elements from the drink lable in the data object
        console.log(ingredients);
        const getSelectedOptions = $('#searchBtn')
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
    
        });

        //This adds the click function for the search button
        $(document).ready(function () {
            (getSelectedOptions).click(function () {
                let selectedOptions = [];

                //This iterates through each checkbox and determines if they are checked
                $('input[type="checkbox"]').each(function () {
                    if ($(this).is(':checked')) {
                        let checkboxId = $(this).attr('id');
                        selectedOptions.push(checkboxId);//This pushes the ingredient ids to the selectedOptions array
                    }
                });
                const ChosenIngredientsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + selectedOptions //this give the option to the api address
                if (selectedOptions == false){ //this determins if no checkboxes are checked. later we can display a message to please select an ingredient
                    return
                }
                fetch(ChosenIngredientsUrl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data3) {
                        let drinkOptions = data3 //this array of objects whos labels are the drink ids and names 
                        drinkOptions = drinkOptions.drinks //this saves just the array we need so we dont deal with an object with an array inside it
                        while (drinkList.hasChildNodes()) {//this removes all the options from an old search and gives a clean start to the selection box
                           drinkList.removeChild(drinkList.firstChild);
                        }
                        for (let i = 0; i < drinkOptions.length; i++) {//this displays to the user the drinks that have the selected ingredient in them
                            const button = document.createElement("button");
                            button.textContent = drinkOptions[i].strDrink
                            button.setAttribute("class", "button ring-0")
                            drinkList.appendChild(button)
                            button.addEventListener('click', function () {
                                console.log(drinkOptions[i].idDrink)
                                drinkSelectId = parseInt(drinkOptions[i].idDrink)
                                console.log(drinkSelectId);
                                localStorage.setItem('selectedDrinkId', drinkSelectId);
                                window.location.href = './recipe.html'
                                // this is where the code to pull us to the other page needs to go. the console log above is the selector for the ids
                            })
                        }
                    })
            });
            //This function only runs if the HTML is fully loaded
            $(document).ready(function () {
                const checkboxes = $('input[type="checkbox"]');
                //This function initiates when a checkbox in selected
                checkboxes.on('change', function () {
                    let eachChxBx = $(this);
                    //The following if function determines if each checkbox has teh checked property
                    if (eachChxBx.prop('checked')) {
                        $.each(checkboxes, function (index, checkbox) {
                            if (checkbox !== eachChxBx[0]) { //If the checked-checkbox isn't the interated box then it will be disabled
                                $(checkbox).prop('disabled', true);
                                $(checkbox).prop('checked', false)
                            };
                        });
                    } else {
                        $.each(checkboxes, function (index, checkbox) {
                            $(checkbox).prop('disabled', false);
                        });
                    }
                });

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


        //The following code generates a random drink recipe and grabs its id
        function handleRandClick() {
            randomDrink = drinks[Math.floor(Math.random() * drinks.length)]
            let randomDrinkId = parseInt(randomDrink.idDrink);
            localStorage.setItem('randomId', randomDrinkId);
            window.location.href = './recipe.html'
        };
        randSrchBtn.on('click', handleRandClick);
    });

  
function getIds() { // this is the function to get the ids of every cocktail available from the api.
    for (let i = 0; i < drinks.length; i++) {
        drinkIds.push(drinks[i].idDrink)
    }
}
 


