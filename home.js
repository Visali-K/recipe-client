document.addEventListener('DOMContentLoaded', function() {
    
    const searchBox = document.querySelector('.searchBox');
    const searchBtn = document.querySelector('.searchBtn');
    const recipeContainer = document.querySelector('.recipe-container');
    const recipeCloseBtn = document.querySelector('.recipe-close-btn');
    const recipeDetailsContent = document.querySelector('.recipe-details-content');
    let allRecipes = []; 

    
    const displayRecipes = (recipesToDisplay) => {
        recipeContainer.innerHTML = '';
        if (recipesToDisplay.length === 0) {
            recipeContainer.innerHTML = '<h2>No recipes found</h2>';
            return;
        }
        recipesToDisplay.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}"/>
                <h3>${recipe.name}</h3>
                <p><span>${recipe.difficulty}</span> Level</p>
                <p><span>${recipe.cuisine}</span> Recipe</p>
            `;
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            button.addEventListener('click', () => {
                openRecipePopup(recipe);
            });
            recipeContainer.appendChild(recipeDiv);
        });
    }

    
    const fetchAllRecipes = async () => {
        recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
        try {
            const response = await fetch('https://dummyjson.com/recipes');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            allRecipes = data.recipes; 
            displayRecipes(allRecipes); 
        } catch (error) {
            recipeContainer.innerHTML = "<h2>Error fetching recipes...</h2>";
            console.error(error);
        }
    }

    
    const filterRecipes = () => {
        const query = searchBox.value.toLowerCase();
        if (!query) {
            displayRecipes(allRecipes); 
            return;
        }
        const filteredRecipes = allRecipes.filter(recipe =>
            recipe.name.toLowerCase().includes(query)
        );
        displayRecipes(filteredRecipes);
    }

    
    const openRecipePopup = (recipe) => {
        console.log(recipe); 
        recipeDetailsContent.innerHTML = `
            <h2 class="recipeName">${recipe.name}</h2>
            <img src="${recipe.image}" alt="${recipe.name}"/>
            <h3>Ingredients:</h3>
            <ul class="ingredientList">${fetchIngredients(recipe)}</ul>
            <div>
                <h3>Instructions:</h3>
                <ol class="recipeInstructions">
                    ${recipe.instructions ? recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('') : '<li>No instructions available.</li>'}
                </ol>
            </div>
            <p><strong>Prep Time:</strong> ${recipe.prepTimeMinutes || 'N/A'} minutes</p>
            <p><strong>Cook Time:</strong> ${recipe.cookTimeMinutes || 'N/A'} minutes</p>
            <p><strong>Servings:</strong> ${recipe.servings || 'N/A'}</p>
            <p><strong>Difficulty:</strong> ${recipe.difficulty || 'N/A'}</p>
            <p><strong>Cuisine:</strong> ${recipe.cuisine || 'N/A'}</p>
            <p><strong>Calories per Serving:</strong> ${recipe.caloriesPerServing || 'N/A'}</p>
            <p><strong>Meal Type:</strong> ${recipe.mealType || 'N/A'}</p>
        `;
        recipeDetailsContent.parentElement.style.display = "block";
    }

    // Function to generate a list of ingredients
    const fetchIngredients = (recipe) => {
        let ingredientsList = "";
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
            recipe.ingredients.forEach(item => {
                ingredientsList += `<li>${item}</li>`;
            });
        } else {
            ingredientsList = "<li>No ingredients available.</li>";
        }
        return ingredientsList;
    }

    
    recipeCloseBtn.addEventListener('click', () => {
        recipeDetailsContent.parentElement.style.display = "none";
    });

    
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        filterRecipes();
    });

    
    searchBox.addEventListener('input', filterRecipes);
    fetchAllRecipes();
});
