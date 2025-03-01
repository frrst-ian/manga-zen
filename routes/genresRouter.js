const Router = require("express");
const genresRouter = Router();
const genresController = require("../controllers/genresController");

genresRouter.get("/", genresController.getAllGenreHandler);
genresRouter.get("/:id", genresController.getGenreByIdHandler);

module.exports = genresRouter;