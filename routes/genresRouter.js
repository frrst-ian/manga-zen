const Router = require("express");
const genresRouter = Router();
const genresController = require("../controllers/genresController");

genresRouter.get("/genres", genresController.getAllGenreHandler);
genresRouter.get("/genres/genre-id/:id", genresController.getGenreByIdHandler);

module.exports = genresRouter;