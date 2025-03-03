const db = require("../db/queries");
const fs = require('fs');
const path = require('node:path');



async function addMangaHandler(req, res) {
    try {
        const { name, published_year, genres, author_name } = req.body;

        const image_path = `/manga/images/${req.file.filename}`;
        const checkMangaExistResult = await db.checkMangaExist(name);
        if (!checkMangaExistResult) {
            await db.addManga(name, published_year, image_path, genres, author_name);
            res.redirect("/");
        } else {
            res.render("error");
        }
    } catch (err) {
        console.error("Error adding manga", err);
        res.status(500).send("Internal Server Error");
    }
}

async function renderMangaForm(req, res) {
    const genres = await db.getAllGenre();
    res.render("manga-form", { title: 'Add New Manga', genres: genres })
}

module.exports = { addMangaHandler, renderMangaForm };