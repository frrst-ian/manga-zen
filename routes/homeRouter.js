const { Router } = require("express");
const homeRouter = Router();
const homeController = ("../controllers/homeController");

homeRouter.get("/", getAllManga);
homeRouter.get("/manga/:id", getMangaById);

module.exports = homeRouter;