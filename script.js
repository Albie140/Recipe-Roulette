

// $(document).ready() makes the function available once the document is loaded.


$(document).ready(function () {
    console.log("I'm ready..");


    // id information and API key declared as global variable (required for use by developer.edamam.com)


    var edamamId = "9f4f3487"
    var edamamKey = "8e2d662eda8d8f1307f21875dbd2373b"


    // this is the search button on.("click") feature that triggers mealSearchResults function
    // when the user clicks search after inputing their query, this kicks it all off..


    $("#meal-search-button").on("click", mealSearchResults);


    // mealSearchResults is triggered by the search button click
    // this takes the users search input and passes it along.. 
    // .. in the form of mealSearchInput variable and gives it to the API call.  
    // this also calls on the randomDrinkOption API call function to generate
    // there is also a scrollIntoView being executed so after clicking the page..
    //.. will auto scroll into view.

    function mealSearchResults(event) {

        event.preventDefault();

        var mealSearchInput = $("#mealSearchInput").val();
        console.log(mealSearchInput);

        getMealRecipe(mealSearchInput);
        randomDrinkOption();

        document.querySelector("#bottom").scrollIntoView();
    }


    // checkMealRecipe function has been given the users search criteria..
    // ..by the searchResults function, and it will now call on the edamam api..
    // HTML elements are created by pre-set id's within DIV's on index.html
    // information paths within the JSON information displays the text we want.
    // edamam is layed out pretty nicely and it is fairly cut and dry to obtain this.

    function getMealRecipe(mealSearchInput) {


        var queryURL = `https://api.edamam.com/search?q=${mealSearchInput}&app_id=${edamamId}&app_key=${edamamKey}`


        $.ajax({
            url: queryURL,
            method: "GET"

        })

            .then(function (data) {

                console.log(data);

                $("#recipeCardHeader").html("<h3 " + "class='uk-card-title'" + ">" + "HERE'S A RECIPE:" + "</h3>");

                $("#recipeTitle").html("<h4>" + data.hits[0].recipe.label + "</h4>");

                $("#recipeImage").html("<img " + "style= 'width: 700px' " + "src=" + data.hits[0].recipe.image + ">");

                $("#recipeIngredientsLabel").html("<p>" + "INGREDIENTS:" + "</p>");

                $("#recipeIngredients").html("<p>" + data.hits[0].recipe.ingredientLines + "</p>");

                $("#recipeLinkLabel").html("<p>" + "RECIPE LINK:" + "</p>");

                $("#recipeLink").html("<p>" + "<a href=" + data.hits[0].recipe.url + " target=_'blank' " + ">" + "CLICK HERE TO VIEW THE ENTIRE RECIPE" + "</a>" + "</p>");

                console.log(data.hits[0].recipe.url);


            });


    };



    // a random cocktail selection will be provided along side of the users generated recipe.
    // the cockatailDB random cocktail api is being called on below.
    // HTML elements are created by pre-set id's within DIV's on index.html
    // information paths within the JSON information displays the text we want.
    // unfortunately this API is a personal project and has many blank fields..
    // .. that display results of "null".. we don't want this printed on the page..
    // .. so a .forEach() work around was implemented to check each entry in the api..
    // .. if null is displayed, it is left alone and the next entry is checked.
    // we then use .empty() to clear this information upon the next search, and so on..


    function randomDrinkOption() {


        $("#drinkIngredients span").empty();
        $("#drinkInstructions span").empty();


        var queryURL = `https://www.thecocktaildb.com/api/json/v1/1/random.php`


        $.ajax({
            url: queryURL,
            method: "GET"

        })

            .then(function (response) {

                console.log(response);

                $("#drinkCardHeader").html("<h3 " + "class='uk-card-title'" + ">" + "+ A RANDOM DRINK:" + "</h3>");

                $("#drinkIngredientsLabel").html("<p>" + "INGREDIENTS:" + "</p>");

                $("#drinkInstructionsLabel").html("<p>" + "INSTRUCTIONS:" + "</p>");

                let drink_obj = { ingredients: [] }
                let chosen = response.drinks[0];
                drink_obj.instructions = chosen.strInstructions.split(".")
                drink_obj.title = chosen.strDrink
                drink_obj.thumb = chosen.strDrinkThumb
                Object.keys(chosen).forEach((key, index) => {
                    if (chosen[key] != null) {
                        let new_obj = {}

                        // check to see if key contains the word ingredient..

                        if (key.includes("Ingredient")) {
                            new_obj["name"] = chosen[key]
                            new_obj["measure"] = chosen[`strMeasure${key.charAt(key.length - 1)}`] || ""
                            drink_obj.ingredients.push(new_obj)
                        }
                    }
                })

                console.log(drink_obj)

                $("#drinkTitle").html("<h4>" + drink_obj.title + "</h4>");

                $("#drinkImage").html("<img src=" + drink_obj.thumb + ">");

                drink_obj.ingredients.forEach(item => {
                    $("#drinkIngredients span").append(` ${item.name} ${item.measure}`);
                })

                drink_obj.instructions.forEach(inst => {
                    $("#drinkInstructions span").append(`<p>${inst}</p>`);
                });


            });

    };


});



























// option that we moved on past for drink search input

//   var queryURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkSearchInput}`