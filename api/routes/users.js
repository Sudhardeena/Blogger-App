import express from "express";
import multer from "multer";
import path from 'path';
import { getUserBlogs,  updateUserDetails } from "../controllers/user.js";
import { authenticateToken } from "../controllers/authenticateToken.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'https://blogger-app-five.vercel.app/public/uploads/users'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  } 
});
const upload = multer({ storage: storage });



const router = express.Router()

router.get('/blogs/:userId',getUserBlogs)
router.put('/:userId',authenticateToken,upload.single('profileImage'),updateUserDetails)
    


export default router