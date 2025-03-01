const db = require("../db/queries");

async function getAllGenreHandler(req, res) {
    try {
        const genres = await db.getAllGenre();

        if (genres) {
            res.render("genres.ejs", { genres });
        } else {
            res.status(404).send("Genres not found");
        }
    } catch (err) {
        console.error("Error fetching genres", err)
        res.status(500).send("Internal Server Error");
    }
}

async function getGenreByIdHandler(req, res) {
    const genres = await db.getGenreById(req.params.id);
    res.render("genre-id.ejs", { genres });
}



module.exports = {
    getAllGenreHandler,
    getGenreByIdHandler
};