const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));