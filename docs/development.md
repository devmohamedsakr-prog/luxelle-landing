# Local Development Guide

## Prerequisites

- **Node.js**: v20 or higher is recommended.
- **npm**: v10 or higher.
- **Angular CLI**: Optional, but recommended (`npm install -g @angular/cli`).

## Setup Instructions

1. **Install Dependencies**
   Run the following command at the root of the project:
   ```bash
   npm install
   ```

2. **Starting the Development Server**
   ```bash
   npm start
   ```
   *The application will boot up at `http://localhost:4200/`. The app will automatically reload if you change any of the source files.*

## Building

To build the project for production:
```bash
npm run build:prod
```
The build artifacts will be stored in the `dist/luxelle-landing-page/` directory.

## Running Tests

To run unit tests continuously during development:
```bash
npm test
```

To run tests a single time (useful for debugging CI locally):
```bash
npm run test:run
```
