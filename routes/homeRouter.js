const { Router } = require("express");
const homeRouter = Router();
const homeController = ("../controllers/homeController");

homeRouter.get("/", getAllMangaHandler);
homeRouter.get("/manga/:id", getMangaByIdHandler);

module.exports = homeRouter;