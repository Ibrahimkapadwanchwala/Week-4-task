document.getElementById("plannerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission refresh

    let name = document.getElementById("name").value.trim();
    let age = parseInt(document.getElementById("age").value);
    let goal = document.getElementById("goal").value;
    let activity = document.getElementById("activity").value;
    let diet = document.getElementById("diet").value;
    let resultDiv = document.getElementById("result");

    // Input validation
    if (name === "" || isNaN(age) || age < 10 || age > 100) {
        alert("Please enter a valid name and age between 10 and 100.");
        return;
    }

    let workoutPlan = generateWorkoutPlan(goal, activity);
    let nutritionPlan = generateNutritionPlan(goal, diet);
    let dailyCalories = calculateCalories(goal, age, activity);

    // Display result
    resultDiv.innerHTML = `
        <h3>Hello, ${name}!</h3>
        <p><strong>Workout Plan:</strong> ${workoutPlan}</p>
        <p><strong>Nutrition Plan:</strong> ${nutritionPlan}</p>
        <p><strong>Suggested Daily Caloric Intake:</strong> ${dailyCalories} kcal</p>
    `;
    resultDiv.style.display = "block";
});

// Generate Workout Plan Based on Goal & Activity Level
function generateWorkoutPlan(goal, activity) {
    let plan = "";
    if (goal === "weight_loss") {
        plan = "Cardio (running, cycling) 5x a week, strength training 3x a week.";
    } else if (goal === "muscle_gain") {
        plan = "Strength training 4-5x a week (progressive overload), cardio 2x a week.";
    } else {
        plan = "Endurance training (running, swimming) 4-5x a week, strength 2x a week.";
    }

    if (activity === "low") {
        plan += " Start with lighter exercises and increase gradually.";
    } else if (activity === "high") {
        plan += " High-intensity workouts recommended for better results.";
    }
    return plan;
}

// Generate Nutrition Plan Based on Goal & Diet
function generateNutritionPlan(goal, diet) {
    let nutrition = "";

    if (goal === "weight_loss") {
        nutrition = "High protein, low carbs, more vegetables.";
    } else if (goal === "muscle_gain") {
        nutrition = "High protein, moderate carbs, calorie surplus.";
    } else {
        nutrition = "Balanced macronutrients with hydration focus.";
    }

    if (diet === "vegetarian") {
        nutrition += " Ensure enough plant-based protein (tofu, lentils, beans).";
    } else if (diet === "keto") {
        nutrition += " Focus on high fat, low-carb meals (avocado, nuts, fish).";
    }
    
    return nutrition;
}

// Estimate Daily Caloric Needs Based on Goal
function calculateCalories(goal, age, activity) {
    let baseCalories = 1800; // Default for an average person

    if (goal === "weight_loss") {
        baseCalories -= 300;
    } else if (goal === "muscle_gain") {
        baseCalories += 400;
    }

    if (age < 25) {
        baseCalories += 200;
    } else if (age > 50) {
        baseCalories -= 200;
    }

    if (activity === "moderate") {
        baseCalories += 200;
    } else if (activity === "high") {
        baseCalories += 400;
    }

    return baseCalories;
}
