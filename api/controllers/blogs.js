
import { db } from "../index.js";

export const getBlogs = async (req,res) => {
    const {searc_q} = req.query;
    // console.log(searc_q)
    const getBlogsQuery = `
        select A.blog_id,A.title,A.description,A.blog_img,A.username,A.blog_date
        from (blogs inner join users on users.user_id = blogs.user_id) AS A
        WHERE blogs.title LIKE '%${searc_q}%'
        ORDER BY A.blog_date DESC;
    `
    let blogList = await db.all(getBlogsQuery)
    blogList =  blogList.map(each => ({
        blogDate:each.blog_date,
        blogId: each.blog_id,
        blogImg: each.blog_img,
        desc: each.description,
        title: each.title,
        username: each.username
    }))
    // console.log(blogList)
    res.json(blogList)  
}

export const getBlog = async (req,res) => {
    const {blogId} = req.params
    // console.log(blogId)
    // res.json(blogId)
    const getSingleBlogQuery = `
        select A.blog_id,A.title,A.description,A.blog_img,A.username,A.blog_date,A.profile_image,A.content,blogs.user_id
        from (blogs inner join users on users.user_id = blogs.user_id) AS A
        WHERE blogs.blog_id = ?;
    `
    try {
        const dbResponse = await db.get(getSingleBlogQuery, [blogId]);
        let singleBlogData = {
            blogDate:dbResponse.blog_date,
            blogId: dbResponse.blog_id,
            blogImg: dbResponse.blog_img,
            description: dbResponse.description,
            title: dbResponse.title,
            authorId: dbResponse.user_id,
            authorname: dbResponse.username,
            authorImg: dbResponse.profile_image,
            blogContent: dbResponse.content
        }
        // console.log(singleBlogData)
        res.status(200).json(singleBlogData);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred while getting the single blog.' });
    }
}



export const addBlog = async (req, res) => {
    const { title, description, user_id, content } = req.body;
    // const content = req.body.content; // No need to modify content here
    const blog_img = req.file ? req.file.filename : null;

    // Use parameterized queries to prevent SQL injection
    const addBlogQuery = `
        INSERT INTO blogs (title, description, content, blog_img, user_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    try {
        const dbResponse = await db.run(addBlogQuery, [title, description, content, blog_img, user_id]);
        const blogId = dbResponse.lastID; // Use lastID to get the ID of the inserted row
        res.status(200).json({ blogId: blogId });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred while adding the blog.' });
    }
};



export const deleteBlog =async (req,res) => {
    const {blogId} = req.params
    // console.log(blogId)
    const deleteBlogQuery = `
    DELETE FROM blogs WHERE blog_id = ?`
    try {
        const dbResponse = await db.run(deleteBlogQuery, [blogId]);
        
        res.status(200).json("Blog deleted successfully");
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred while deleting the blog.' });
    }
}

export const updateBlog =async (req,res) => {
    const {blogId} = req.params
    const { title, description, user_id, content } = req.body;
    // const content = req.body.content; // No need to modify content here
    const blog_img = req.file ? req.file.filename : null;

    // Use parameterized queries to prevent SQL injection
    const updateBlogQuery = blog_img==null ?
    `
        UPDATE blogs
        SET title = ?,description =?,content = ?,user_id = ?
        WHERE blog_id = ?;
    `
    :
    `
        UPDATE blogs
        SET title = ?,description =?,content = ?,blog_img = ?,user_id = ?
        WHERE blog_id = ?;
    `

    try {
        const dbResponse = await db.run(updateBlogQuery, blog_img==null? 
            [title, description, content,user_id,blogId]
            :[title, description, content, blog_img, user_id,blogId]);
        res.status(200).json("Blog Updated Successfully");
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred while updating the blog.' });
    }
}