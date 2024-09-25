import express from "express";
import multer from "multer";
import path from 'path';

import { login, logout, register } from "../controllers/auth.js";

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'https://blogger-app-five.vercel.app/public/uploads/users'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    } 
  });
const upload = multer({ storage: storage });

// const storage = multer.memoryStorage();
// const upload = multer({ storage });


const router = express.Router()



router.post('/register', upload.single('profileImage'), register)
router.post('/login',login)
router.post('/logout',logout)


export default router