// Get meal id from query parameter
const urlParams = new URLSearchParams(window.location.search);
const mealID = urlParams.get('mealID');
const mealDetailsContainer = document.querySelector('.meal-details');

const fetchMealDetails = async (mealID) =>{
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        const data = await response.json();
        const meal = data.meals[0];
        displayMealDetails(meal);
    } catch (error){
        console.log('Error fetching meals details: ',error);
    }
};

// Function to display meal details 
const displayMealDetails = (meal) =>{

    mealDetailsContainer.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <h3>Ingredients:</h3>
        <ul>${getIngredientList(meal)}</ul>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
        `;

};

// Funtion to get ingredients list
const getIngredientList = (meal) =>{
    let ingredientsList = '';
    for(let i = 1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            ingredientsList += `<li>${ingredient}: ${meal[`strMeasure${i}`]}</li>`;

        }else{
            break;
        }

    }
    return ingredientsList;
};

// Fetch meal details when the page loads 
if(mealID){
    fetchMealDetails(mealID);

}else{
    header.textContent = 'Meal ID not found..';
}


// // Adding dark mode in view recipe page 
// darkModeButton.addEventListener('click',() => {
//     body.style.backgroundColor = "black";
//     console.log("bkj");


// });

