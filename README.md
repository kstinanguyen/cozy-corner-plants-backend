
# Cozy Corner Plants - Backend

This repository contains the backend code for the Cozy Corner Plants application. It manages the logic, API requests, and interacts with Firebase to store and retrieve data. The backend also connects to the Google Gemini API to generate motivational phrases.

## Features

- API routes for handling plant data and motivational phrases.
- Real-time syncing with Firebase Realtime Database.
- Integration with Google Gemini API for dynamic motivational phrases.


## Project Setup

### Prerequisites:
1. Make sure you have Node.js installed (v14 or higher).
2. **Firebase**: Firebase setup is required to interact with the Firebase Realtime Database.
- You'll need to create a Firebase project and obtain your API credentials.
3. **Google Gemini API**: You will need to create a Google Gemini API key to connect with the AI service.
## Backend Setup:

### 1. Clone the repository:

```bash
git clone https://github.com/kstinanguyen/cozy-corner-plants-backend.git
cd cozy-corner-plants-backend
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Configure Firebase:
- Create a Firebase project if you haven’t already, and obtain your Firebase credentials (API key, project ID, etc.).
- Create a .env file in the root of the project and add the Firebase credentials. Example:
```env
FIREBASE_DATABASE_URL=your-firebase-database-url
FIREBASE_TYPE=firebase-account-type
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY_ID=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_CLIENT_ID=your-firebase-client-id
FIREBASE_AUTH_URI=your-firebase-auth-uri
FIREBASE_TOKEN_URI=your-firebase-token-uri
FIREBASE_AUTH_PROVIDER_CERT_URL=your-firebase-auth-provider-cert-url
FIREBASE_CLIENT_CERT_URL=your-firebase-client-cert-url
```

### 4. Create Google Gemini API Key:
- Go to the [Google Cloud Console](https://cloud.google.com/cloud-console?hl=en).
- Create a new project (or select an existing one).
- Navigate to the **APIs & Services** section and enable the **Gemini API**.
- Create API credentials for the Gemini service and obtain your API key.
- Add your **Gemini API key** to the ```.env``` file. Example:
```env
API_KEY=your-gemini-api-key
```

### 5. Start the backend server:
```bash
npm start
```

The backend should now be running locally and accessible to your frontend for API requests.
