# CRM Backend

Backend API for CRM system with Firebase Firestore integration.

## Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Firebase Admin SDK** - Firestore integration
- **Zod** - Data validation
- **dotenv** - Environment variables management

## Prerequisites

- Node.js (version 14 or higher)
- Firebase credentials file (key.json)
- .env file with all credentials

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd crm_backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase credentials**
- Download the `key.json` file from Firebase console
- Place it in `config/key.json`

## Running

```bash
npm start
```

The server will be available at `http://localhost:3001`

## Endpoints

### Students
- `GET /api/students` - List students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student

### Universities
- `GET /api/universities` - List universities
- `GET /api/universities/:id` - Get university by ID

### Applications
- `GET /api/applications` - List applications
- `GET /api/applications/:id` - Get application by ID

### Documents
- `GET /api/documents` - List documents
- `GET /api/documents/:id` - Get document by ID

### Interactions
- `GET /api/interactions` - List interactions
- `GET /api/interactions/:id` - Get interaction by ID

### Communications
- `GET /api/communications` - List communications
- `GET /api/communications/:id` - Get communication by ID
- `POST /api/communications` - Create communication
- `PUT /api/communications/:id` - Update communication
- `DELETE /api/communications/:id` - Delete communication

### Internal Notes
- `GET /api/internal-notes` - List internal notes
- `GET /api/internal-notes/:id` - Get note by ID
- `POST /api/internal-notes` - Create note
- `PUT /api/internal-notes/:id` - Update note
- `DELETE /api/internal-notes/:id` - Delete note

## Project Structure

```
crm_backend/
├── controllers/     # Route controllers
├── models/         # Validation schemas (Zod)
├── routes/         # Route definitions
├── config/         # Configuration files
├── firebase.js     # Firebase configuration
├── app.js          # Express configuration
└── package.json    # Project dependencies
```
