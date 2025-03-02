const db = require("../db/queries");
const { navigationLinks } = require('../utils/constants');

async function getAllMangaHandler(req, res) {
    try {
        const mangaList = await db.getAllManga();

        if (mangaList) {
            res.render("manga", { mangaList, links: navigationLinks });
        } else {
            res.status(404).send("Manga not found");
        }
    } catch (err) {
        console.error("Error fetching manga", err)
        res.status(500).send("Internal server error");
    }
}

async function getMangaByIdHandler(req, res) {
    try {
        const manga = await db.getMangaById(req.params.id);

        if (manga) {
            res.render("manga-id", { manga, links: links });
        } else {
            res.status(404).send("Manga not found");
        }
    } catch (err) {
        console.error("Error fetching manga", err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getAllMangaHandler,
    getMangaByIdHandler
};
