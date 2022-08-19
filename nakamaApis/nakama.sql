CREATE DATABASE nakama;

CREATE TABLE users (
  id SERIAL,
  userName VARCHAR(128) UNIQUE,
  password VARCHAR(128),
  hashedPasword VARCHAR(500),
  PRIMARY KEY(id)
);

CREATE TABLE family (
  id SERIAL,
  title VARCHAR(128),
  PRIMARY KEY(id)
);

CREATE TABLE users_In_family (
  family_id INTEGER REFERENCES family(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE posts (
  id SERIAL,
  title VARCHAR(128),
  description VARCHAR(500),
  meating_time VARCHAR(128),
  post_time VARCHAR(128),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  family_id INTEGER REFERENCES family(id) ON DELETE CASCADE,
  PRIMARY KEY(id)
);

CREATE TABLE interactions (
  id SERIAL,
  joining BOOLEAN,
  liked BOOLEAN,
  disliked BOOLEAN,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  PRIMARY KEY(id)
);

CREATE TABLE comments (
  id SERIAL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  comment VARCHAR(500),
  PRIMARY KEY(id)
);

CREATE TABLE pokes (
  id SERIAL,
  poke_time VARCHAR(128),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  target_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  haseBeenReturned BOOLEAN,
  PRIMARY KEY(id)
);



-- INSERT VALUES
-------------------------------------------------------------------------------------------------

-- insert values to users-----------------

-- Elkjop members

INSERT INTO users (userName, password, hashedPasword ) VALUES ('Ahmed', 'livet123', 'tullitullundertullovertunn');
INSERT INTO users (userName, password, hashedPasword ) VALUES ('Thobias', 'penis123', 'tullitullundertullovertunn');
INSERT INTO users (userName, password, hashedPasword ) VALUES ('Suliman', 'alkohol', 'tullitullundertullovertunn');
INSERT INTO users (userName, password, hashedPasword ) VALUES ('Christine', '#me2', 'tullitullundertullovertunn');

-- The boys members

INSERT INTO users (userName, password, hashedPasword ) VALUES ('Homelander', 'lazer', 'tullitullundertullovertunn');
INSERT INTO users (userName, password, hashedPasword ) VALUES ('Billy Butcher', 'cunt', 'tullitullundertullovertunn');
INSERT INTO users (userName, password, hashedPasword ) VALUES ('Stormfront', 'iLoveHitler', 'tullitullundertullovertunn');
INSERT INTO users (userName, password, hashedPasword ) VALUES ('A-Train', 'fastasf', 'tullitullundertullovertunn');

-- create famely

INSERT INTO family (title) VALUES ('Elkjop');
INSERT INTO family (title) VALUES ('TheBoys');

-- assign users to family------------------

-- Elkjøp
INSERT INTO users_In_family (family_id, user_id ) VALUES (1, 1);
INSERT INTO users_In_family (family_id, user_id ) VALUES (1, 2);
INSERT INTO users_In_family (family_id, user_id ) VALUES (1, 3);
INSERT INTO users_In_family (family_id, user_id ) VALUES (1, 4);
-- Theboys
INSERT INTO users_In_family (family_id, user_id ) VALUES (2, 5);
INSERT INTO users_In_family (family_id, user_id ) VALUES (2, 6);
INSERT INTO users_In_family (family_id, user_id ) VALUES (2, 7);
INSERT INTO users_In_family (family_id, user_id ) VALUES (2, 8);


-- creat a post in elkjop------------------

INSERT INTO posts (title, description, meating_time, post_time, user_id)
VALUES ('Trene?', 'noen som har lyst til å bli med på en treningsøkt?', '20.08.2022 kl 17.00', '18.08.2022 kl 13.34', 1);

-- creat a post in the boys------------------

INSERT INTO posts (title, description, meating_time, post_time, user_id)
VALUES ('kill starlight?', 'who wil help me kill Soldierboy', '20.08.2022 kl 17.00', '18.08.2022 kl 13.34', 5);

-- writing a comment in first post------------------

INSERT INTO comments (user_id, post_id, comment) VALUES (2, 1, 'trening er døll');
INSERT INTO comments (user_id, post_id, comment) VALUES (3, 1, 'Jeg skal aldri vøre på kontoret igjen');

-- create a poke---------

INSERT INTO pokes (poke_time, user_id, target_id, haseBeenReturned ) VALUES ('12.00', 1, 2, false);

-- SELECT VALUES
-------------------------------------------------------------------------------------------------

-- select users in diffrent familes

SELECT family.title, users.userName FROM family JOIN users ON family.user_id = users.id;

SELECT * from posts WHERE user_id = 1 and family_id = 1;

----------------------------------------------------------------------------------------------------------------------------
-- Drop All Tabels
DROP TABLE users CASCADE;
DROP TABLE posts CASCADE;
DROP TABLE family CASCADE;
DROP TABLE interactions CASCADE;
DROP TABLE users_In_family;
DROP TABLE posts_In_family;

-- delete a row
DELETE FROM posts
WHERE user_id = 5;


