import express from "express"
import cors from 'cors'
import { open } from "sqlite"
import sqlite3 from 'sqlite3'
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import blogRoutes from './routes/blogs.js'

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


export let db = null
const intializeDBAndServer = async () => {
  try {
    db = await open({
      filename: path.join(__dirname, 'BlogDatabase.db'),
      driver: sqlite3.Database,
    })
    db.run('PRAGMA foreign_keys=ON;')
    app.listen("https://blogger-app-backend.vercel.app/", () => {
      console.log('server running at https://blogger-app-backend.vercel.app/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

intializeDBAndServer()

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/blogs",blogRoutes)

