require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const assetsPath = path.join(__dirname, "public");
const indexRouter = require("./routes/indexRouter");
const mangaRouter = require("./routes/mangaRouter");
const genresRouter = require("./routes/genresRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath))
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.get("/manga", mangaRouter);
app.get("/manga/manga-id/:id", mangaRouter);
app.get("/genres", genresRouter)
app.get("/genres/genre-id/:id", genresRouter)




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));