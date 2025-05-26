# Employee Management Dashboard

A React-based dashboard to manage employees with features including viewing employee details, feedback, promotions, bookmarks, and department-wise analytics charts.

## Features

- List of employees with details like name, email, age, department, and bio.
- Display average feedback ratings with star visualization.
- Employee detail page with tabs: Overview, Projects, Feedback.
- Add new feedback for employees with scores and comments.
- Bookmark and promote employees.
- Charts showing:
  - Department-wise average ratings.
  - Bookmark trends over time.
- Data fetching and updates via Axios (mock or real backend).
- Responsive and accessible UI with keyboard-friendly interactions.

## Technologies Used

- React (with functional components and hooks)
- React Router DOM (for routing)
- Axios (for API requests)
- Chart.js with react-chartjs-2 (for charts)
- Tailwind CSS / Custom CSS for styling
- JSON Server or any backend to serve employee data (mock backend suggested)

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/employee-dashboard.git
   cd employee-dashboard
2. Install dependencies:
    ```bash
      npm install
    # or
    yarn install

3. Start your mock backend (optional):
     ```bash
      json-server --watch db.json --port 5000

4. Run the React app:
     ```bash
      npm run dev
     
Project Structure

![image](https://github.com/user-attachments/assets/6e0f38b0-27a2-447b-b5d9-907f14ae436b)

API Endpoints

GET /employees
Fetch a list of all employees to show in the dashboard, employee list, or cards.

GET /employees/:id
Fetch details for a particular employee, including personal info, feedback, projects, etc.

PATCH /employees/:id
Update certain parts of employee data, e.g., append new feedback or update fields.

GET /bookmarks
If bookmarks are stored in a separate backend structure, get the list or stats for bookmarks.

POST /bookmarks/:id or DELETE /bookmarks/:id
Add or remove bookmarks for an employee.

POST /promotions/:id or DELETE /promotions/:id
Promote or undo promotion status for an employee.

Usage
Browse employee list on the homepage.

Click View on an employee card to see detailed info.

Use tabs on employee detail page for Overview, Projects, and Feedback.

Add feedback using the form on the Feedback tab.

Bookmark or promote employees from the employee card.

View analytics charts for department ratings and bookmark trends.

Customization
Update db.json with your employee data.

Modify styles in CSS files or switch to Tailwind CSS if preferred.

Extend backend API for real-world usage.
