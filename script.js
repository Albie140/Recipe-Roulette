var edamamId = "9f4f3487"
var edamamKey = "8e2d662eda8d8f1307f21875dbd2373b"


// $("#meal-search-button").on("click", mealSearchResults);


// function mealSearchResults(event) {

//     event.preventDefault();

//     mealSearchInput = $("#mealSearchInput").val();
//     console.log(mealSearchInput);



//     getMealRecipe(mealSearchInput);

// }


// checkCMealRecipe function has been given the users search criteria..
// ..by the searchResults function, and it will now call on the openweathermap api..

// function checkMealRecipe() {

var mealSearchInput = "chicken";

    var queryURL = `https://api.edamam.com/search?q=${mealSearchInput}&app_id=${edamamId}&app_key=${edamamKey}`



    $.ajax({
        url: queryURL,
        method: "GET"

    })

        .then(function (data) {

            console.log(data);

        });


// };



// $("#drink-search-button").on("click", drinkSearchResults);


// function drinkSearchResults(event) {

//     event.preventDefault();

//     drinkSearchInput = $("#drinkSearchInput").val();
//     console.log(drinkSearchInput);



//     checkDrinkRecipe(drinkSearchInput);

// }


// checkCMealRecipe function has been given the users search criteria..
// ..by the searchResults function, and it will now call on the openweathermap api..



// function check

var drinkSearchInput = "smoothie";

    var queryURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkSearchInput}`


    $.ajax({
        url: queryURL,
        method: "GET"

    })

        .then(function (data) {

            console.log(data);

        });


// };