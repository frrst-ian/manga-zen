const pool = require("./pool");

async function getAllManga() {
    const SQLQuery = (`SELECT * FROM manga_books`)
    const { rows } = await pool.query(SQLQuery);
    return rows;
}

async function getMangaById() {
    const SQLQuery = (`SELECT mb.id, mb.name, mb.published_year,
string_agg(DISTINCT a.author_name,', ') as authors,
string_agg(DISTINCT g.genre_name,', ') as genres
FROM manga_books mb
LEFT JOIN manga_authors ma ON mb.id = ma.id
LEFT JOIN manga_genres mg ON mb.id = mg.id
LEFT JOIN authors a ON ma.author_id = a.author_id
LEFT JOIN genres g ON mg.genre_id = g.genre_id
GROUP BY mb.id, mb.name, mb.published_year;`);
    const { rows } = await pool.query(SQLQuery);
    return rows[0];
}

async function getAllGenre() {
    const SQLQuery = (`SELECT * FROM genres ORDER BY genres.genre_name`);
    const { rows } = await pool.query(SQLQuery);
    return rows;
}

async function getGenreById(id) {
    const SQLQuery = (`SELECT g.genre_id, g.genre_name ,
       string_agg(DISTINCT mb.name, ', ') as manga_name
FROM manga_books mb
LEFT JOIN manga_genres mg ON mb.id = mg.id
LEFT JOIN genres g ON mg.genre_id = g.genre_id
WHERE g.genre_id = $1
GROUP BY g.genre_id, g.genre_name;

`);
    const { rows } = await pool.query(SQLQuery , [id]);
    return rows[0];
}



module.exports = {
    getAllManga,
    getMangaById,

    getAllGenre,
    getGenreById
}