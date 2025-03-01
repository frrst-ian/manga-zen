require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const assetsPath = path.join(__dirname, "public");
const indexRouter = require("./routes/indexRouter");
const mangaRouter = require("./routes/mangaRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath))
app.use(express.urlencoded({ extended: true }));

app.get("/", indexRouter);
app.get("/manga", mangaRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));