const { Router } = require("express");
const mangaRouter = Router();
const mangaController = require("../controllers/mangaController");

mangaRouter.get("/manga", mangaController.getAllMangaHandler);

module.exports = mangaRouter;
