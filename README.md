# Manager-Frontend

This project is the frontend application for the management of the koolkeyz project. It is built using:

- SvelteKit
- Skeleton UI

This application is used by staff and admin users to manage the koolkeyz project. It is a single page application that allows users to view and manage the products, orders, and users of the koolkeyz project.

## Getting Started

To get started with this project, you first need to install the dependencies. You can do this by running the following command:

```bash
npm install
```

## Creation of Environment Variables

```text
########## Business API Service ##########
KOOLKEYZ_API_SERVICE=<~ business service API URL ~>

########## Authorization API Service ##########
KOOLKEYZ_AUTHORIZATION_SERVICE=<~ authorization service API URL ~>

########## GITHUB OAUTH API Service ##########
GITHUB_OAUTH_CLIENT_ID=<~ github oauth client id ~>
```

This application uses vite as its build tool Environment variables are injected into the application at build time using specific .env.[name] file name. Create the following files in the root directory of the project.

- For Local or Development environment, use `.env.development` and run the application in development using:

```bash
npm run dev
```

For Production environment, use `.env.production` and build and run the application locally using

```bash
npm run build

npm run preview
```

Once you have installed the dependencies, you can start the development server by running the following command:

```bash
npm run dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000). You can view the application by opening this URL in your browser.