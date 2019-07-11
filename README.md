

## Table of contents
* [Intro](#Palette-Pal-App)
* [Screenshots](#Screenshots)
* [Getting Started](#Getting-Started)
* [How to Use](#How-to-Use)
* [Project Emphasis](#Project-Emphasis)
* [UI Design](#UI-Design)
* [Future Plans](#Future-Plans)
* [License](#License)


# Palette Pal App

This app was created by Nim Garcia and Lynne Rang.

This project is a Turing front-end development project focused on working with React and and Enzyme/Jest on the front-end and Express, Knex, SQL, Postgres, and middleware on the back-end.

This was an app inspired by palette picker websites like Coolers or HTMLColorCodes for generating and editing different color palettes.  In this app, you can also save and manage palettes within different projects/categories and edit them after they are saved.


## Screenshots

![Home page](/screenshots/1.png)
![Home page held colors](/screenshots/2.png)
![Projects page](/screenshots/3.png)
![Projects page edit color](/screenshots/4.png)
![Login](/screenshots/5.png)


## Getting Started

You can view this application live on Heroku at: https://palette-pal-fe.herokuapp.com/ !

OR

If you'd like to clone this repository to your own local machine, run the following commands in your terminal:

```shell
git clone https://github.com/nimsum/palette-pal-frontend.git
git clone https://github.com/nimsum/palette-pal-backend.git
```

Then for each repo, run the following command to install dependencies:

```shell
npm install
```

To view the app in action, run the following command in your terminal for the front-end:

```bash
npm start
```

Then run the following command in your terminal to start the server for the back-end:

```bash
node server.js
```

Run an ```npm install```, then create your own local database called 'palette_auth_test' using psql:

```bash
psql
# CREATE DATABASE palette_auth_test;
\q
```

Run the following commands to create the database tables and seed them with test data:

```bash
knex migrate:latest
knex seed:run
```

Then, go to `http://localhost:3000/` in your browser to see the code running in the browser.  

---

## How to Use

1. On the home page, you can see a randomized color palette with five colors.  You can hit the space bar or click "Generate New Palette" to get a new palette.
2. You can also see hsl and rgb values for the colors by using the format drop-down at the top right.
3. Instead of randomizing each color, you can also choose to see complementary color palettes or a gradient palette between two random colors by using the "Mode" dropdown at the top right.
4. You can lock colors by clicking the "Hold" checkbox at the bottom of each color, and when you hit the space bar it will refresh any unheld colors.
5. The "Generate New Palette" button will always refresh all five colors whether they are held or not.
6. You can also edit each color by clicking the pencil icon and using the editor to choose what new color you would like.
7. If you sign up for an account and log in, you can save a palette by clicking "Save Palette" at the bottom right and entering palette details.
8. You can also access the "My Projects" page and manage your own projects and palettes if you are signed into an account.
9. In the "My Projects" page, you can edit project or palette names by clicking directly on them.  You can also edit palette colors using the pencil, icon, delete palettes by clicking the X at the top right, or delete whole projects by clicking the trash can in each project section.
10. You can also view hsl and rgb values in the "My Projects" page using the "Format" dropdown, or filter to specific projects by selecting from the "Project" dropdown.


## UI Design

Given the limited time frame, we created a high-fidelity prototype of the design on Figma to have a more detailed idea of where we wanted everything to go on the different pages.

![Figma designs](/screenshots6/.png)


## Future Plans

We plan to keep working on this to add more features like the following:
- Add media queries for better responsiveness across devices
- Add field validation & error handling in dialogs
- Add search bar to "My Projects" page to allow searching by project or palette names
- Refactor login and sign up dialogs into react router routes
- Load save palette dialog with specific project when "add new palette" is clicked from project screen
- Implement drag and drop to reorder projects and palettes


## Project Emphasis

View the project specification on the <a href="http://frontend.turing.io/projects/palette-picker.html">Turing webpage for this project</a>.

### Front-End
- [x] SCSS
- [x] Flex-box
- [x] UI design
- [x] React
- [x] React router
- [x] Es6 classes
- [x] Async JavaScript
- [x] API fetches
- [x] Enzyme & Jest testing
- [x] Webpack
- [x] NPM

### Back-end
- [x] Node.js/Express
- [x] Knex
- [x] Relational Databases
- [x] SQL
- [x] Postgres
- [x] JWT Authentication
- [x] Express Middleware


## Licensing

All credit goes to <a href="turing.io">Turing School of Software</a> for providing the project specifications.
