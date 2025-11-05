# Basketball Trainer Booking Platform

A full-stack web application for booking basketball training sessions with professional trainers.

## Tech Stack

### Backend
- **Spring Boot 2.7.0** - Java web framework
- **SQLite** - Lightweight database with custom Hibernate dialect
- **Maven 3.9.5** - Build tool and dependency management
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database ORM

### Frontend
- **React 19.1.1** - Frontend framework
- **Vite 7.1.10** - Build tool and dev server
- **JavaScript/JSX** - Programming language

## Prerequisites

Before running this project, make sure you have:

- **Java 11 or higher** (tested with Java 20)
- **Node.js 20.19+ or 22.12+** (current project uses 20.12.0 with warnings)
- **Git** - Version control

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ryanzambie/sessions.git
cd sessions
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Download and extract Maven (if not installed)
curl -O https://dlcdn.apache.org/maven/maven-3/3.9.5/binaries/apache-maven-3.9.5-bin.tar.gz
tar -xzf apache-maven-3.9.5-bin.tar.gz

# Build the project
./apache-maven-3.9.5/bin/mvn clean install -DskipTests

# Start the backend server
java -jar target/basketballbooksy-0.0.1-SNAPSHOT.jar
```

The backend will start on **http://localhost:8080**

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on **http://localhost:5173** or **http://localhost:5174**

### 4. Access the Application

- **Frontend**: Open http://localhost:5173 in your browser
- **Backend API**: http://localhost:8080/api/trainers
- **Database**: SQLite file at `basketballbooksy.db` in project root

## API Endpoints

### Trainer Management
```bash
# Get all trainers
GET /api/trainers

# Search trainers
GET /api/trainers/search?query=shooting

# Filter trainers
GET /api/trainers/filter?location=California&minRate=50&maxRate=100&specialty=Shooting
```

## Database Access

The SQLite database contains sample trainer data. To access it:

```bash
# Install SQLite (if not installed)
# macOS: brew install sqlite
# Ubuntu: sudo apt-get install sqlite3

# Access the database
sqlite3 basketballbooksy.db

# View tables
.tables

# View trainer data
SELECT * FROM trainer;

# Exit
.quit
```

## Project Structure

```
BasketballBooksy/
├── backend/
│   ├── src/main/java/com/basketballbooksy/
│   │   ├── config/
│   │   │   ├── DataLoader.java          # Sample data loader
│   │   │   ├── SecurityConfig.java      # Security configuration
│   │   │   └── SQLiteDialect.java       # Custom SQLite dialect
│   │   ├── controller/
│   │   │   └── TrainerController.java   # REST API endpoints
│   │   ├── model/
│   │   │   ├── Trainer.java            # Trainer entity
│   │   │   ├── User.java               # User entity
│   │   │   └── Booking.java            # Booking entity
│   │   ├── repository/
│   │   │   └── TrainerRepository.java  # Database repository
│   │   └── service/
│   │       └── TrainerService.java     # Business logic
│   ├── src/main/resources/
│   │   └── application.properties      # Database configuration
│   └── pom.xml                         # Maven dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx                     # Main React component
│   │   └── SearchResults.jsx          # Search results component
│   ├── package.json                    # NPM dependencies
│   └── vite.config.js                  # Vite configuration
└── basketballbooksy.db                 # SQLite database file
```

## Sample Data

The application comes pre-loaded with 5 professional trainers:

1. **Michael Jordan** - Chicago, IL - $150/hour - Shooting specialist
2. **Sarah Thompson** - Los Angeles, CA - $75/hour - Youth development
3. **Coach Marcus Williams** - Atlanta, GA - $100/hour - Strength & conditioning
4. **Jessica Chen** - San Francisco, CA - $120/hour - Elite shooting
5. **Coach David Rodriguez** - Miami, FL - $85/hour - All-around training

## Development

### Backend Development
```bash
# Run in development mode with auto-reload
cd backend
./apache-maven-3.9.5/bin/mvn spring-boot:run

# Run tests
./apache-maven-3.9.5/bin/mvn test

# Clean build
./apache-maven-3.9.5/bin/mvn clean install
```

### Frontend Development
```bash
# Start dev server
cd frontend
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 8080
   lsof -ti:8080 | xargs kill -9
   ```

2. **Maven not found**
   - Use the included Maven: `./apache-maven-3.9.5/bin/mvn`
   - Or install globally: `brew install maven` (macOS)

3. **Node version warning**
   - Update Node.js to 20.19+ or 22.12+
   - Or ignore the warning (project still works)

4. **Database locked**
   ```bash
   # Stop all Java processes
   pkill java
   # Restart backend
   ```

## Current Features

This project currently includes:
- ✅ Complete trainer management system
- ✅ SQLite database with sample data  
- ✅ REST API with search and filtering
- ✅ React frontend with trainer display
- ✅ Backend-frontend integration

**Upcoming features:**
- User authentication (Google OAuth)
- Booking system
- Payment integration
- Real-time messaging
- Calendar integration
- Reviews and ratings

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.
