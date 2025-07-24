-- Each folder have separate Readme files with more information including spent time --

## Project Overview

```
client/   # Frontend React application
server/   # Backend Node.js/Express API
```

---

## client/
This folder contains the frontend code built with React and Vite.

- **public/**: Static assets (images, icons, etc.)
- **src/**: Main source code
  - **assets/**: Images and other media
  - **components/**: Reusable React components (e.g., Navbar, PlayerCard, Modal)
  - **pages/**: Main pages/routes (e.g., LoginRegister, MyTeam, TransferMarket)
- **index.html**: Main HTML file
- **vite.config.js**: Vite configuration
- **package.json**: Frontend dependencies and scripts

### To run the frontend:
```bash
cd client
npm install
npm run dev
```

---

## server/
This folder contains the backend code built with Node.js and Express.

- **controllers/**: Route handler logic (auth, market, player, team, user)
- **middlewares/**: Express middleware (e.g., authentication)
- **models/**: Mongoose models (Player, Team, User)
- **routes/**: API route definitions
- **utils/**: Utility functions (e.g., token generation, player generation)
- **app.js / server.js**: Entry points for the server
- **package.json**: Backend dependencies and scripts

### To run the backend:
```bash
cd server
npm install
npm start
```

---

## Getting Started
1. Clone the repository.
2. Install dependencies for both `client` and `server`.
3. Start the backend and frontend servers as described above.

---