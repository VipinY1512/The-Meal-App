
// 
let favoriteMeals = JSON.parse(localStorage.getItem("favorites")) || [];
const favoriteMealsContainer = document.querySelector(".favorite-meals-container");

const renderFavoriteMeals = () => {
    const favoriteMealsContainer = document.querySelector(".favorite-meals-container");
    favoriteMealsContainer.innerHTML = "";
    favoriteMeals.forEach(meal => {
        const favoriteMealDiv = document.createElement("div");
        favoriteMealDiv.classList.add("favorite-meal");
        favoriteMealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <button class="remove-favorite-btn">Remove from Favorites</button>
        `;
        favoriteMealDiv.querySelector(".remove-favorite-btn").addEventListener("click", () => {
            removeFavoriteMeal(meal);
            alert(`${meal.strMeal} is Removed From Favorites `)
        });
        favoriteMealsContainer.appendChild(favoriteMealDiv);
    });
};



const saveFavoriteMealsToLocalStorage = () => {
    localStorage.setItem("favorites", JSON.stringify(favoriteMeals));
};

// Function to remove a meal from favorites
const removeFavoriteMeal = (mealToRemove) => {
    favoriteMeals = favoriteMeals.filter(meal => meal.idMeal !== mealToRemove.idMeal);
    saveFavoriteMealsToLocalStorage();
    renderFavoriteMeals();
};

// Initial render of favorite meals
renderFavoriteMeals();
