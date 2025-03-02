const { Router } = require("express");
const addGenreRouter = Router();
const addGenreController = require("../controllers/addGenreController");

addGenreRouter.get("/", addGenreController.addGenreHandler);

module.exports = addGenreRouter