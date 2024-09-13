import express from "express";
import { addBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controllers/blogs.js";



const router = express.Router()


    
router.get('/',getBlogs)
router.get('/:id',getBlog)
router.get('/',addBlog)
router.get('/:id',deleteBlog)
router.get('/:id',updateBlog)

export default router