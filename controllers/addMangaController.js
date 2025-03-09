const db = require("../db/queries");

async function addMangaHandler(req, res) {
    try {
        const { name, published_year, description, genres, author_name } = req.body;

        // Check if manga already exists
        const checkMangaExistResult = await db.checkMangaExist(name);
        if (!checkMangaExistResult) {
            const image_path = `/manga/images/${req.file.filename}`;
            await db.addManga(name, published_year, description, image_path, genres, author_name);
            res.redirect("/");
        } else {
            // Render the manga form with an error message
            const genres = await db.getAllGenre();
            res.render("manga-form", {
                title: 'Add New Manga',
                genres: genres,
                errorMessage: 'Manga Already Exists.',
                redirectUrl: '/add-manga'
            });
        }
    } catch (err) {
        console.error("Error adding manga", err);
        res.status(500).render("manga-form", {
            title: 'Add New Manga',
            genres: await db.getAllGenre(),
            errorMessage: 'An error occurred. Please try again.',
            redirectUrl: '/add-manga'
        });
    }
}

async function renderMangaForm(req, res) {
    const genres = await db.getAllGenre();
    res.render("manga-form", {
        title: 'Add New Manga',
        genres: genres,
        errorMessage: null, // Explicitly set to null
        redirectUrl: '/add-manga' // Default redirect URL
    });
}

module.exports = { addMangaHandler, renderMangaForm };