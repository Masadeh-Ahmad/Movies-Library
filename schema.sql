DROP TABLE IF EXISTS addmovie;

CREATE TABLE IF NOT EXISTS addmovie(
id SERIAL PRIMARY KEY,
title VARCHAR(255),
release_date DATE,
poster_path VARCHAR(1000),
overview VARCHAR(1000),
comment VARCHAR(1000)

);