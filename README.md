# FocusRoom

FocusRoom is a modern productivity and study platform built to help students collaborate, track deep work sessions, and engage in real-time communication. Engineered using a robust tech stack, it acts as a virtual workspace bringing synchronous accountability to study sessions.

## 🚀 Features

- **Authentication System:** Secure Native Email/Password routing and zero-click Google Sign-In powered by Firebase.
- **Dynamic Dashboards:** Immediate access to personal focus analytics including total minutes studied and overall completed Pomodoro sessions.
- **Real-Time Study Rooms:** Instantaneous creation and browsing of active study rooms utilizing live Firestore listeners.
- **Pomodoro Focus Timer:** Responsive and state-managed timers automating focus bounds (25 mins) and break modes (5 mins) logging seamlessly upon session completion.
- **Live Collaboration:** Streamlined contextual text messaging explicitly coupled within room boundaries ensuring real-time presence markers. 
- **Premium UI / UX Architecture:** Complete dark-themed minimal interface, mobile-optimized through Tailwind CSS, and protected by comprehensive routing layers.

## 🛠 Tech Stack

**Frontend Framework:** React 18, Vite  
**Styling Ecosystem:** Tailwind CSS v3  
**Backend & Database:** Firebase Authentication, Firestore Database  
**Routing Protocol:** React Router DOM (v6)  
**Package Manager:** NPM

## ⚙️ Setup Instructions

To spin up FocusRoom locally on your machine, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone <your-repository-url>
   cd "last chance"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   In the root directory, open the `.env` file and replace the placeholder fields with your active Firebase keys:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
   *(Ensure Google Authentication and Firestore Database are enabled inside your Firebase Console.)*

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

5. **Production Build** (Optional)
   ```bash
   npm run build
   ```

---
*Built continuously with clean functional React fundamentals.*
