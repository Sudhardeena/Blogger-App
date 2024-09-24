import express from "express";
import multer from "multer";
import path from 'path';

import { addBlog, addComment, deleteBlog, getBlog, getBlogs, updateBlog } from "../controllers/blogs.js";
import { authenticateToken } from "../controllers/authenticateToken.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../client/public/uploads/blogs'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    } 
  });
const upload = multer({ storage: storage });

const router = express.Router()


    
router.get('/',getBlogs)
router.get('/:blogId',getBlog)
router.post('/',authenticateToken,upload.single('blog_img'),addBlog)
router.delete('/:blogId',authenticateToken,deleteBlog)
router.put('/:blogId',authenticateToken,upload.single('blog_img'),updateBlog)
router.post('/comments',authenticateToken,addComment)

export default router