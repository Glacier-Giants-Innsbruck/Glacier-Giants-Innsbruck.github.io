## Dev guideline

### Locations
- de/ - all files related to german version of website (dev)
- src/ - source code
- dist/ - production-ready code, only this folder and its contents must be deployed

### In order to launch dev server run this command:
- npm run dev

### 3In order to build bundles for production run:
- npm run build

### In order to preview website from production build run:
- npm run preview

### If you need to change port or host for dev server just change its params in package.json file:
- "dev": "vite --host 0.0.0.0 --port 5500",

### Dependencies:

1. Vite
2. Sass