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

const app = express()

// app.use(cors({
//   origin: "*", // Allowing your frontend domain
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Include headers you expect
// }));

// // Enabling preflight requests for all routes 
// app.options('*', cors());

// app.use(cors())

// Enable CORS
app.use(cors({
  origin: '*', // Adjust as necessary
}));


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000

export let db = null
const intializeDBAndServer = async () => {
  try {
    db = await open({
      filename: path.join(__dirname, 'BlogDatabase.db'),
      driver: sqlite3.Database,
    })
    app.listen(port, () => {
      console.log(`server running at http://localhost:${port}`)
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

intializeDBAndServer()


// Function to get content type based on file extension
const getContentType = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    case '.bmp':
      return 'image/bmp';
    case '.svg':
      return 'image/svg+xml';
    case '.jfif':
      return 'image/jfif'; 
    case '.avif':
      return 'image/avif';
    default:
      return null; // Unsupported type
  }
};

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve user images with specific handling
app.get('/uploads/users/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'users', req.params.filename);
  const contentType = getContentType(req.params.filename);

  if (!contentType) {
    return res.status(415).send('Unsupported Media Type'); // 415 for unsupported media type
  }

  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', 'inline'); // Ensure it displays in the browser
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error sending file: ${filePath}`, err);
      res.status(err.status).send(err.message);
    }
  });
});

// Serve blog images similarly
app.get('/uploads/blogs/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'blogs', req.params.filename);
  const contentType = getContentType(req.params.filename);

  if (!contentType) {
    return res.status(415).send('Unsupported Media Type'); // 415 for unsupported media type
  }

  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', 'inline');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error sending file: ${filePath}`, err);
      res.status(err.status).send(err.message);
    }
  });
});




app.get('/',(req,res)=>{
  res.json("Hai")
})

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/blogs",blogRoutes)

export default app