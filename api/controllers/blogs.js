
import { db } from "../index.js";

export const getBlogs = async (req,res) => {
    const {search_q} = req.query;
    // console.log(searc_q)
    const getBlogsQuery = `
        select A.blog_id,A.title,A.description,A.blog_img,A.username,A.blog_date
        from (blogs inner join users on users.user_id = blogs.user_id) AS A
        WHERE blogs.title LIKE '%${search_q}%'
        ORDER BY A.blog_date DESC;
    `
    
    try {
        const blogList = await db.all(getBlogsQuery)
        const modifiedBlogList =  blogList.map(each => ({
            blogDate:each.blog_date,
            blogId: each.blog_id,
            blogImg: each.blog_img,
            desc: each.description,
            title: each.title,
            username: each.username
        }))
        // console.log(blogList)
        res.status(200).json(modifiedBlogList) 
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred while getting the blog list.' });
    } 
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
    const getCommentsQuery = `
        SELECT A.comment,datetime(A.comment_date, 'localtime') AS comment_date,A.username,A.profile_image,A.user_id,A.comment_id FROM (comments INNER join users on comments.user_id = users.user_id) as A
        WHERE A.blog_id = ?
        ORDER BY A.comment_date DESC;
    `
    try {
        const dbResponse = await db.get(getSingleBlogQuery, [blogId]);
        const commentList = await db.all(getCommentsQuery,[blogId])
        // console.log(commentList)
        const modifiedCommentList = commentList.map(each=>({
            comment:each.comment,
            commentDate: each.comment_date,
            username: each.username,
            profileImg: each.profile_image,
            userId: each.user_id,
            commentID: each.comment_id
        }))
        // console.log(modifiedCommentList)
        let singleBlogData = {
            blogDate:dbResponse.blog_date,
            blogId: dbResponse.blog_id,
            blogImg: dbResponse.blog_img,
            description: dbResponse.description,
            title: dbResponse.title,
            authorId: dbResponse.user_id,
            authorname: dbResponse.username,
            authorImg: dbResponse.profile_image,
            blogContent: dbResponse.content,
            commentsList: modifiedCommentList
        }
        // console.log(singleBlogData)
        res.status(200).json(singleBlogData);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred while getting the single blog.' });
    }
}



export const addBlog = async (req, res) => {
    const { title, description, user_id, content,blog_date } = req.body;
    // const content = req.body.content; // No need to modify content here
    const blog_img = req.file ? req.file.filename : null;

    // Use parameterized queries to prevent SQL injection
    const addBlogQuery = `
        INSERT INTO blogs (title, description, content, blog_img, user_id, blog_date)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
        const dbResponse = await db.run(addBlogQuery, [title, description, content, blog_img, user_id, blog_date]);
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

export const addComment = async (req,res)=>{
    const {comment,user_id,blog_id} = req.body
    
    const addCommentQuery = `
        INSERT INTO comments (comment, blog_id, user_id)
        VALUES (?, ?, ?)
    `;
    const getCommentsQuery = `
        SELECT A.comment,datetime(A.comment_date, 'localtime') AS comment_date,A.username,A.profile_image,A.user_id,A.comment_id FROM (comments INNER join users on comments.user_id = users.user_id) as A
        WHERE A.blog_id = ?
        ORDER BY A.comment_date DESC;
    `
    try {
        const addCommentDbResponse = await db.run(addCommentQuery,[comment,blog_id,user_id])
        const updatedCommentsList = await db.all(getCommentsQuery,[blog_id])
        const modifiedCommentList = updatedCommentsList.map(each=>({
            comment:each.comment,
            commentDate: each.comment_date,
            username: each.username,
            profileImg: each.profile_image,
            userId: each.user_id,
            commentID: each.comment_id
        }))
        res.status(200).json(modifiedCommentList)
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred while adding the comment.' });
    }

}

