const db = require("../db/queries");
const fs = require('fs');
const path = require('node:path');

async function addMangaHandler(req, res) {
    try {
        const { manga_name, published_year, genre_names, author_name } = req.body;

        const image_path = `/manga/images/${req.file.filename}`;

        await db.addManga(manga_name, published_year, image_path, genre_names, author_name);
        res.redirect("/");
    } catch (err) {
        console.error("Error adding manga", err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { addMangaHandler };