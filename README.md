# eCommerce-Application

Deploy: [https://ecommerce-a-p-p.netlify.app/](https://ecommerce-a-p-p.netlify.app/)

## Description:

Ecommece-application Training Project

It is a comprehensive online shopping portal that provides an interactive and hassle-free experience for users. From product discovery to checkout, the app ensures a smooth user transition, increasing their interest and increasing their confidence in the purchase.

Users can browse a wide range of products, view detailed descriptions, add items they like to the shopping cart, and proceed to checkout. It includes features such as user registration and login.📝🔐, product search🔍, product categorization and sorting to make the shopping process more orderly and convenient.

An important aspect of our app is that it is responsive so that it looks great on various devices with a minimum resolution of 390 pixels. This feature makes shopping enjoyable, no matter which device the user prefers.

The key pages in the application include:

* Login and registration pages🖥️
* Home page 🏠
* Product page in the catalog 📋
* Detailed product page🔎
* User profile page👤
* Shopping cart page🛒
* About us page🙋♂️🙋♀️

The application is powered by CommerceTools, a leading provider of commercial solutions for B2C and B2B enterprises. CommerceTools offers a cloud-based commercial platform based on microservices that allows brands to create unique and attractive digital commerce opportunities.

## Technology stack:

JS, TS, Vite, Vue, Vue router, Pinia, commercetools, axios

## All available scripts and instructions for use:

The scripts are called using the example command -> npm run dev

 - `npm run prepare`: Run both BEFORE the package is packed and published, and on local npm install without any arguments. This is run AFTER prepublish, but BEFORE prepublishOnly.

 - `npm run depcheck`: A tool for analyzing the dependencies in a project to see: how each dependency is used, which dependencies are useless, and which dependencies are missing from package.json.

 - `npm run dev`: The development mode has a hot reboot, it is convenient to pick up all changes on the fly during development

 - `npm run build`: At the beginning, he does type checks in Vue projects, then collects the entire project and outputs it to a folder./dist

 - `npm run lint`: this is the command to run ESLint, a tool for static code analysis and troubleshooting

 - `npm run format`: this is the command to run Prettier, a code formatting tool

 - `npm run build`: this is the command to run Storybook in development mode. It runs Storybook on a local server and allows you to view and develop components in real time.

 - `npm run build-storybook`: this is a command to build a Storybook into static files. It creates a static version of your Storybook that can be hosted on any web server. The build result is saved in the `storybook-static` directory by default

 - `npm run npm-check`: Check for outdated, incorrect, and unused dependencies.

 - `npm run npm-check-updates`: This script runs ncu (npm-check-updates) which checks for updates to project's dependencies without modifying the package.json file.

 - `npm run npm-updates`: This script runs ncu -u which updates project's dependencies to their latest versions, modifying the package.json file accordingly.

 - `npm run test:unit`: This script runs unit tests using vitest.

 - `npm run test:coverage`: This script runs unit tests with coverage analysis using vitest.

## Step-by-step instructions for setting up and running the project locally:

Download the project through the **git clone** command.

We enter the project through **Visual Code**.

In the terminal, we write the command **npm i** -> to install all dependencies

In the terminal, we write the command **copy .env.example .env** -> to create an .env file based on .env.example

Open the **Extensions** tab in the search bar, write the **@recommended** command and install plugins, these plugins are needed to work correctly in **Visual Code**.

In the terminal, write the command npm run dev -> a link will appear in the terminal, insert this link into the browser and see the result.
