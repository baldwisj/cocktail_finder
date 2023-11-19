const drinkList = $("#drink-options")
const recipeRender = $('#recipeRender')
const AllSavedRecipes = localStorage.getItem('savedRecipes')
drinkList.attr('class', '')

if (AllSavedRecipes) {
    let prsSavedRecipes = JSON.parse(AllSavedRecipes);
    //This pulls the saved recipe ids our of local storage and creates elements for each one
    $.each(prsSavedRecipes, function () {
        const savedRecipeAPI = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + this;
        console.log(prsSavedRecipes)
        console.log(this);

        fetch(savedRecipeAPI)
            .then(function (response) {
                return response.json();
            })
            .then(function (savedData) {
                //This takes the saved data and retreives the array value to be disected
                let savedRecipeData = savedData.drinks[0]
                //This creates a recipe button with each drinks name
                let listButton = $('<button>');
                listButton.text(savedRecipeData.strDrink);
                listButton.attr("class", "button ring-0");
                drinkList.append(listButton);
                listButton.attr('class', 'button ring-0 bg-green-400 m-2 p-1 hover: bg-gradient-to-br hover:from-blue-900 hover:to-green-400 hover:text-white rounded-lg')

                //This is the event listener for each recipe button. This will remove any children aleady rendered and replace them.
                listButton.on('click', function handleSavedRecClick() {
                    drinkSelectId = parseInt(savedRecipeData.idDrink)
                    console.log(savedRecipeData.idDrink);
                    const recipeRenderEl = recipeRender.get(0)

                    while (recipeRenderEl.hasChildNodes()) {
                        recipeRenderEl.removeChild(recipeRenderEl.firstChild);

                    }
                    recipeIng1 = [];
                    selectMeasurement = [];

                    //This creates new recipe elements
                    const imageLink1 = savedRecipeData.strDrinkThumb;
                    const drinkName1 = savedRecipeData.strDrink;
                    const drinkInstructions1 = savedRecipeData.strInstructions;
                    console.log(savedRecipeData.strInstructions)

                    //The following for loop searches the api data for the given key words and assigns them to the appropriate variable
                    for (let key in savedRecipeData) {
                        if (key.startsWith("strMeasure")) {
                            selectMeasurement.push(savedRecipeData[key]);

                        } else if (key.startsWith("strIngredient")) {
                            recipeIng1.push(savedRecipeData[key]);
                        }

                    }

                    //The following code creates the various elements for rendering the recipe
                    const divElCont = $('<div>');
                    const divEl1 = $('<div>');
                    const divEl2 = $('<div>');
                    const drinkImg1 = $('<img>');
                    const drinkH11 = $('<h1>');
                    const instrEl1 = $('<p>');
                    const ingredUlEl1 = $('<ul>');
                    instrEl1.text(drinkInstructions1);
                    drinkH11.text(drinkName1);
                    drinkH11.attr('class', 'bg-purple-400 font-bold text-xl text-white')
                    drinkImg1.attr('src', imageLink1);
                    ingredUlEl1.attr('class', 'content-center m-6');
                    instrEl1.attr('class', 'm-6')
                    divEl1.attr('class', 'inline-block w-1/2');
                    divEl1.attr('class', 'inline-block w-1/2');
                    divElCont.attr('class', 'space-x-3 flex flex-row mt-6');
                    recipeRender.append(drinkH11);
                    recipeRender.append(divElCont);
                    divElCont.append(divEl1);
                    divElCont.append(divEl2);
                    divEl1.append(drinkImg1);
                    divEl2.append(ingredUlEl1);
                    divEl2.append(instrEl1);

                    //The following creates a line item for each ingredient and appends it to the ul element
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
