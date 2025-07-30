#! /usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();

const SQL = `
-- Drop tables if they exist (in correct order due to foreign key constraints)
DROP TABLE IF EXISTS manga_genres CASCADE;
DROP TABLE IF EXISTS manga_authors CASCADE;
DROP TABLE IF EXISTS manga_books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS genres CASCADE;

-- Create authors table
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL UNIQUE
);

-- Create genres table
CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    genre_name VARCHAR(100) NOT NULL UNIQUE
);

-- Create manga_books table
CREATE TABLE manga_books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    published_year INTEGER,
    description TEXT,
    image_path VARCHAR(500)
);

-- Create manga_authors junction table (many-to-many relationship)
CREATE TABLE manga_authors (
    id INTEGER REFERENCES manga_books(id) ON DELETE CASCADE,
    author_id INTEGER REFERENCES authors(author_id) ON DELETE CASCADE,
    PRIMARY KEY (id, author_id)
);

-- Create manga_genres junction table (many-to-many relationship)
CREATE TABLE manga_genres (
    id INTEGER REFERENCES manga_books(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres(genre_id) ON DELETE CASCADE,
    PRIMARY KEY (id, genre_id)
);

-- Create indexes for better performance
CREATE INDEX idx_manga_books_name ON manga_books(name);
CREATE INDEX idx_manga_books_published_year ON manga_books(published_year);
CREATE INDEX idx_authors_name ON authors(author_name);
CREATE INDEX idx_genres_name ON genres(genre_name);
CREATE INDEX idx_manga_authors_manga_id ON manga_authors(id);
CREATE INDEX idx_manga_authors_author_id ON manga_authors(author_id);
CREATE INDEX idx_manga_genres_manga_id ON manga_genres(id);
CREATE INDEX idx_manga_genres_genre_id ON manga_genres(genre_id);

-- Insert authors
INSERT INTO authors (author_name) VALUES
('Makoto Yukimura'),
('Kentaro Miura'),  -- Fixed the name from 'Kento Miura'
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
INSERT INTO manga_books (name, published_year, description, image_path) VALUES
('Berserk', 1989, 'Berserk is a Japanese manga series written and illustrated by Kentaro Miura. Set in a medieval Europe–inspired dark fantasy world, the story centers on the characters of Guts, a lone swordsman, and Griffith, the leader of a mercenary band called the "Band of the Hawk". The series follows Guts'' journey seeking revenge on Griffith, who betrayed him and sacrificed his comrades to become a powerful demonic being.','https://res.cloudinary.com/dbzpmzf05/image/upload/v1742568949/berserk_wdfhsr.jpg'),
('Vinland Saga', 2005, 'Vinland Saga is a Japanese manga series written and illustrated by Makoto Yukimura. The series is published by Kodansha, and was first serialized in the boys-targeted manga magazine Weekly Shōnen Magazine before moving to Monthly Afternoon, aimed at young adult men. As of June 2024, its chapters have been collected in 28 tankōbon volumes. Vinland Saga has been licensed for English-language publication by Kodansha USA. The story is a dramatization of the story of Thorfinn Karlsefni and his expedition to find Vinland, with the majority of the story covering his fictional counterpart''s transition from a bloodthirsty, revenge-filled teenager into a pacifistic young man; juxtaposed against this is the rise to power of King Canute, the journey of his own counterpart directly contrasting with that of Thorfinn''s.', 'https://res.cloudinary.com/dbzpmzf05/image/upload/v1742568949/vinland_dlhnui.jpg'),
('Vagabond', 1998, 'Vagabond is a Japanese epic martial arts manga series written and illustrated by Takehiko Inoue. It portrays a fictionalized account of the life of Japanese swordsman Musashi Miyamoto, based on Eiji Yoshikawa''s novel Musashi. It has been serialized in Kodansha''s seinen manga magazine Morning since September 1998, with its chapters collected in 37 tankōbon volumes by July 2014. Viz Media licensed the series for English release in North America and has published the 37 volumes by April 2015. The series has been on indefinite hiatus since May 2015.', 'https://res.cloudinary.com/dbzpmzf05/image/upload/v1742568951/vagabond_ymktxt.jpg'),
('JoJo''s Bizarre Adventure', 1987, 'JoJo''s Bizarre Adventure (Japanese: ジョジョの奇妙な冒険, Hepburn: JoJo no Kimyō na Bōken) is a Japanese manga series written and illustrated by Hirohiko Araki. It was originally serialized in Shueisha''s shōnen manga magazine Weekly Shōnen Jump from 1987 to 2004, and was transferred to the monthly seinen manga magazine Ultra Jump in 2005. The series is divided into a total of nine story arcs, each following a new protagonist bearing the "JoJo" nickname. JoJo''s Bizarre Adventure is the largest ongoing manga series published by Shueisha by number of volumes, with its chapters collected in 136 tankōbon volumes as of December 2024.', 'https://res.cloudinary.com/dbzpmzf05/image/upload/v1742568950/jojo_ihfbn1.jpg'),
('The Climber', 2007, 'The Climber is a Japanese manga series written by Shin-ichi Sakamoto, Yoshio Nabeta (first two volumes), and Hiroshi Takano (volumes 2–4), and illustrated by Sakamoto, based on a two-volume 1973 novel by Jirō Nitta. It was originally serialized in Shueisha''s seinen manga magazine Weekly Young Jump from November 2007 to October 2012, with its chapters collected in 17 tankōbon volumes. It has been licensed for English release in North America by Viz Media.','https://res.cloudinary.com/dbzpmzf05/image/upload/v1742565423/manga-zen/manga-1742565417997.jpg');

-- Insert manga-author relationships
INSERT INTO manga_authors (id, author_id) VALUES
(1, 2), -- Berserk -> Kentaro Miura
(2, 1), -- Vinland Saga -> Makoto Yukimura
(3, 3), -- Vagabond -> Takehiko Inoue
(4, 4), -- JoJo -> Hirohiko Araki
(5, 5); -- The Climber -> Jiro Nitta

-- Insert manga-genre relationships
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
  console.log("Creating schema and seeding database...");
  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database schema created and seeded successfully!");
  } catch (err) {
    console.error("Error creating schema and seeding database:", err);
  } finally {
    await client.end();
    console.log("Done!");
  }
}

main();