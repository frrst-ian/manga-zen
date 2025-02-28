const { Router } = require("express");
const homeRouter = Router();
const homeController = require("../controllers/homeController");
const mangaController = require("../controllers/mangaController");
const genreController = require("../controllers/genreController");
const addMangaController = require("../controllers/addMangaController");
const addGenreController = require("../controllers/addGenreController")

homeRouter.get("/", homeController.getIndex);
homeRouter.get("/genres", genreController.getAllGenres);
homeRouter.get("/genre/:id", genreController.getMangaByGenre);
homeRouter.get("/genre/:id/manga-info", genreController.getMangaInfo)
homeRouter.get("/manga", mangaController.getAllManga);
homeRouter.get("/manga/:id", mangaController.getMangaById);
homeRouter.get("/add-manga", addMangaController.addManga);
homeRouter.get("/add-genre", addGenreController.addGenre);
