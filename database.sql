
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR(150),
	"last_name" VARCHAR(150),
	"email" VARCHAR(150) NOT NULL,
	"description" VARCHAR(350)
);

CREATE TABLE "lyric_info" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"title" VARCHAR(150) NOT NULL,
	"date_created" DATE,
	"date_edited" DATE NOT NULL,
	"author" VARCHAR(150) NOT NULL
);

CREATE TABLE "song_label" (
	"id" SERIAL PRIMARY KEY,
	"label_name" VARCHAR(50)
);

CREATE TABLE "lyrics" (
	"id" SERIAL PRIMARY KEY,
	"song_label_id" INT REFERENCES "song_label",
	"lyric_id" INT REFERENCES "lyric_info",
	"lyrics" VARCHAR(800) NOT NULL,
	"index" SERIAL
);

CREATE TABLE "query" (
	"id" SERIAL PRIMARY KEY,
	"query" VARCHAR(100) NOT NULL
);

INSERT INTO "query" ("query")
VALUES  ('Rhymes (Perfect)'), ('Antonyms'), ('Meaning Similar To...'), ('Rhymes (Approximate)'), ('Homophones'), ('Synonyms'), ('Words To Describe...'),
('Part of...'), ('Frequent Followers'), ('Frequent Predecessors'), ('Described By...');

INSERT INTO "song_label" ("label_name")
VALUES ('Chorus'), ('Pre-Chorus'), ('Verse'), ('Other'), ('Intro'), ('Outro'), ('Bridge');