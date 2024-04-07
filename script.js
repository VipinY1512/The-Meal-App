const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeClosebtn = document.querySelector(".recipe-closebtn");

// function to get meals
const fetchRecipes = async (query) => {
    try {
        recipeContainer.innerHTML = "fetching Recipies..."
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `
                      <img src = "${meal.strMealThumb}">
                      <h3> ${meal.strMeal} </h3>
                      <p> <span>${meal.strArea}</span> Dish </p>
                      <p>Belongs to <span>${meal.strCategory} </span></p>
                      `
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            const favoriteButton = document.createElement('button');
            favoriteButton.textContent = "Add to Favorites";
            recipeDiv.appendChild(button);
            recipeDiv.appendChild(favoriteButton);

            // Adding eventlistener to favorite button
            favoriteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                handleFavoriteClick(meal);
            });

            // Adding event Listener to recipe button
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                openRecipePopup(meal);
            });

            // Adding event listener to each recipe div to navigate to a new page
            recipeDiv.addEventListener('click', () => {
                openMealPage(meal.idMeal);
            });
            recipeContainer.appendChild(recipeDiv);
        });
    } catch (e) {
        recipeContainer.textContent = "Meal Not Found!!!";
    }
}
// Function to open a new page with more information about the meal
const openMealPage = (mealID) => {
    window.location.href = `meal-page.html?mealID=${mealID}`;
}

// Function to fetch ingredients and measurments
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`]
        if (ingredient) {
            let measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        } else {
            break;
        }
    }
    console.log(ingredientsList);
    return ingredientsList;

}
// Function to handle Favorite meals 
const handleFavoriteClick = (meal) => {
    // check if favorites array exsist in the localstorage
    let favorites = localStorage.getItem('favorites');
    if (!favorites) {
        favorites = [];
    } else {
        favorites = JSON.parse(favorites);
    }

    // check if the meal is already in the favorites
    let isMealInFavorites = false;
    favorites.forEach(favorite => {
        if (favorite.idMeal === meal.idMeal) {
            isMealInFavorites = true;
        }
    });

    if (!isMealInFavorites) {
        // Add the meal into favorites
        favorites.push(meal);
        // update the localstorage with the new list of favorites
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert("Meal added to favorites! ");
    }
    else {
        alert("Meal is already in favorites! ")
    }
}

// function to openRecipies details 
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
           <h2>${meal.strMeal}</h2>
           <h3>Ingredients: </h3>
           <ul class="ingredientList">${fetchIngredients(meal)}</ul>
           <div class="reciepeInstructions">
               <h3>Instructions: </h3>
               <p>${meal.strInstructions}</p>
           </div>
    `

    recipeDetailsContent.parentElement.style.display = "block";
}
// Addding eventlistener to close Pop up
recipeClosebtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
})

// Function to get search button
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Please type name of the Meal..</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});

// Event Listener to search input as user types
searchBox.addEventListener('input', (e) => {
    const searchInput = e.target.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Please type name of the Meal..</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});





