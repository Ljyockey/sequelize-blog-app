BEGIN;

CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	first_name TEXT,
	last_name TEXT,
	username TEXT NOT NULL
);

CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	title TEXT NOT NULL,
	content TEXT,
	author_id INTEGER REFERENCES authors NOT NULL
);

CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	comment_text TEXT NOT NULL,
	author_id INTEGER REFERENCES authors ON DELETE CASCADE NOT NULL,
	post_id INTEGER REFERENCES posts ON DELETE CASCADE NOT NULL
);

COMMIT;