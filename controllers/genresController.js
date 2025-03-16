const db = require("../db/queries");
const { navigationLinks } = require('../utils/constants');

async function getAllGenreHandler(req, res) {
    try {
        const genres = await db.getAllGenre();
        if (genres) {
            res.render("genres.ejs", { genres,links:navigationLinks});
        } else {
            res.status(404).send("Genres not found");
        }
    } catch (err) {
        console.error("Error fetching genres", err)
        res.status(500).send("Internal Server Error");
    }
}

async function getGenreByIdHandler(req, res) {
    const genreId = (req.params.id)
    const manga_books = await db.getGenreById(genreId)
    const genres = await db.getAllGenre();
    const currentGenre = (genres.find(genre => genre.genre_id == genreId))
    res.render("genre-id.ejs", { manga_books, currentGenre , links:navigationLinks });
}


module.exports = {
    getAllGenreHandler,
    getGenreByIdHandler
};