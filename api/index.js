import express from "express"
import cors from 'cors'
import { open } from "sqlite"
import sqlite3 from 'sqlite3'
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'
import postRoutes from './routes/posts.js'

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express()

app.use(cors())
app.use(express.json())

let db = null
const intializeDBAndServer = async () => {
  try {
    db = await open({
      filename: path.join(__dirname, 'BlogDatabase.db'),
      driver: sqlite3.Database,
    })
    app.listen(8000, () => {
      console.log('server running at http://localhost:8000')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

intializeDBAndServer()



