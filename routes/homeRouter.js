const { Router } = require("express");
const homeRouter = Router();
const homeController = require("../controllers/homeController");

homeRouter.get("/", homeController.getAllMangaHandler);
homeRouter.get("/manga/:id", homeController.getMangaByIdHandler);

module.exports = homeRouter;