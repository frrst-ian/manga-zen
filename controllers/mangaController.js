const db = require("../db/queries");

async function getAllMangaHandler(req, res) {
    const manga = await db.getAllManga()
    // const SQLQuery = (`SELECT * FROM manga_books where id = $1`)
    // const { rows } = pool.query(SQLQuery, [id]);
    res.render("/manga", { manga });
}

module.exports = {
    getAllMangaHandler,
}