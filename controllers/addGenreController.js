const db = require("../db/queries");

async function addGenreHandler(req, res) {
    try {
        const { genre_name } = req.body;
        await db.addGenre(genre_name);
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }

}

async function renderGenreForm(req, res) {
    res.render("genre-form");
}

module.exports = { addGenreHandler, renderGenreForm };