-- SQLite
CREATE TABLE users_new (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    profileimage BLOB
);

INSERT INTO users_new (user_id, username, email, password, profileimage)
SELECT user_id, username, email, password, 
       CAST(img AS BLOB)
FROM users;

DROP TABLE users;

select * from users

ALTER TABLE users_new RENAME TO users;


select * from users where username = "test13";

CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Auto-incrementing primary key
  username TEXT UNIQUE NOT NULL,                -- User's username
  email TEXT NOT NULL,            -- User's email, must be unique
  password TEXT NOT NULL,                -- User's password
  profile_image Text                     -- User's profile image as binary large object (BLOB)
);

DELETE FROM users;
