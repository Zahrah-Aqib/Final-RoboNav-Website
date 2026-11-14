# RoboNav 3D React – Standalone Vite Frontend

This folder contains the **latest scroll-driven RoboNav robot website**,
copied from the tested `robonav-3d-scroll-react` development branch.
It is a standalone frontend and can be deployed as its own Vercel project.

## Scroll experience
- The robot begins on the right.
- Scrolling guides it toward the left, then the center.
- It makes one complete **360-degree rotation controlled by scroll position**.
- Scrolling upward reverses the robot's movement.
- The homepage continues into linked **Grid Simulator**, **Algorithm
  Comparison**, and **Experiment Lab** sections.

The robot is a stylized 3D-looking SVG/CSS character using perspective
transforms, not a native Three.js model. The older Three.js prototype is
retained in the Classic Home page.

## Pages
- `/`: full-page robot scroll story.
- `/simulator`: grid editing and Python A*/Greedy search visualization.
- `/comparison`: two-algorithm comparison on the same grid.
- `/lab`: experiment batch runs and download options.
- `/python-visualizations`: Python-generated Matplotlib views.
- `/how-it-works`, `/about`, `/docs`: project information.
- `/classic-home`: original React homepage.

## Run locally

From **this folder**, not the repository root:

```bash
npm ci
npm run dev
```

For local API requests, set `VITE_API_URL=http://127.0.0.1:8000` in a
`.env.local` file and run the existing FastAPI backend separately.

## Deploy a brand-new Vercel project

1. Open https://vercel.com/new
2. Import GitHub repo `Zahrah-Aqib/Final-RoboNav-Website`.
3. Select **Root Directory: `robonav-3d-react`** (critical).
4. Production branch: **`main`**.
5. Framework preset: **Vite**.
6. Install: **`npm ci`**.
7. Build: **`npm run build`**.
8. Output: **`dist`**.
9. Environment variable: `VITE_API_URL=https://robonav-python-api.vercel.app`
10. Deploy, then assign or keep the clean production `*.vercel.app` URL.

The Python backend is **not bundled into this directory**. It remains in the
existing separate FastAPI deployment. Add your new Vercel domain to the
backend's `ROBONAV_ALLOWED_ORIGINS` configuration for browser API calls.

## Why a separate directory?

Older builds sometimes selected the repository's Python backend or the
older React `main` homepage. With a self-contained Vite app in this
directory, Vercel sees a single `package.json`, a matching package lock,
and the correct scroll robot homepage without branch switching.

**Do not deploy the repository root for this new website.**
