const db = require("../db/queries");
const { navigationLinks } = require('../utils/constants');

const secretPassword = process.env.SECRET_PASSWORD

async function getAllMangaHandler(req, res) {
    try {
        const mangaList = await db.getAllManga();

        if (mangaList) {
            res.render("manga", { mangaList, links: navigationLinks });
        } else {
            res.status(404).send("Manga not found");
        }
    } catch (err) {
        console.error("Error fetching manga:", err.message);
        console.error("Error stack:", err.stack);
        console.error("Error fetching manga", err)
        res.status(500).send("Internal server error");
    }
}

async function getMangaByIdHandler(req, res) {
    try {
        const manga = await db.getMangaById(req.params.id);

        if (manga) {
            res.render("manga-id", { manga, links: navigationLinks });
        } else {
            res.status(404).send("Manga not found");
        }
    } catch (err) {
        console.error("Error fetching manga", err);
        res.status(500).send("Internal Server Error");
    }
}

async function mangaUpdateHandler(req, res) {
    try {
        const { id } = req.params;
        const manga = await db.getMangaById(id);
        const genres = await db.getAllGenre();
        res.render("update-form", {
            manga: manga,
            genres: genres,
            title: "Update Manga",
            errorMessage: null, // No error by default
            redirectUrl: `/manga/${id}/update` // Redirect URL for the error message
        });
    } catch (err) {
        console.error("Error fetching manga for update", err);
        res.status(500).send("Internal Server Error");
    }
}

async function updateMangaHandler(req, res) {
    const { id } = req.params;
    const { name, published_year, description, genres, author_name, password } = req.body;

    try {
        // Check if the password is correct
        if (password !== process.env.SECRET_PASSWORD) {
            const manga = await db.getMangaById(id);
            const genres = await db.getAllGenre();
            return res.render("update-form", {
                manga: manga,
                genres: genres,
                title: "Update Manga",
                errorMessage: 'Incorrect password. Action not allowed.', // Error message
                redirectUrl: `/manga/${id}/update` // Redirect URL
            });
        }

        // If the password is correct, update the manga
        let image_path = null;
        if (req.file) {
            image_path = req.file.secure_url || req.file.path;;
            console.log('Update - Cloudinary URL:', image_path);
            console.log('Update - Full File Info:', req.file);
        }

        await db.mangaUpdate(id, name, published_year, description, image_path, genres, author_name);
        res.redirect(`/manga/${id}`);
    } catch (err) {
        console.error("Error updating manga", err);
        res.status(500).render("update-form", {
            manga: await db.getMangaById(id),
            genres: await db.getAllGenre(),
            title: "Update Manga",
            errorMessage: 'An error occurred. Please try again.', // Error message
            redirectUrl: `/manga/${id}/update` // Redirect URL
        });
    }
}

async function deleteConfirmation(req, res) {
    try {
        const { id } = req.params;
        const manga = await db.getMangaById(id);
        res.render("delete-confirm", {
            manga: manga,
            errorMessage: null, // No error by default
            redirectUrl: `/manga/${id}/delete/confirm` // Redirect URL for the error message
        });
    } catch (err) {
        console.error("Error fetching manga for deletion", err);
        res.status(500).send("Internal Server Error");
    }
}

async function deleteMangaHandler(req, res) {
    const { id } = req.params;
    const { password } = req.body;

    try {
        // Check if the password is correct
        if (password !== process.env.SECRET_PASSWORD) {
            const manga = await db.getMangaById(id);
            return res.render("delete-confirm", {
                manga: manga,
                errorMessage: 'Incorrect password. Action not allowed.', // Error message
                redirectUrl: `/manga/${id}/delete/confirm` // Redirect URL
            });
        }

        // If the password is correct, delete the manga
        await db.deleteManga(id);
        res.redirect("/manga");
    } catch (err) {
        console.error("Error deleting manga", err);
        res.status(500).render("delete-confirm", {
            manga: await db.getMangaById(id),
            errorMessage: 'An error occurred. Please try again.', // Error message
            redirectUrl: `/manga/${id}/delete/confirm` // Redirect URL
        });
    }
}

module.exports = {
    getAllMangaHandler,
    getMangaByIdHandler,
    mangaUpdateHandler,
    updateMangaHandler,
    deleteMangaHandler,
    deleteConfirmation
};

