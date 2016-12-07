CREATE DATABASE music_db;

USE music_db;

CREATE TABLE music (
id INTEGER(10) AUTO_INCREMENT NOT NULL,
title VARCHAR(100) NOT NULL,
artist VARCHAR(100) NOT NULL,
genre VARCHAR(100) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO music (title, artist, genre)
VALUES ("All the Small Things", "Blink-182", "Punk"), ("Anaconda", "Nicki Minaj", "Rap"), ("Wagon Wheel", "Old Crow Medicine Show", "Country");