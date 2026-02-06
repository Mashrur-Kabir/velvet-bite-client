# Velvet Bite – Frontend

A modern **Next.js 16** frontend for the Velvet Bite restaurant & food ordering platform. This client application provides a smooth UI/UX for browsing menu items, authentication, ordering, and user interaction.

---

## 🚀 Tech Stack

### Core

- **Next.js 16 (App Router)** – React framework for SSR, routing, and performance
- **React 19** – Component‑based UI library
- **TypeScript** – Type‑safe JavaScript

### UI & Styling

- **Tailwind CSS v4** – Utility‑first styling
- **Radix UI** – Accessible UI primitives
- **Framer Motion** – Animations and transitions
- **Lucide Icons** – Modern icon set
- **Sonner** – Toast notifications
- **next-themes** – Dark/light mode support
- **nextjs-toploader** – Page loading indicator

### Forms & Validation

- **@tanstack/react-form** – Form state management
- **Zod** – Schema validation

### Authentication & Env

- **better-auth** – Authentication handling
- **@t3-oss/env-nextjs** – Type‑safe environment variables

---

## ⚙️ Environment Variables

Create a **.env** file in the root:

```env
BACKEND_URL=https://velvet-bite-server.vercel.app/api
FRONTEND_URL=https://velvet-bite-client.vercel.app
```

> Never expose private keys in the frontend.

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd velvet-bite-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🔐 Authentication Flow

- Uses **better-auth** for session handling
- Secure communication with backend API
- Token/session stored safely in browser
- Protected routes handled via middleware or layout guards

---

## 🎨 UI/UX Features

- Responsive mobile‑first design
- Smooth animations via Framer Motion
- Toast feedback for actions
- Loading progress indicator between routes

---

## 🌐 API Communication

All requests are sent to:

```
${BACKEND_URL}
```

Typical flow:

1. User action in UI
2. Form validation with **Zod**
3. API request to backend
4. Response handled with toast + UI update

---

## 🚀 Deployment

Recommended platform: **Vercel**

### Steps

1. Push code to GitHub
2. Import project into Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

---

## 🧪 Linting & Code Quality

- ESLint configured with **eslint-config-next**
- Type safety via **TypeScript**
- Consistent styling using Tailwind utilities

---

## 👨‍💻 Author

**Kabir**
Aspiring full‑stack developer focused on building scalable MERN & Next.js applications.
