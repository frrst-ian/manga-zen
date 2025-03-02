// Load .env 
require("dotenv").config();

// Get vital modules
const express = require("express");
const multer = require('multer');
const path = require("node:path");

// Get express method
const app = express();

// Get router modules
const indexRouter = require("./routes/indexRouter");
const mangaRouter = require("./routes/mangaRouter");
const genresRouter = require("./routes/genresRouter");
const addMangaRouter = require("./routes/addMangaRouter");
const addGenreRouter = require("./routes/addGenreRouter");

// Get the assets path ,esp. public
const assetsPath = path.join(__dirname, "public");

// Use ejs as view engine
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// Use express.static to serve static files
app.use(express.static(assetsPath))

// Use express.urlencoded to convert req.body to JS object
app.use(express.urlencoded({ extended: true }));

// Define middleware functions
app.use("/", indexRouter);
app.use("/manga", mangaRouter);
app.use("/genres", genresRouter);
app.use("/add-manga", addMangaRouter);
app.use("/add-genre", addGenreRouter);

// Error handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send(`File upload error: ${err.message}`);
  }
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Manga Zen is listening on port ${PORT}`));