//Save Button

function save (){
var item = document.getitem("storeditem");
localStorage.setItem("storeditem", recipeById);
document.getElementById("savedtext").innerHTML = recipeById + "saved";

}

function get(){
localStorage.getItem("storeditem");
document.getElementById("openedtext").innerHTML = storeditem + "OPENED";


}