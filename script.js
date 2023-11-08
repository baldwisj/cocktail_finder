const requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    }) 