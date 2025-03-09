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
            res.render("manga-id", { manga, links: navigationLinks });
        } else {
            res.status(404).send("Manga not found");
        }
    } catch (err) {
        console.error("Error fetching manga", err);
        res.status(500).send("Internal Server Error");
    }
}

async function mangaUpdateHandler(req, res) {
    try {
        const id = req.params.id;
        const manga = await db.getMangaById(id);
        const genres = await db.getAllGenre();
        res.render("update-form.ejs", { manga, genres, links: navigationLinks, title: "Update Manga" })
    } catch (err) {
        console.error("Error fetching manga", err);
        res.status(500).send("Internal Server Error");
    }
}

async function updateMangaHandler(req, res) {
    try {
        const id = req.params.id;
        const { name, published_year, description, genres, author_name } = req.body;

        // Handle file upload if a new image is provided
        let image_path = null;
        if (req.file) {
            image_path = `/manga/images/${req.file.filename}`;
        }

        await db.mangaUpdate(id, name, published_year, description, image_path, genres, author_name);
        res.redirect(`/manga/${id}`);
    } catch (err) {
        console.error("Error updating manga", err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getAllMangaHandler,
    getMangaByIdHandler,
    mangaUpdateHandler,
    updateMangaHandler
};

