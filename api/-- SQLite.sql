-- SQLite
PRAGMA foreign_keys;

select sqlite_version();

CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    img TEXT
);

CREATE TABLE posts (
    blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT,
    blog_img TEXT NOT NULL,
    blog_date DATE NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO users (username, email, password, img) VALUES
('john_doe', 'john@example.com', 'password123', 'john_doe.jpg'),
('jane_smith', 'jane@example.com', 'securePass456', 'jane_smith.jpg'),
('alice_johnson', 'alice@example.com', 'alice7890', 'alice_johnson.jpg'),
('bob_brown', 'bob@example.com', 'bobpass321', 'bob_brown.jpg');


select * from users;

INSERT INTO posts (title, description, content, blog_img, blog_date, user_id) VALUES
('Introduction to SQLite', 'An overview of SQLite and its features.', 'SQLite is a self-contained, serverless database engine...', 'sqlite_intro.jpg', '2024-09-01', 1),
('Understanding Foreign Keys', 'A guide to foreign keys and their usage in databases.', 'Foreign keys are used to enforce referential integrity...', 'foreign_keys.jpg', '2024-09-02', 2),
('Getting Started with SQL', 'Basic SQL commands and their usage.', 'SQL is a standard language for managing and manipulating databases...', 'sql_guide.jpg', '2024-09-03', 1),
('Database Indexing', 'How to improve database performance using indexes.', 'Indexing helps speed up query performance by...', 'database_indexing.jpg', '2024-09-04', 3);

select * from posts;

select * from users inner join posts on users.user_id = posts.user_id;

DELETE FROM users
WHERE user_id = 3;
