-- SQLite
INSERT INTO blogs (title,description,blog_img,user_id)
VALUES ("The Wonders of React","An in-depth look at how React revolutionizes front-end development with its component-based architecture.","https://images.unsplash.com/photo-1506748686214-e9df14c1b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fFJlY3R8ZW58MHx8fDE2NjkwNjg1NDA&ixlib=rb-1.2.1&q=80&w=800",3)

select A.blog_id,A.title,A.description,A.blog_img,A.username,A.blog_date 
from (blogs inner join users on users.user_id = blogs.user_id) AS A
WHERE blogs.title LIKE '%%'
ORDER BY A.blog_date DESC;

id: 1,
    title: "The Wonders of React",
    desc: "An in-depth look at how React revolutionizes front-end development with its component-based architecture.",
    img: "https://images.unsplash.com/photo-1506748686214-e9df14c1b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fFJlY3R8ZW58MHx8fDE2NjkwNjg1NDA&ixlib=rb-1.2.1&q=80&w=800",
    username: "JaneDoe",
    date: "2024-09-01T14:30:00Z"


    CREATE TABLE blogs (
    blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(300),
    content TEXT,
    blog_img TEXT,
    user_id INTEGER,
    blog_date TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


drop TABLE blogs;

drop TABLE posts;

SELECT * FROM blogs

DELETE from blogs where blog_id=1;

SELECT * FROM users;

CREATE TABLE comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment Text NOT NULL,
    comment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    blog_id INTEGER NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)
DROP TABLE comments
{
    comment_id: 1,
    blog_id: 101,
    comment: "Great article! I found the section on React hooks particularly insightful.",
    user_name: "Alice",
    date: "2024-09-01T10:30:00Z"
  }
  {
    comment_id: 2,
    blog_id: 102,
    comment: "I disagree with the conclusion. I think there's more to consider about state management.",
    user_name: "Bob",
    date: "2024-09-02T12:45:00Z"
  },
  {
    comment_id: 3,
    blog_id: 103,
    comment: "Very informative! The examples were clear and easy to follow.",
    user_name: "Charlie",
    date: "2024-09-03T14:00:00Z"
  },
  {
    comment_id: 4,
    blog_id: 101,
    comment: "Can you provide more details on the performance implications?",
    user_name: "Diana",
    date: "2024-09-04T16:30:00Z"
  },
  {
    comment_id: 5,
    blog_id: 104,
    comment: "I enjoyed reading this. The explanation of closures was particularly well done.",
    user_name: "Eve",
    date: "2024-09-05T09:15:00Z"
  },
  {
    comment_id: 6,
    blog_id: 105,
    comment: "I think there's a typo in the example code. Can you please review it?",
    user_name: "Frank",
    date: "2024-09-06T11:00:00Z"
  }
INSERT INTO comments (
comment,
blog_id,
user_id
)
VALUES (
"Great article! I found the section on React hooks particularly insightful.",
6,
3
)

INSERT INTO comments (
comment,
blog_id,
user_id
)
VALUES (
"comment by user 3 on blog 6.",
6,
3
),
(
"comment by user 4 on blog 6.",
6,
4
),
(
"comment by user 3 on blog 7.",
7,
3
),
(
"comment by user 4 on blog 7.",
7,
4
),
(
"comment by user 3 on blog 8.",
8,
3
)


SELECT A.comment,datetime(A.comment_date, 'localtime') AS comment_date,A.username,A.profile_image,A.user_id,A.blog_id,A.comment_id FROM (comments INNER join users on comments.user_id = users.user_id) as A
WHERE A.blog_id = 6
ORDER BY A.comment_date DESC

SELECT 
    comment,
    datetime(comment_date, 'localtime') AS comment_date_ist,
    blog_id,
    user_id
FROM 
    comments;


SELECT * FROM comments

DELETE FROM comments

SELECT CURRENT_TIMESTAMP;


select A.blog_id,A.title,A.description,A.blog_img,A.username,datetime(A.blog_date, 'localtime') AS blog_date
        from (blogs inner join users on users.user_id = blogs.user_id) AS A
        WHERE A.user_id = 2
        ORDER BY A.blog_date DESC;