const db = require("../db/queries")

async function getAllMangaHandler(req, res) {
    const manga_books = await db.getAllManga();
    res.render("index", { manga_books });
}

async function getMangaByIdHandler(req, res) {
    try {
        const manga = await getMangaById(req.params.id);
        if (manga) {
            res.render("manga", { manga })
        } else {
            res.status(404).send("Manga not found");
        }
    } catch (error) {
        console.error("Error fetching manga: ", error);
        res.status(505).send("Internal Server Error");
    }
}

module.exports = {
    getAllMangaHandler,
    getMangaByIdHandler
}