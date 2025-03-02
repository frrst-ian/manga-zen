const db = require("../db/queries");

async function addGenreHandler(req, res) {
    try {
        const { genre_name } = req.body;
        console.log(`Genre name: ${genre_name}`);
        await db.addGenre(genre_name);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { addGenreHandler };