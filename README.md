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

JS, TS, Vite, Vue, Vue router, Pinia

## All available scripts and instructions for use:

The scripts are called using the example command -> npm run dev

 - prepare: This script seems to be intended for setting up your project environment. It likely installs dependencies, possibly including Husky, a tool for managing Git hooks.

 - depcheck: This script likely checks for any unused or unnecessary dependencies in your project. It helps to keep your project lean and efficient by identifying dependencies that are not being utilized.

 - dev: This script is used to start the development server using Vite, a build tool that focuses on fast development. It provides hot module replacement (HMR) which allows you to see changes in your code without a full page reload.

 - build: This script is for building your project. It performs type checks for Vue projects and then compiles the entire project, outputting it to the ./dist directory.

 - lint: This script runs ESLint with specific configurations (--ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts) to check for and fix linting errors in your project's JavaScript and Vue files. It also ignores files listed in .gitignore.

 - format: This script uses Prettier to automatically format your source code files (src/ directory) according to predefined rules. It helps maintain consistent code style across your project.
storybook: This script starts Storybook in development mode. Storybook is a tool for developing UI components in isolation. It runs a local server and allows you to view and interact with your components in a browser.

 - build-storybook: This script builds your Storybook into static files, which can be deployed to a web server. It generates a static version of your Storybook in the storybook-static directory by default.
npm-check: This script likely runs npm-check, a tool for checking the status of your npm dependencies. It provides information about which dependencies are outdated or unused.

 - npm-check-updates: This script runs ncu (npm-check-updates) which checks for updates to your project's dependencies without modifying the package.json file.

 - npm-updates: This script runs ncu -u which updates your project's dependencies to their latest versions, modifying the package.json file accordingly.

 - test:unit: This script runs unit tests using vitest. It likely executes tests for your project's components or modules.

 - test:coverage: This script runs unit tests with coverage analysis using vitest. It provides information about how much of your code is covered by tests.

## Step-by-step instructions for setting up and running the project locally:

Download the project through the **git clone** command.

We enter the project through **Visual Code**.

In the terminal, we write the command **npm i** -> install all dependencies

Open the **Extensions** tab in the search bar, write the **@recommended** command and install plugins, these plugins are needed to work correctly in **Visual Code**.

In the terminal, write the command npm run dev -> a link will appear in the terminal, insert this link into the browser and see the result.
