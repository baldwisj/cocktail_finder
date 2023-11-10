const ingredientsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const cocktailsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
const form = document.getElementById('form')
let drinkIds = [] // this is an empty array to store the ids that the function assigns to it later
let drinks; //this need to be global to geth the data for the drink ids to the function that uses it
fetch(ingredientsUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })

fetch(cocktailsUrl) 
    .then(function (response) {
        return response.json();
    })
    .then(function (data2) {
        drinks = data2 //this assigns the data to a global variable.
        drinks = drinks.drinks //this changes the global variable to be an array instead of an object.
    })
function getIds() { // this is the function to get the ids of every cocktail available from the api.
    for (let i = 0; i < drinks.length; i++) {
        drinkIds.push(drinks[i].idDrink)
    }
}

form.addEventListener("submit", function (event) { // this is the submit button for the form with the prevent default already in place.
    event.preventDefault()
})