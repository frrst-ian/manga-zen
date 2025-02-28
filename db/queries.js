const pool = require("./pool.js")

async function getAllManga() {
    const SQLQuery = (
        `SELECT mb.id, mb.name, mb.published_year,  string_agg(DISTINCT a.author_name, ', ') as authors,   
        string_agg(DISTINCT g.genre_name, ', ') as genres 
        FROM manga_books mb 
        LEFT JOIN manga_authors ma ON mb.id = ma.id 
        LEFT JOIN authors a ON ma.author_id = a.author_id LEFT JOIN manga_genres mg ON mb.id = mg.id 
        LEFT JOIN genres g ON mg.genre_id = g.genre_id 
        GROUP BY mb.id, mb.name, mb.published_year; `
    )
    const { rows } = await pool.query(SQLQuery)
    return rows;
}

async function getMangaById(id) {
    const { rows } = await pool.query("SELECT * FROM manga_books WHERE id = $1", [id]);
    return rows;
}

module.exports = {
    getAllManga,
    getMangaById
}