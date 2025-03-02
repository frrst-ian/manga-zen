const express = require("express");
const addMangaRouter = express.Router();
const addMangaController = require("../controllers/addMangaController");
const { navigationLinks } = require('../utils/constants');

addMangaRouter.get("/", (req, res) => {
    res.render("manga-form" , {title: "Add New Manga"});

})

addMangaRouter.post("/", addMangaController.addMangaHandler)

module.exports = addMangaRouter;