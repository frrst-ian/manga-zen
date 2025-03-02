const express = require("express");
const addMangaRouter = express.Router();
const addMangaController = require("../controllers/addMangaController");
const upload = require('../middleware/upload');


addMangaRouter.get("/", addMangaController.renderMangaForm);

addMangaRouter.post("/", upload.single('image_path'), addMangaController.addMangaHandler)

module.exports = addMangaRouter;