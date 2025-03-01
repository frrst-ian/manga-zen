const { Router } = require("express");
const mangaRouter = Router();
const mangaController = require("../controllers/mangaController");

mangaRouter.get("/manga", mangaController.getAllMangaHandler);
mangaRouter.get("/manga/manga-id/:id" , mangaController.getMangaByIdHandler)


module.exports = mangaRouter;
