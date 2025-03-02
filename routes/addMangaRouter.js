const express = require("express");
const addMangaRouter = express.Router();
const addMangaController = require("../controllers/addMangaController");

addMangaRouter.get("/", addMangaController.addMangaHandler);

module.exports = addMangaRouter;