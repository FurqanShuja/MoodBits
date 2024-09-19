# Full-Stack Project Setup Guide

This guide will walk you through setting up the backend (Flask) and frontend (React/Vue/etc.) environments for this full-stack project. We will set up dependencies for both the backend and frontend in separate terminals.

## Prerequisites

- **Python 3.x** installed on your machine.
- **Node.js** (with npm) installed on your machine.

---

## Backend Setup (Flask)

1. **Clone the repository** and navigate to the `backend` directory:

    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name/backend
    ```

2. **Create a virtual environment** in the `backend` directory to isolate the project dependencies:

    - For **Linux/macOS**:
      ```bash
      python3 -m venv venv
      source venv/bin/activate
      ```

    - For **Windows**:
      ```bash
      python -m venv venv
      venv\Scripts\activate
      ```

3. **Install the backend dependencies** using `requirements.txt`:

    ```bash
    pip install -r requirements.txt
    ```

4. **Run the Flask app**:

    In the same terminal, you can now start your Flask server:

    ```bash
    python app.py
    ```

    By default, the app will be available at `http://127.0.0.1:5000`.

---

## Frontend Setup (React/Vue/etc.)

1. **Open a separate terminal** and navigate to the `frontend` directory:

    ```bash
    cd your-repo-name/frontend
    ```

2. **Install Node.js** (if not already installed):

    If you don’t have Node.js installed, download and install it from the [official Node.js website](https://nodejs.org/). After installation, verify it by running:

    ```bash
    node -v
    npm -v
    ```

    This should print the versions of Node.js and npm.

3. **Install the frontend dependencies**:

    In the `frontend` directory, run the following command to install all the necessary JavaScript dependencies:

    ```bash
    npm install
    ```

4. **Start the frontend development server**:

    Run the following command to start the frontend server:

    ```bash
    npm start
    ```

    This will launch the frontend on `http://localhost:3000` (or another port if specified).

---

## Running Both Backend and Frontend

To run both the backend (Flask) and frontend (React/Vue/etc.) simultaneously, you'll need to keep both servers running in **separate terminals**:

1. **Terminal 1**: Backend (Flask)

    - Activate the virtual environment.
    - Run the Flask server with `flask run`.

2. **Terminal 2**: Frontend (React/Vue/etc.)

    - Navigate to the `frontend` directory.
    - Run the frontend development server with `npm start`.

---

## Additional Notes

- Ensure the **backend** server is running on `http://127.0.0.1:5000` and the **frontend** server on `http://localhost:3000` (or other specified ports). The frontend may make API requests to the backend server for data.
- If the frontend and backend communicate via APIs, check for any CORS issues and ensure the appropriate configuration in Flask using `Flask-CORS`.

