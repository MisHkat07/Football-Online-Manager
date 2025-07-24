## Features

- User registration and authentication
- Random team and player generation (with images)
- Player price and rating tracking
- Team and player management
- Transfer market with listing, unlisting, and buying players
- Budget management for users

## Folder Structure

- `controllers/` — Route handler logic (auth, team, player, market, user)
- `models/` — Mongoose schemas (User, Team, Player, etc.)
- `routes/` — Express route definitions
- `middlewares/` — (Add your authentication middleware here)
- `utils/` — Utility functions ( player/team generation)
- `app.js` — Main Express app
- `server.js` — Server entry point
- `.env` — Environment variables (MongoDB URI, JWT secret, etc.)

## Setup & Running

1. **Clone the repository**

2. **Install dependencies**

```
npm install
```

3. **Configure environment variables**

- Create a `.env` file in the root directory with:
  - `MONGO_URI=your_mongodb_connection_string`
  - `JWT_SECRET=your_jwt_secret`
  - `PORT=5000` (or any port you prefer)

4. **Start the server**

```
npm start
```

The server will run on `http://localhost:5000` by default.


## Time Spent on Each Section (Estimates)

- **Project setup & folder structure:** 15 minutes
- **User authentication & registration:** 20 minutes
- **Team and player schema/models:** 15 minutes
- **Random team/player generation logic:** 30 minutes
- **Player price/rating schemas & logic:** 20 minutes
- **Team and player controllers/routes:** 20 minutes
- **Transfer market logic (listing, unlisting, buying):** 40 minutes
- **Budget management:** 20 minutes
- **Testing & bug fixes:** 30 minutes
- **Documentation (README):** 10 minutes


## Notes

- Make sure MongoDB is running and accessible.
- Add your authentication middleware in `middlewares/auth.js` for protected routes.
- Player images are generated using [robohash.org](https://robohash.org/).
