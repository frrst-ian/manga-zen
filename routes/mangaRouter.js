const express = require("express");
const mangaRouter = express.Router();
const mangaController = require("../controllers/mangaController");
const upload = require('../middleware/upload');

mangaRouter.get("/", mangaController.getAllMangaHandler);
mangaRouter.get("/:id", mangaController.getMangaByIdHandler);
mangaRouter.get("/:id/update", mangaController.mangaUpdateHandler);
mangaRouter.post("/:id/update", upload.single('image_path'), mangaController.updateMangaHandler);
mangaRouter.post("/:id/delete" , mangaController.deleteMangaHandler);


module.exports = mangaRouter;
