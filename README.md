# Ultimate Tic-Tac-Toe (React Edition)

## Project Overview

This project is an advanced implementation of the classic Tic-Tac-Toe game, known as "Ultimate Tic-Tac-Toe". Developed as a final project for the Scripting Languages course, this application was built from the ground up using React JS, demonstrating a solid understanding of modern front-end development principles, component-based architecture, and state management.

The game consists of a 3x3 main grid, where each cell contains a smaller, standard 3x3 Tic-Tac-Toe board. The rules add a strategic layer to the traditional game, requiring players to think ahead and plan their moves carefully across multiple boards.

This project showcases not just the implementation of complex game logic, but also a focus on user experience with features like timers and clear visual feedback.

## Key Features

  * **Dynamic Player Setup**: Players can enter their names before starting the game.
  * **Randomized Start**: The first player and their respective symbols ('X' or 'O') are assigned randomly to ensure fairness.
  * **Complex Game Logic**: The core logic for Ultimate Tic-Tac-Toe is fully implemented, including winner detection for each of the 9 mini-boards and for the overall game.
  * **Timed Turns**: Each player has a 90-second timer that counts down only on their turn. Running out of time results in a loss, adding a layer of urgency and challenge to the gameplay.
  * **Interactive UI**: The game board provides clear visual cues, highlighting the winner of each mini-board and displaying the final game outcome.
  * **State Management with React**: The application's state, including the board layout, player turns, timers, and game status, is efficiently managed using React Hooks (`useState`, `useEffect`).
  * **Component-Based Architecture**: The UI is broken down into reusable components such as `Board`, `Quadrado` (Square), `Header`, and `Footer`, promoting clean and maintainable code.
  * **Reset Functionality**: Players can restart the game at any time with a dedicated "Reset" button.

## Technologies Used

This project was developed using the following technologies:

  * **React JS**: For building the user interface with a component-based architecture.
  * **JavaScript (ES6+)**: For the core game logic and application functionality.
  * **HTML5**: For the structure of the web application.
  * **CSS3**: For styling the components and creating a responsive layout.

## How to Run This Project

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine.

### Installation & Startup

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/your_repository.git
    ```
2.  Navigate to the project directory
    ```sh
    cd your_repository
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4.  Run the app in development mode
    ```sh
    npm start
    ```
    Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view it in your browser.
  * **Strategic Tic-Tac-Toe: A React JS Project**
  * **Multi-Board Tic-Tac-Toe Game in React**
