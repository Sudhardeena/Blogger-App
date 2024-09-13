import { db } from "../index.js";

export const getBlogs = async (req,res) => {
    const {searc_q} = req.query;
    // console.log(searc_q)
    const getBlogsQuery = `
        select A.blog_id,A.title,A.description,A.blog_img,A.username,A.blog_date 
        from (blogs inner join users on users.user_id = blogs.user_id) AS A
        WHERE blogs.title LIKE '%${searc_q}%';
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

export const getBlog = (req,res) => {
    res.json("from controller")
}

export const addBlog = (req,res) => {
    res.json("from controller")
}

export const deleteBlog = (req,res) => {
    res.json("from controller")
}

export const updateBlog = (req,res) => {
    res.json("from controller")
}