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
const drinkList = $("#drink-options")
const recipeRender = $('#recipeRender')
recipeIng1 = [];
selectMeasurement = [];
const AllSavedRecipes = localStorage.getItem('savedRecipes')

if (AllSavedRecipes) {
    let prsSavedRecipes = JSON.parse(AllSavedRecipes);
    $.each(prsSavedRecipes, function () {
        const savedRecipeAPI = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + this;
        console.log(prsSavedRecipes)
        console.log(this);

        fetch(savedRecipeAPI)
            .then(function (response) {
                return response.json();
            })
            .then(function (savedData) {
                let savedRecipeData = savedData.drinks[0]
                console.log(savedRecipeData);
                console.log(savedRecipeData.strDrink)

                let listButton = $('<button>');
                listButton.text(savedRecipeData.strDrink);
                listButton.attr("class", "button ring-0");
                drinkList.append(listButton);

                listButton.on('click', function handleSavedRecClick() {
                    drinkSelectId = parseInt(savedRecipeData.idDrink)
                    console.log(savedRecipeData.idDrink);
                    const recipeRenderEl = recipeRender.get(0)
                    while (recipeRenderEl.hasChildNodes()) {
                        recipeRenderEl.removeChild(recipeRenderEl.firstChild);
                    }

                    const imageLink1 = savedRecipeData.strDrinkThumb;
                    const drinkName1 = savedRecipeData.strDrink;
                    const drinkInstructions1 = savedRecipeData.strInstructions;
                    console.log(savedRecipeData.strInstructions)

                    for (let key in savedRecipeData) {
                        if (key.startsWith("strMeasure")) {
                            selectMeasurement.push(savedRecipeData[key]);

                        } else if (key.startsWith("strIngredient")) {
                            recipeIng1.push(savedRecipeData[key]);
                        }

                    }

                    const divEl1 = $('<div>');
                    const drinkImg1 = $('<img>');
                    const drinkH11 = $('<h1>');
                    const instrEl1 = $('<p>');
                    const ingredUlEl1 = $('<ul>');
                    instrEl1.text(drinkInstructions1);
                    drinkH11.text(drinkName1);
                    drinkImg1.attr('src', imageLink1);
                    divEl1.attr('class', 'recipeContainer');
                    recipeRender.append(divEl1);
                    divEl1.append(drinkImg1);
                    divEl1.append(drinkH11);
                    divEl1.append(ingredUlEl1);
                    divEl1.append(instrEl1);
                    divEl1.append(ingredUlEl1)
                    

                    $.each(selectMeasurement, function (index, value) {
                        if (value) {
                            const ingredListItem1 = $('<li>');
                            ingredListItem1.text(selectMeasurement[index] + recipeIng1[index]);
                            ingredUlEl1.append(ingredListItem1);
                            console.log(ingredListItem1.text())
                        };
                    })
                })

            })
    })

};
