const db = require("../db/queries");

async function getAllGenreHandler(req, res) {
    const genres = await db.getAllGenre();
    res.render("genres", { genres });
}

async function getGenreByIdHandler(req, res) {
    const genres = await db.getGenreById();
    res.render("genres-id", { genres });
}

module.exports = { getAllGenreHandler, getGenreByIdHandler }