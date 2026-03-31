# PantryPal – Food Expiration Tracker

PantryPal is a full-stack web application designed to help users manage pantry items and track grocery expiration dates. The system notifies users before food expires, helping reduce household food waste and improve pantry organization.

The application allows users to store item details, monitor expiration timelines, and receive automated reminder emails when items are about to expire.

---

## Features

- Add, edit, and delete pantry items
- Track grocery expiration dates
- Dashboard overview of pantry inventory
- Automated email reminders for expiring items
- Visual statistics for pantry usage
- Responsive UI with dark mode

---

## Email Notification System

PantryPal integrates **EmailJS** to automatically send reminders when food items are nearing expiration.

The backend checks stored expiration dates and triggers an email notification to the user when the expiry threshold is reached.

This system allows:

- Automated reminder emails
- Real-time notification of expiring food
- Reduced food waste through proactive alerts

EmailJS is used to securely send email notifications directly from the application without managing a separate mail server.

---

## Recipe Suggestion System

PantryPal includes a **recipe discovery feature** that suggests dishes based on ingredients available in the user's pantry.

The application integrates with the **TheMealDB public API** to dynamically fetch recipes that match selected ingredients.

### How it works

1. Users select ingredients from their pantry.
2. The frontend constructs a comma-separated ingredient string.
3. The application queries the **TheMealDB API**.
4. The dashboard displays matching recipes with thumbnails and titles.

### API Endpoint Used

```
https://www.themealdb.com/api/json/v1/1/filter.php?i=<ingredient1,ingredient2,...>
```

### Implementation

The feature is implemented in:

```
frontend/src/components/RecipeIdeas.jsx
```

The component builds the ingredient string and fetches recipes:

```javascript
const ingredientString = ingredients.join(',')

fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientString}`)
  .then(res => res.json())
  .then(data => {
    if (data.meals) {
      setRecipes(data.meals.slice(0,6))
    }
  })
```

### Dashboard Integration

Recipe suggestions are rendered on the dashboard using:

```
<RecipeIdeas ingredients={selectedIngredients} />
```

Each recipe returned from the API includes fields such as:

* `idMeal` – recipe identifier
* `strMeal` – recipe title
* `strMealThumb` – recipe image


## Tech Stack

### Frontend

* React
* Vite
* TailwindCSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### Notification Service

* EmailJS

---

## Project Structure

```
pantry-pal-food-expiration-tracker
│
├── backend
│   ├── models
│   ├── database.js
│   ├── migrate_db.js
│   ├── notificationService.js
│   ├── server.js
│   ├── schema.sql
│   └── .env.example
│
├── frontend
│   ├── public
│   ├── src
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│
└── README.md
```

---

## Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/SMJI18/pantry-pal-food-expiration-tracker
```

---

### 2. Install backend dependencies

```
cd backend
npm install
```

---

### 3. Install frontend dependencies

```
cd frontend
npm install
```

---

### 4. Configure environment variables

Create a `.env` file inside the **backend** directory using the template `.env.example`.

Example:

```
PORT=3000

DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=pantrypal
```

---

### 5. Start the backend server

```
cd backend
node server.js
```

---

### 6. Start the frontend application

```
cd frontend
npm run dev
```

---

## Demo

PantryPal helps users manage pantry items, track expiration dates, receive automated reminders, and discover recipes using available ingredients.

## Future Improvements

- Mobile application integration
- Smart grocery recommendations
- AI-based food waste prediction
- Multi-user pantry sharing

---

## License

This project is licensed under the **MIT License**.
