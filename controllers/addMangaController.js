const db = require("../db/queries");

async function addMangaHandler(req, res) {
    try {
        const manga = await db.getAllGenre();
    } catch (err) {
        console.error("Error adding manga", err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { addMangaHandler };