# stock-dashboard

A full-stack application designed for managing stock watchlist subscriptions and providing real-time price updates.

## Installation

### Frontend

1. `npm install` to install dependencies.
2. `npm start` to run React frontend.

React application is accessible at http://localhost:3001.

### Backend

1. `npm install` to install dependencies.
2. `npm run build` to compile typescript.
3. `npm run seed` to seed the local db.
4. `npm start` to start the server.

Server is accessible at http://localhost:3000.

Database is stored in a local sqlite file.


## TODO for Production
- User management and authentication are not yet implemented. Currently, user-owned resources can be accessed without authentication (e.g., users/{userId}/resource) to facilitate quick API testing. This will need to be updated to use authentication, with the userId resolved from the authentication token instead of being part of the route.
- Stock data is currently using mocked data; this should be replaced with actual API calls.
- The application uses a SQLite in-file database for local development. For production, a more robust database will be required.
