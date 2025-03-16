const db = require("../db/queries");

async function addGenreHandler(req, res) {
    try {
        const { genre_name } = req.body;
        await db.addGenre(genre_name);
        res.redirect("/");
    } catch (err) {
        res.status(500).render("genre-form", {
            errorMessage: 'Genre Already Exist.',
            redirectUrl: '/add-genre'
        });
    }

}

async function renderGenreForm(req, res) {
    res.render("genre-form", {
        errorMessage: null, // Explicitly set to null
        redirectUrl: '/add-genre' // Default redirect URL     
    });
}

module.exports = { addGenreHandler, renderGenreForm };