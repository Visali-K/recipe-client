const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const recipeDetailsContent = document.querySelector(".recipe-details-content");

const fetchRecipes = async (query) => {
  console.log(`https://dummyjson.com/recipes${query}`);
  console.log("🚀 ~ fetchRecipes ~ query:", query);
  recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
  try {
    const response = await fetch(`https://dummyjson.com/recipes/${query}`);
    const data = await response.json();
    console.log("🚀 ~ fetchRecipes ~ data:", data);
    recipeContainer.innerHTML = "";

    data.recipes.forEach((recipe) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}"/>
                <h4>${recipe.name}</h4>
                <p><span>${recipe.difficulty}</span> Level</p>
                <p><span>${recipe.cuisine}</span> Recipe</p>
            `;
      const button = document.createElement("button");
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      button.addEventListener("click", () => {
        openRecipePopup(recipe);
      });
      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML = "<h2>Error in fetching Recipes....</h2>";
  }
};

const fetchIngredients = (recipe) => {
  let ingredientsList = "";
  if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
    recipe.ingredients.forEach((item) => {
      ingredientsList += `
                <li>${item}</li>
            `;
    });
  } else {
    ingredientsList = "<li>No ingredients available.</li>";
  }
  return ingredientsList;
};

const openRecipePopup = (recipe) => {
  console.log(recipe); // Debug the recipe object
  recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${recipe.name}</h2>
         <img src="${recipe.image}" alt="${recipe.name}"/>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(recipe)}</ul>
        <div>
            <h3>Instructions:</h3>
            <ol class="recipeInstructions">
                ${recipe.instructions
                  .map((instruction) => `<li>${instruction}</li>`)
                  .join("")}
            </ol>
        </div>
        <p><strong>Prep Time:</strong> ${recipe.prepTimeMinutes} minutes</p>
        <p><strong>Cook Time:</strong> ${recipe.cookTimeMinutes} minutes</p>
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
        <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
        <p><strong>Calories per Serving:</strong> ${
          recipe.caloriesPerServing
        }</p>
          <p><strong>Meal Type:</strong> ${recipe.mealType}</p>
        
    `;
  recipeDetailsContent.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Type the Recipe in the search box.</h2>`;
    return;
  }
  fetchRecipes(`search?q=${encodeURIComponent(searchInput)}`);
});
