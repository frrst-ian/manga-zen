const express = require("express");
const mangaRouter = express.Router();
const mangaController = require("../controllers/mangaController");

mangaRouter.get("/", mangaController.getAllMangaHandler);
mangaRouter.get("/:id", mangaController.getMangaByIdHandler)


module.exports = mangaRouter;
