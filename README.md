# GigPath – AI-Powered Financial Guidance Platform for Gig Workers

## Technologies Used

* React.js
* Vite
* Firebase Authentication
* Cloud Firestore
* Google Gemini AI API
* Capacitor Android

## Prerequisites

Install:

* Node.js (v18 or later)
* npm

## Clone Repository

```bash
git clone https://github.com/Tanujaprabha/GigPath.git
cd GigPath
```

## Install Dependencies

```bash
npm install
```

## Run Application

```bash
npm run dev
```

Open the URL displayed in the terminal (usually http://localhost:5173).

## Features

* User Authentication
* Google Sign-In
* Income and Expense Tracking
* Financial Goal Management
* Reports and Analytics
* AI-Powered Financial Recommendations
* AI Chat Assistant

## Database

Cloud Firestore is used as the database.

## Authentication

Firebase Authentication is used for:

* Email/Password Login
* Google Sign-In

## Test Cases

1. Create a new account.
2. Login using Email/Password.
3. Login using Google Sign-In.
4. Add Income Transaction.
5. Add Expense Transaction.
6. Create Financial Goal.
7. View Dashboard Analytics.
8. View Reports.
9. Use AI Assistant.
10. Logout and Login again to verify data persistence.

## Project Structure

* Frontend: React.js + Vite
* Backend Services: Firebase Authentication and Firestore
* AI Service: Google Gemini API
* Mobile Platform: Capacitor Android

