# Slotify frontend

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=black&style=for-the-badge)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![License](https://img.shields.io/github/license/Jaros-777/slotify-frontend?style=for-the-badge)


**Slotify Frontend** is the client-side application for the Slotify booking system, built with Vite + React.js (TypeScript). It provides a modern and interactive interface to communicate with the Slotify backend.

---
# 🌍 Live Demo
### 🔗[LIVE DEMO](https://slotify7.netlify.app/)

## ✨ Features
- ⚡ **Fast SPA:** Built with Vite for lightning-fast development and production builds.  
- 🎨 **Responsive UI:** Fully responsive layout optimized for desktop and mobile (witchout admin pages).  
- 🐳 **Dockerized:** Includes Dockerfile for easy containerization.  
- 🔗 **Backend Integration:** Connects seamlessly to the Slotify backend via REST API.  
- ⚙️ **Environment Variables:** Configurable API URL and Supabase storage credentials.  

---

## 🛠 Tech Stack
* **Framework:** React.JS + TypeScript + Vite  
* **Styling:** Tailwind CSS / SCSS  
* **Containerization:** Docker   
* **API Requests:** Axios

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js 20+  
- npm or yarn  
- (Optional) Docker  

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Jaros-777/slotify-frontend.git
cd slotify-frontend
```
### 2️⃣ Set Environment Variables
Create a .env file in the root of the project:
```bash
VITE_APP_URL=http://localhost:8080
```
### 3️⃣ Install dependencies
```bash
npm install
# or
yarn install
```
### 4️⃣ Run the development server
```bash
npm run dev
# or
yarn dev
```

The app will start at: http://localhost:5173

## 🐳 Running with Docker
Build and run the frontend in a Docker container:
```bash
# Build Docker image
docker build -t slotify-frontend .

# Run container (maps port 3000)
docker run -p 3000:80 slotify-frontend
```

After this, open http://localhost:3000 in your browser to access the frontend.

---

## 📝 Notes
- Ensure the backend is running and accessible at VITE_APP_URL.
- If Supabase or other storage is used, make sure the backend environment variables are set correctly.

---

## 🌟 Key Libraries
These are the main libraries that make Slotify frontend powerful and interactive:

| Library           | Purpose                                  | Badge |
|------------------|-----------------------------------------|-------|
| **React**         | Core frontend framework                  | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) |
| **Leaflet**       | Interactive maps for businesses | ![Leaflet](https://img.shields.io/badge/Leaflet-339933?style=for-the-badge&logo=leaflet&logoColor=white) |
| **React-Calendar**| Calendar views for booking & scheduling | ![React Calendar](https://img.shields.io/badge/React--Calendar-ff9800?style=for-the-badge) |
| **Tailwind CSS**  | Modern utility-first styling            | ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **Axios**         | HTTP client for API requests            | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) |

---

## ✨ Highlights
- 🌍 **Interactive Maps:** Users can see business locations and events on an interactive map.  
- 📅 **Dynamic Calendar:** Booking and event scheduling with a modern calendar view.  
- ⚡ **Blazing Fast:** Vite + React ensures the app loads and updates quickly.  
- 🎨 **Responsive Mobile View:** Optimized for mobile on Home and Reservation pages (excluding admin pages).  
- 🐳 **Docker Ready:** Frontend can run in a container with zero setup.

---
## 📂 Folder Structure  
```bash
slotify-frontend/
├── public/                 # Static assets served directly (index.html, favicon, etc.)
├── src/                    # Main source code
│   ├── assets/             # Images, icons, and other media assets
│   ├── components/         # Reusable React components
│   │   ├── Footer/         # All footer-related components
│   │   ├── Navbar/         # Navigation bars for different user roles
│   │   └── ui/             # UI elements (e.g., Switch from react-switch used in vacation form)
│   ├── Layouts/            # Layout wrappers for consistent page structures
│   ├── pages/              # Page-level components and routing
│   │   ├── Admin/          # Admin panel for managing bookings and content (divided by navbar sections)
│   │   ├── Clients/        # Client-facing pages for making reservations
│   │   └── Home/           # Main landing page of the application
│   ├── App.tsx             # Main App component with routing logic
│   └── main.tsx            # Application entry point and React DOM rendering
├── .env.example            # Template for required environment variable
├── package.json            # Project dependencies, scripts, and metadata
├── tsconfig.json           # TypeScript configuration settings
├── tailwind.config.js      # Tailwind CSS framework configuration
├── vite.config.ts          # Vite build tool configuration
├── Dockerfile              # Docker containerization configuration
└── README.md               # Project documentation and setup guide
```

---

### 👤 Author
Filip Jarocki - [GitHub profile](https://github.com/Jaros-777)

---

### 🖥️ Other repos
Main repo - https://github.com/Jaros-777/Slotify  
Backend repo - https://github.com/Jaros-777/slotify-backend

## ⚖ License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.




