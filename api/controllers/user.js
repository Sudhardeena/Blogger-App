import { db } from "../index.js";

export const getUserBlogs = async (req,res) => {
    const {userId} = req.params
    // console.log(userId)
    const getUserDetails = `
        select user_id,username,email,profile_image from users
        where user_id = ${userId}
    `
    const getBlogsQuery = `
        select A.blog_id,A.title,A.description,A.blog_img,A.username,A.blog_date
        from (blogs inner join users on users.user_id = blogs.user_id) AS A
        WHERE A.user_id = ?
        ORDER BY A.blog_date DESC;
    `
    try {
        const userDetails = await db.get(getUserDetails)
        // console.log(userDetails)
        const blogList = await db.all(getBlogsQuery,[userId])
        const modifieduserDetails = {
            userId : userDetails.user_id,
            username : userDetails.username,
            email : userDetails.email,
            profileImage : userDetails.profile_image,
        }
        const modifiedBlogList =  blogList.map(each => ({
            blogDate:each.blog_date,
            blogId: each.blog_id,
            blogImg: each.blog_img,
            desc: each.description,
            title: each.title,
            username: each.username
        }))
        // console.log(blogList)
        res.status(200).json({
            userDetails: modifieduserDetails,
            userBlogsList: modifiedBlogList
        })  
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred while getting the users blog list.' });
    }
}

export const updateUserDetails =async (req,res) => {
    const {userId} = req.params
    const { username, email} = req.body;
    // const content = req.body.content; // No need to modify content here
    const profileImage = req.file ? req.file.filename : null;

    // Use parameterized queries to prevent SQL injection
    const updateUserDetailsQuery = profileImage==null ?
    `
        UPDATE users
        SET username = ?,email =?
        WHERE user_id = ?;
    `
    :
    `
        UPDATE users
        SET username = ?,email =?,profile_image = ?
        WHERE user_id = ?;
    `

    const getUserDetails = `
        select user_id,username,email,profile_image from users
        where user_id = ${userId}
    `

    const getBlogsQuery = `
        select A.blog_id,A.title,A.description,A.blog_img,A.username,datetime(A.blog_date, 'localtime') AS blog_date
        from (blogs inner join users on users.user_id = blogs.user_id) AS A
        WHERE A.user_id = ?
        ORDER BY A.blog_date DESC;
    `

    try {
        const dbResponse = await db.run(updateUserDetailsQuery, profileImage==null? 
            [username, email, userId]
            :[username, email,profileImage, userId]);
        const userDetails = await db.get(getUserDetails)
        const modifieduserDetails = {
            userId : userDetails.user_id,
            username : userDetails.username,
            email : userDetails.email,
            profileImage : userDetails.profile_image,
        }
        const blogList = await db.all(getBlogsQuery,[userId])
        const modifiedBlogList =  blogList.map(each => ({
            blogDate:each.blog_date,
            blogId: each.blog_id,
            blogImg: each.blog_img,
            desc: each.description,
            title: each.title,
            username: each.username
        }))
        res.status(200).json({
            userDetails: modifieduserDetails,
            userBlogsList: modifiedBlogList
        }) 
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred while updating the user details.' });
    }
}
