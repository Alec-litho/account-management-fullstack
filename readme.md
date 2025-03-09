# account-management-fullstack-test

# Frontend
## navigate to frontend directory
```
cd frontend
```
## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
# Backend
## navigate to backend directory
```
cd backend
```
## Project setup
```
npm install
```
## run server
```
npm run start:dev
```
# Note

- Server automatically seeds when you run it
- Create .env file in backend directory with these variables:
  - POSTGRES_PASSWORD='password'
  - POSTGRES_USER='username'
  - POSTGRES_HOST='localhost'
  - POSTGRES_PORT='5432'
  - POSTGRES_DATABASE='database-name'
  - DATABASE_URL = postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}
  - JWT_SECRET='secret'
