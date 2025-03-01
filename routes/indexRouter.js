const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
// const genreController = require("../controllers/genreController");
// const addMangaController = require("../controllers/addMangaController");
// const addGenreController = require("../controllers/addGenreController")

// indexRouter.get("/genres", genreController.getAllGenres);
// indexRouter.get("/genre/:id", genreController.getMangaByGenre);
// indexRouter.get("/genre/:id/manga-info", genreController.getMangaInfo)
indexRouter.get("/", indexController.getIndex);

// indexRouter.get("/add-manga", addMangaController.addManga);
// indexRouter.get("/add-genre", addGenreController.addGenre);

module.exports = indexRouter;