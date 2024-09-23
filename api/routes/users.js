import express from "express";
import multer from "multer";
import path from 'path';
import { getUserBlogs } from "../controllers/user.js";

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

router.get('/blogs/:userId',getUserBlogs)
    


export default router