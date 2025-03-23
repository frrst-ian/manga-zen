## Table of Contents

1. [Description](#description)
1. [Demo](#demo)
1. [Design](#design)
1. [Features](#features)
1. [Technologies Used](#technologies-used)
1. [Project Challenges](#project-challenges)
1. [Thoughts and Observations](#thoughts-and-observations)
1. [Future Enhancements](#future-enhancements)
1. [Installation](#installation)

## Description

Manga Zen is a manga inventory, manage all your favorite manga in one place. The primary objective of this project was to practice and enhance my skills in using NodeJs and ExpressJS, and PostgresSQL. This allowed me to improve my knowledge in organizing the codebase and managing the database.  

This app has two main features: manga page and the genre page. User can view all the manga in the manga page, and view all genres in the genre page. This app also allows users to view a manga in a specific genre.

Users can add a manga and genre. They are allowed to update/delete a manga if they are an admin.
## Demo

Click here: [https://manga-zen.onrender.com/](https://manga-zen.onrender.com/)

## Design

<div align='center'>
<img src='/183_1x_shots_so.png' alt='Screenshot of desktop design'>
<img src='/377_1x_shots_so.png' alt='Screenshot of mobile design'>
</div>

## Features

- Add new manga.
- Add new genre.
- User that knows the password can update/delete a manga.
- View all  the manga.
- View all the genres.
- View a manga in a specific genre.
- Utilizes postgres to manage the all the data.

## Technologies Used

- Node JS
- Express JS
- JavaScript
- EJS
- CSS
- npm
- PostgresSQL
- Render
- Cloudinary

## Project Challenges

When I started creating this project,managing the database posed a great challenge for me.

At first, it was easy for me to use the MVC pattern to set up the initial structure of the project. But when I began to integrate the database, I faced many issues and had to refactor my controllers and routes.

This taught me to not only create an strategy for the process of the app, but also the specific functions behind those processes. I remember drawing a flowchart in the whiteboard trying to outline the process of the app, after I finished it I proceeded to the coding part. After a day of coding I suddenly realized that some parts of my code require a query in the database and I completely forgot to integrate it with the database. I ended up refactoring and a lot of google search to see the solution.

## Thoughts and Observations

During the development phase of this project, I explored many possibilities. The web app might be simple but I had to research a lot of the time to make the functionality possible. I should've focused a lot more on creating a good strategy on how app will function. But i believe that getting lost in the way is part of the process and how you respond or react is what matters.

To summarize it all, I learned a lot from building this project. Since this is my first fullstack application, I want it to live up to my standards as a programmer. Further, because of academics and different priorities, this project could've been more useful but unfortunately due to time constraints I needed to reevaluate some of the advance future that I want to integrate.

## Future Enhancements

Allowing the user to create an account and store it in a db would allow for a more flexible app. This would improve the manga collection, allowing for a more personalized collection.

Also, adding a leaderboard for the most read manga would be be great to integrate in the app. 

## Installation

To set up Manga Zen locally, please follow this steps:

1. Clone the GitHub repository to your local machine:

   ```bash
   git clone https://github.com/frrst-ian/manga-zen
   ```

2. Navigate to the project's directory:

   ```bash
   cd manga-zen
   ```

3. Install the project's dependencies using npm:

   ```bash
   npm install
   ```

4. To build the project:

   ```bash
   npm run build
   ```