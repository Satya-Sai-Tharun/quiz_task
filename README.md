# React Quiz Application

A simple, minimal question-and-answer application built with React and Vite.

## Features

- **User Persistence**: Saves username and progress in `localStorage`.
- **Resume Functionality**: Allows users to resume the quiz from where they left off if they close the browser.
- **Validation**: Specifically for Question 2 to ensure exactly 2 options are selected.
- **Scoring**: Calculates score and percentage at the end.

## Project Structure

- `index.html`: Entry point.
- `data/`: Contains all source code and assets.
  - `components/`: UI components for screens and controls.
  - `questions.js`: Configuration for the quiz questions.
  - `App.jsx`: Main application logic and state management.

## Questions Breakdown

1. **Question 1**: Radio button (4 choices, 1 correct).
2. **Question 2**: Checkbox (5 choices, 2 correct validation).
3. **Question 3**: Toggle button (Yes/No).
4. **Question 4**: Text input (Math question).
5. **Question 5**: Color picker (Select Red).

## How to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.