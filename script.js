document.addEventListener('DOMContentLoaded', function() {
 const recipeList = document.getElementById('recipe-list');
    const searchInput = document.getElementById('search-input');
	const addRecipeForm = document.getElementById('add-recipe-form');
    const recipeNameInput = document.getElementById('recipe-name');
    const recipeImageInput = document.getElementById('recipe-image');
    const recipeIngredientsInput = document.getElementById('recipe-ingredients');
    const recipeInstructionsInput = document.getElementById('recipe-instructions');


    function showMoreRecipes(recipeType) {
        // Hide all more recipes sections
        const allSections = document.querySelectorAll('.more-recipes');
        allSections.forEach(section => section.style.display = 'none');
    
        // Show the specific more recipes section based on recipe type
        const moreRecipesSection = document.getElementById(`more-recipes-${recipeType}`);
        if (moreRecipesSection) {
            moreRecipesSection.style.display = 'block';
        }
    }
    
    function hideMoreRecipes(recipeType) {
        // Hide the specific more recipes section
        const moreRecipesSection = document.getElementById(`more-recipes-${recipeType}`);
        if (moreRecipesSection) {
            moreRecipesSection.style.display = 'none';
        }
    }
    

    let recipes = JSON.parse(localStorage.getItem('recipes')) ||  [
        {
            name: "Maggi",
            image: "meggi.jpg",
            ingredients: ["1 packet Maggi noodles", "1½ cups water", "1 tbsp oil", "½ onion, chopped", "1 tomato, chopped", "1 green chili, chopped", "Maggi tastemaker", "Salt to taste"],
            instructions: "Heat oil, sauté onions, green chili, and tomatoes. Add water, Maggi noodles, and tastemaker. Cook for 2-3 minutes. Serve hot."
        },
        {
            name: "Pasta",
            image: "pasta.jpg",
            ingredients: ["200g pasta", "1 tbsp olive oil", "2 cloves garlic", "1 onion", "1 tomato", "½ cup tomato sauce", "1 tsp chili flakes", "1 tsp oregano", "Salt and pepper", "Grated cheese"],
            instructions: "Boil pasta. Heat oil, sauté garlic and onions, add tomatoes and sauce, then pasta. Garnish with cheese."
        },
        {
                        name: "Momos",
                        image: "momos.jpg",
                        ingredients: ["1 cup all-purpose flour", "½ cup water", "1 tbsp oil", "1 cup chopped vegetables", "1 tsp soy sauce", "1 tsp vinegar", "1 tsp black pepper", "Salt to taste"],
                        instructions: "Knead dough, sauté vegetables, fill dough with mixture, steam for 10-12 minutes. Serve hot."
                    },
                    {
                        name: "Golgappe",
                        image: "golgappe.jpg",
                        ingredients: ["1 cup semolina", "¼ cup all-purpose flour", "Water", "Oil for frying", "1 boiled potato", "½ cup boiled chickpeas", "1 tsp chaat masala", "1 tsp black salt", "Tamarind chutney", "Spicy mint water"],
                        instructions: "Knead dough, fry puris, fill with potato-chickpea mix, add chutney, dip in mint water. Serve immediately."
                    },
                    {
                        name: "Chowmein",
                        image: "chaumin.jpg",
                        ingredients: ["200g noodles", "1 tbsp oil", "1 onion", "1 carrot", "½ capsicum", "½ cabbage", "1 tsp soy sauce", "1 tsp vinegar", "1 tsp chili sauce", "½ tsp black pepper", "Salt to taste"],
                        instructions: "Boil noodles, sauté vegetables, add sauces, mix with noodles, stir-fry. Serve hot."
                    },
                    {
                        name: "Burger",
                        image: "barger.jpg",
                        ingredients: ["2 burger buns", "2 patties (veg or non-veg)", "Lettuce", "Tomato slices", "Onion slices", "Cheese slice", "Mayonnaise", "Ketchup"],
                        instructions: "Grill patties, assemble with lettuce, tomato, onion, cheese, mayonnaise, and ketchup in buns. Serve."
                    },
                    {
                        name: "Samosa",
                        image: "samosa.jpg",
                        ingredients: ["2 cups all-purpose flour", "½ cup oil", "Water for dough", "2 boiled potatoes", "1 cup peas", "1 tsp cumin seeds", "1 tsp garam masala", "Salt to taste", "Oil for frying"],
                        instructions: "Make dough, prepare filling with potatoes, peas, and spices. Fill dough, shape into samosas, fry until golden."
                    },
                    
                    {
                        name: "Dhokla",
                        image: "kaman.jpg",
                        ingredients: ["1 cup gram flour (besan)", "1 tsp eno", "1 tsp turmeric", "1 tsp sugar", "Salt to taste", "Water", "1 tsp mustard seeds", "1 tsp sesame seeds", "Coriander leaves"],
                        instructions: "Mix gram flour, turmeric, sugar, and salt with water, add eno, steam. Temper with mustard and sesame seeds, garnish with coriander."
                    },
                    

				
    ];

    function displayRecipes(filteredRecipes = recipes) {
        recipeList.innerHTML = '';
        filteredRecipes.forEach((recipe,index) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
				<button class="delete-btn" data-index="${index}">Delete</button>

            `;
            
            recipeList.appendChild(recipeCard);
        });
    }

    function searchRecipes() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(searchTerm)
        );
        displayRecipes(filteredRecipes);
    }
	function addRecipe(event) {
        event.preventDefault();

        const newRecipe = {
            name: recipeNameInput.value,
            image: recipeImageInput.value,
            ingredients: recipeIngredientsInput.value.split(',').map(ingredient => ingredient.trim()),
            instructions: recipeInstructionsInput.value
        };

        recipes.push(newRecipe);
		localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();

        // Clear form fields
        recipeNameInput.value = '';
        recipeImageInput.value = '';
        recipeIngredientsInput.value = '';
        recipeInstructionsInput.value = '';
    }

	function deleteRecipe(index) {
		const recipe = recipes[index];
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();


		if(recipe.image){
			
		}
    }

    searchInput.addEventListener('input', searchRecipes);
	addRecipeForm.addEventListener('submit', addRecipe);
	
	recipeList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            deleteRecipe(index);
        }
    });

    displayRecipes();

    
});







