const express = require("express");
const mangaRouter = express.Router();
const mangaController = require("../controllers/mangaController");

mangaRouter.get("/", mangaController.getAllMangaHandler);
mangaRouter.get("/:id", mangaController.getMangaByIdHandler);
mangaRouter.get("/:id/update", mangaController.mangaUpdateHandler);


module.exports = mangaRouter;
