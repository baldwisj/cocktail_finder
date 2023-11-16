//Save Button

// function save (){
// var item = document.getitem("storeditem");
// localStorage.setItem("storeditem", recipeById);
// document.getElementById("savedtext").innerHTML = recipeById + "saved";

// }

// function get(){
// localStorage.getItem("storeditem");
// document.getElementById("openedtext").innerHTML = storeditem + "OPENED";


// }

let AllSavedRecipes = localStorage.getitem('savedRecipes')
if (AllSavedRecipes) {
let prsSavedRecipes = JSON.parse(AllSavedRecipes);
$.each(prsSavedRecipes, function() {
    const savedRecipeAPI = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + $(this);
    
    fetch(savedRecipeAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (savedData) {
})

});
}