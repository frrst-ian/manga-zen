const { Router } = require("express");
const addGenreRouter = Router();
const addGenreController = require("../controllers/addGenreController");

addGenreRouter.get("/", addGenreController.renderGenreForm);
addGenreRouter.post("/", addGenreController.addGenreHandler)

module.exports = addGenreRouter