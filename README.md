# Simple Setup 

1. Install prerequisites (macOS):
   ```sh
   brew install maven sqlite
   brew install node
   ```

2. Clone the repository:
   ```sh
   git clone https://github.com/ryanzambie/sessions.git
   cd sessions
   ```

3. Start the backend:
   ```sh
   cd backend
   mvn spring-boot:run
   ```
   The backend will run at http://localhost:8080

4. Start the frontend:
   ```sh
   cd ../frontend
   npm install
   npm run dev
   ```
   The frontend will run at http://localhost:5173

5. Access the app:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/api/trainers
   - Database: basketballbooksy.db (SQLite)


