# SS Nexus

SS Nexus is a frontend-first project for static web pages. The frontend is ready to develop. The backend folder is reserved for a later technology choice and has no implementation yet.

## Project structure

```text
SSNexus/
├── frontend/                 # React application
│   ├── public/               # Static files served as-is
│   ├── src/
│   │   ├── assets/           # Images and other imported assets
│   │   ├── components/       # Reusable components
│   │   │   └── ui/           # shadcn/ui components
│   │   ├── hooks/            # Reusable React hooks
│   │   ├── layouts/          # Shared page shells
│   │   ├── lib/              # Shared utilities
│   │   ├── pages/            # Static page components
│   │   ├── types/            # Shared TypeScript types
│   │   ├── App.tsx           # Composes layouts and pages
│   │   ├── index.css         # Tailwind CSS and theme tokens
│   │   └── main.tsx          # Application entry
│   ├── .env.example
│   ├── components.json       # shadcn/ui configuration
│   └── package.json
└── backend/                  # Placeholder for a future backend
    ├── .env.example
    └── README.md
```

## Technology stack

Frontend:

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui (Base UI, Nova style)

Backend:

- Undecided. Add backend dependencies after the technology and requirements are chosen.

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm 10 or newer

Check both versions before installing:

```bash
node -v
npm -v
```

## Install frontend dependencies

From the repository root:

```bash
cd frontend
npm install
```

`frontend/package-lock.json` pins the installed versions. Keep it in the repository.

## Start the development server

```bash
cd frontend
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173`.

## Create a production build

```bash
cd frontend
npm run build
```

The compiled site is written to `frontend/dist`.

Preview that build locally:

```bash
cd frontend
npm run preview
```

## Other frontend commands

Run these from the `frontend` directory:

```bash
npm run lint
npm run typecheck
npm run format
```

Add a shadcn/ui component:

```bash
cd frontend
npx shadcn@latest add button
```

Generated components are placed in `frontend/src/components/ui`.

## Environment variables

Frontend and backend configuration stay separate.

Frontend variables must use the `VITE_` prefix. Create a local file from the example, then restart the dev server:

```bash
cd frontend
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `VITE_APP_NAME` | Name shown in the page shell. Defaults to `SS Nexus`. |

The backend example at `backend/.env.example` is a placeholder and currently defines no variables.

## Frontend conventions

- Keep page components in `src/pages` and render them from `src/App.tsx`.
- Put shared chrome, such as the header, in `src/layouts` and `src/components`.
- Import application code through the `@/` alias, for example `@/components/ui/button`.
- Add reusable hooks in `src/hooks`, utilities in `src/lib`, and shared types in `src/types`.
- Leave generated shadcn/ui files in `src/components/ui` and add new ones with the shadcn CLI.
- TypeScript strict mode, ESLint, and Prettier are already configured. Format with Prettier before committing.

## Backend

`backend/` is intentionally empty of application code. When a backend is chosen, install its dependencies inside that folder and document its commands here.
