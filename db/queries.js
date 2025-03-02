const pool = require("./pool");

async function getAllManga() {
    const SQLQuery = (`SELECT * FROM manga_books`)
    const { rows } = await pool.query(SQLQuery);
    return rows;
}

async function getMangaById(id) {
    const SQLQuery = (`SELECT mb.id, mb.name, mb.published_year,mb.image_path,
string_agg(DISTINCT a.author_name,', ') as authors,
string_agg(DISTINCT g.genre_name,', ') as genres
FROM manga_books mb
LEFT JOIN manga_authors ma ON mb.id = ma.id
LEFT JOIN manga_genres mg ON mb.id = mg.id
LEFT JOIN authors a ON ma.author_id = a.author_id
LEFT JOIN genres g ON mg.genre_id = g.genre_id
WHERE mb.id = $1
GROUP BY mb.id, mb.name, mb.published_year, mb.image_path;`);
    const { rows } = await pool.query(SQLQuery, [id]);
    console.log(rows[0])
    return rows[0];
}

async function getAllGenre() {
    const SQLQuery = (`SELECT * FROM genres ORDER BY genres.genre_name;`);
    const { rows } = await pool.query(SQLQuery);
    return rows;
}

async function getGenreById(genreId) {
    const SQLQuery = (`
SELECT mb.id, mb.name, mb.published_year,mb.image_path,
string_agg(DISTINCT a.author_name,', ') as authors
FROM manga_books mb
LEFT JOIN manga_authors ma ON mb.id = ma.id
LEFT JOIN manga_genres mg ON mb.id = mg.id
LEFT JOIN authors a ON ma.author_id = a.author_id
LEFT JOIN genres g ON mg.genre_id = g.genre_id
WHERE g.genre_id = $1
GROUP BY mb.id, mb.name, mb.published_year, mb.image_path;
`);
    const { rows } = await pool.query(SQLQuery, [genreId]);
    return rows;
}

// Method for adding new Manga
async function addManga(manga_name, published_year, image_path, genre_names, author_name) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const mangaInsert = await client.query('INSERT INTO manga_books(manga_name, published_year,image_path) VALUES($1,$2,$3) RETURNING id ',
            [manga_name, published_year, image_path]);

        const mangaId = mangaInsert.rows[0].id;

        for (const genre_name of genre_names) {

            const genreResult = await client.query('SELECT genre_id FROM genres WHERE genre_name = $1', [genre_name]);
            if (genreResult.rows.length == 0) {
                throw new Error(`Genre ${genre_name} does not exist`);
            }
            const genreId = genreResult.rows[0].genre_id;
            await client.query('INSERT INTO manga_genres($1 , $2) VALUES ($1, $2) ', [mangaId, genreId]);
        }

        await client.query('INSERT INTO authors(author_name) VALUES ($1) ON CONFLICT (author_name) DO NOTHING,'[author_name]);

        const authorResult = await client.query('SELECT author_id FROM authors WHERE author_name = $1');

        const authorId = authorResult.rows[0].author_id;

        await client.query('INSERT INTO manga_authors($1 , $2) VALUES ($1, $2) ', [mangaId, authorId]);

        await client.query('COMMIT');

    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

// Method for adding new genre 
async function addGenre(genre_name) {
    await pool.query('INSERT INTO genres(genre_name) VALUES($1)', [genre_name]);

}


module.exports = {
    getAllManga,
    getMangaById,
    getAllGenre,
    getGenreById,
    addManga,
    addGenre
}