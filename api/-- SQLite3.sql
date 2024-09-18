-- SQLite
INSERT INTO blogs (title,description,blog_img,user_id)
VALUES ("The Wonders of React","An in-depth look at how React revolutionizes front-end development with its component-based architecture.","https://images.unsplash.com/photo-1506748686214-e9df14c1b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fFJlY3R8ZW58MHx8fDE2NjkwNjg1NDA&ixlib=rb-1.2.1&q=80&w=800",3)

select A.blog_id,A.title,A.description,A.blog_img,A.username,A.blog_date 
from (blogs inner join users on users.user_id = blogs.user_id) AS A
WHERE blogs.title LIKE '%%';

id: 1,
    title: "The Wonders of React",
    desc: "An in-depth look at how React revolutionizes front-end development with its component-based architecture.",
    img: "https://images.unsplash.com/photo-1506748686214-e9df14c1b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fFJlY3R8ZW58MHx8fDE2NjkwNjg1NDA&ixlib=rb-1.2.1&q=80&w=800",
    username: "JaneDoe",
    date: "2024-09-01T14:30:00Z"


    CREATE TABLE blogs (
    blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    blog_img TEXT,
    user_id INTEGER,
    blog_date TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


drop TABLE blogs;

drop TABLE posts;

SELECT * FROM blogs