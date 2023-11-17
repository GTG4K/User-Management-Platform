# User Management Platform | Lavapi

## Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

## Prerequisites

- **Node JS** (version 12.X and up)
- **npm** (version 6 and up)

## Tech Stack

- **Vue3:** A dynamic front-end framework for creating interactive user interfaces.
- **TypeScript:** Enhances code quality and maintainability through strong typing.
- **Pinia:** Manages application state for clean and efficient data flow.
- **Vue Router:** Facilitates seamless navigation within the application.
- **Axios:** Handles HTTP requests for fast and secure data retrieval.
- **TailwindCSS:** Provides a utility-first approach for stylish and consistent styling.
- **DummyJson:** Dummy JSON API for testing purposes.

## Getting Started

1. Clone the user-management-platform repository from GitHub:

```sh
   git clone https://github.com/GTG4K/User-Management-Platform.git
```

2. Install the dependencies.

```sh
npm install
```

3. now you can run the application from terminal:

```sh
npm run dev
```

### Project Structure

```bash
├── node_modules         # External packages
├── public               # Public directories
└── src                  # Project source codes
    ├── assets           # Project images and fonts
    ├── components       # Vue components
        └── base         # Reusable, generic components
    ├── config           # Package configuration
    ├── router           # Project router
    ├── services         # Backend configuration
    ├── store            # State management
    ├── ts               # Custom TypeScript interfaces and enums
    │   ├── enums
    │   └── interfaces
    ├── Util             # Utility packages
    │   └── validators   # Utility for validation
    └── views            # Router components

```