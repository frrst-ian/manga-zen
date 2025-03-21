#! /usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();
const SQL = `
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
INSERT INTO manga_books (name, published_year, description , image_path) VALUES
('Berserk', 1989, 'Dark fantasy manga following Guts'' journey...','/manga/images/berserk.jpg'),
('Vinland Saga', 2005, 'Historical manga about Thorfinn''s Viking adventures...', '/manga/images/vinland.jpg'),
('Vagabond', 1998, 'Epic martial arts manga about Musashi Miyamoto...', '/manga/images/vagabond.jpg'),
('JoJo''s Bizarre Adventure', 1987, 'Multi-generational supernatural adventure series...', '/manga/images/jojo.jpg'),
('The Climber', 2007, 'Story about mountain climbing and personal growth...','/manga/images/climber.jpg');


INSERT INTO manga_authors (id, author_id) VALUES
(1, 2),  -- Berserk -> Kento Miura
(2, 1),  -- Vinland Saga -> Makoto Yukimura
(3, 3),  -- Vagabond -> Takehiko Inoue
(4, 4),  -- JoJo -> Hirohiko Araki
(5, 5);  


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