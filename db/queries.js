const pool = require("./pool");

async function getAllManga() {
    const SQLQuery = (`SELECT * FROM manga_books`)
    const { rows } = await pool.query(SQLQuery);
    return rows;
}

async function getMangaById(id) {
    const SQLQuery = (``);
    const { rows } = await pool.query(SQLQuery, [id]);
    return rows[0]
    
}

module.exports = {
    getAllManga,
    getMangaById
}