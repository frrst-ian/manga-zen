const pool = require("./pool");

async function getAllManga() {
    const SQLQuery = (`SELECT * FROM manga_books`)
    const { rows } = await pool.query(SQLQuery);
    return rows;
}

async function getMangaById(id) {
    const SQLQuery = (`SELECT mb.id, mb.name, mb.published_year,mb.description,mb.image_path,
string_agg(DISTINCT a.author_name,', ') as authors,
string_agg(DISTINCT g.genre_name,', ') as genres
FROM manga_books mb
LEFT JOIN manga_authors ma ON mb.id = ma.id
LEFT JOIN manga_genres mg ON mb.id = mg.id
LEFT JOIN authors a ON ma.author_id = a.author_id
LEFT JOIN genres g ON mg.genre_id = g.genre_id
WHERE mb.id = $1
GROUP BY mb.id, mb.name, mb.published_year,mb.description, mb.image_path;`);
    const { rows } = await pool.query(SQLQuery, [id]);
    return rows[0];
}

async function getAllGenre() {
    const SQLQuery = (`SELECT * FROM genres ORDER BY genres.genre_name;`);
    const { rows } = await pool.query(SQLQuery);
    return rows;
}

async function getGenreById(genreId) {
    const SQLQuery = (`
SELECT mb.id, mb.name, mb.published_year,mb.description, mb.image_path,
string_agg(DISTINCT a.author_name,', ') as authors
FROM manga_books mb
LEFT JOIN manga_authors ma ON mb.id = ma.id
LEFT JOIN manga_genres mg ON mb.id = mg.id
LEFT JOIN authors a ON ma.author_id = a.author_id
LEFT JOIN genres g ON mg.genre_id = g.genre_id
WHERE g.genre_id = $1
GROUP BY mb.id, mb.name, mb.published_year,mb.description, mb.image_path;
`);
    const { rows } = await pool.query(SQLQuery, [genreId]);
    return rows;
}

// Method for adding new Manga
async function addManga(name, published_year, description, image_path, genres, author_name) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const mangaInsert = await client.query('INSERT INTO manga_books(name, published_year,description , image_path) VALUES($1,$2,$3,$4) RETURNING id ',
            [name, published_year, description, image_path]);

        const mangaId = mangaInsert.rows[0].id;

        // Handle genres
        for (const genre_name of genres) {
            const genreResult = await client.query(
                'SELECT genre_id FROM genres WHERE genre_name = $1',
                [genre_name]
            );

            if (!genreResult.rows[0]) {
                throw new Error(`Invalid genre: ${genre_name}`);
            }

            // Link manga to genre
            await client.query(
                `INSERT INTO manga_genres (id, genre_id)
                 VALUES ($1, $2)`,
                [mangaId, genreResult.rows[0].genre_id]
            );
        }

        await client.query('INSERT INTO authors(author_name) VALUES ($1)', [author_name]);

        const authorResult = await client.query('SELECT author_id FROM authors WHERE author_name = $1', [author_name]);

        const authorId = authorResult.rows[0].author_id;

        await client.query('INSERT INTO manga_authors(id , author_id) VALUES ($1, $2) ', [mangaId, authorId]);

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

async function mangaUpdate(id, name, published_year, description, image_path, genres, author_name) {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        // Update basic manga info
        let SQLQuery;
        let params;
        
        if (image_path) {
            SQLQuery = `UPDATE manga_books 
                       SET name = $2,
                           published_year = $3,
                           description = $4,
                           image_path = $5
                       WHERE id = $1`;
            params = [id, name, published_year, description, image_path];
        } else {
            SQLQuery = `UPDATE manga_books 
                       SET name = $2,
                           published_year = $3,
                           description = $4
                       WHERE id = $1`;
            params = [id, name, published_year, description];
        }
        
        await client.query(SQLQuery, params);
        
        // If genres are provided, update them
        if (genres && genres.length) {
            // Remove existing genre associations
            await client.query('DELETE FROM manga_genres WHERE id = $1', [id]);
            
            // Add new genre associations
            for (const genre_name of genres) {
                const genreResult = await client.query(
                    'SELECT genre_id FROM genres WHERE genre_name = $1',
                    [genre_name]
                );
                
                if (genreResult.rows[0]) {
                    await client.query(
                        'INSERT INTO manga_genres (id, genre_id) VALUES ($1, $2)',
                        [id, genreResult.rows[0].genre_id]
                    );
                }
            }
        }
        
        // If author_name is provided, update it
        if (author_name) {
            // Check if author exists
            let authorResult = await client.query(
                'SELECT author_id FROM authors WHERE author_name = $1',
                [author_name]
            );
            
            let authorId;
            if (authorResult.rows.length === 0) {
                // Create new author
                await client.query(
                    'INSERT INTO authors (author_name) VALUES ($1)',
                    [author_name]
                );
                
                authorResult = await client.query(
                    'SELECT author_id FROM authors WHERE author_name = $1',
                    [author_name]
                );
            }
            
            authorId = authorResult.rows[0].author_id;
            
            // Update manga_authors table
            await client.query('DELETE FROM manga_authors WHERE id = $1', [id]);
            await client.query(
                'INSERT INTO manga_authors (id, author_id) VALUES ($1, $2)',
                [id, authorId]
            );
        }
        
        await client.query('COMMIT');
        
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}
// Error handling
async function checkMangaExist(name) {
    const result = await pool.query("SELECT name FROM manga_books WHERE name = $1", [name]);
    return result.rows.length > 0;
}




module.exports = {
    getAllManga,
    getMangaById,
    getAllGenre,
    getGenreById,
    addManga,
    addGenre,
    mangaUpdate,
    checkMangaExist
}