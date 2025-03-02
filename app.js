require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const indexRouter = require("./routes/indexRouter");
const mangaRouter = require("./routes/mangaRouter");
const genresRouter = require("./routes/genresRouter");
const addMangaRouter = require("./routes/addMangaRouter");

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.static(assetsPath))
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/manga", mangaRouter);
app.use("/genres", genresRouter);
app.use("/add-manga" , addMangaRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Manga Zen is listening on port ${PORT}`));