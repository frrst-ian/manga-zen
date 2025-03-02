const db = require("../db/queries");

async function addMangaHandler(req, res) {
    try {
        const { manga_name, published_year, image_path, genre_names, author_name } = req.body;
        await db.addManga(manga_name, published_year, image_path, genre_names, author_name);
        res.redirect("/");
    } catch (err) {
        console.error("Error adding manga", err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { addMangaHandler };