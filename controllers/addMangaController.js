const db = require("../db/queries");

async function addMangaHandler(req, res) {
    try {
        const newManga = await db.addManga();
        res.render("add-manga.ejs", { newManga })
    } catch (err) {
        console.error("Error adding manga", err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { addMangaHandler };