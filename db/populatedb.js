#! /usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();
const SQL = `
DROP TABLE IF EXISTS manga_genres CASCADE;
DROP TABLE IF EXISTS manga_authors CASCADE;
DROP TABLE IF EXISTS manga_books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL
);

CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    genre_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE manga_books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    published_year INT,
    image_path VARCHAR(255),
    description VARCHAR(1024)
);

CREATE TABLE manga_authors (
    id INT REFERENCES manga_books(id) ON DELETE CASCADE,
    author_id INT REFERENCES authors(author_id) ON DELETE CASCADE,
    PRIMARY KEY (id, author_id)
);

CREATE TABLE manga_genres (
    id INT REFERENCES manga_books(id) ON DELETE CASCADE,
    genre_id INT REFERENCES genres(genre_id) ON DELETE CASCADE,
    PRIMARY KEY (id, genre_id)
);

INSERT INTO authors (author_name) VALUES
('Makoto Yukimura'),
('Kento Miura'),
('Takehiko Inoue'),
('Hirohiko Araki'),
('Jiro Nitta');

-- Insert genres
INSERT INTO genres (genre_name) VALUES
('Seinen'),
('Drama'),
('Shonen'),
('Adventure'),
('Romance'),
('Josei'),
('Slice of Life'),
('Horror');

-- Insert manga books
INSERT INTO manga_books (name, published_year, image_path, description) VALUES
('Berserk', 1989, '/manga/images/berserk.jpg', 'Dark fantasy manga following Guts'' journey...'),
('Vinland Saga', 2005, '/manga/images/vinland.jpg', 'Historical manga about Thorfinn''s Viking adventures...'),
('Vagabond', 1998, '/manga/images/vagabond.jpg', 'Epic martial arts manga about Musashi Miyamoto...'),
('JoJo''s Bizarre Adventure', 1987, '/manga/images/jojo.jpg', 'Multi-generational supernatural adventure series...'),
('The Climber', 2007, '/manga/climber.jpg', 'Story about mountain climbing and personal growth...');


INSERT INTO manga_authors (id, author_id) VALUES
(1, 2),  -- Berserk -> Kento Miura
(2, 1),  -- Vinland Saga -> Makoto Yukimura
(3, 3),  -- Vagabond -> Takehiko Inoue
(4, 4),  -- JoJo -> Hirohiko Araki
(5, 5);  -- The Climber -> Jiro Nitta


INSERT INTO manga_genres (id, genre_id) VALUES
(1, 1),  -- Berserk -> Seinen
(1, 8),  -- Berserk -> Horror
(2, 1),  -- Vinland Saga -> Seinen
(2, 4),  -- Vinland Saga -> Adventure
(3, 1),  -- Vagabond -> Seinen
(4, 1),  -- JoJo -> Seinen
(4, 4),  -- JoJo -> Adventure
(5, 1),  -- The Climber -> Seinen
(5, 4);  -- The Climber -> Adventure
`;

async function main() {
  console.log("seeding");
  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
    console.log("done");
  }
}

main();