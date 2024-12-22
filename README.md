# Project Overview:    
Developing a fully functional blog application using the MERN (SQLite, Express.js, React, Node.js) stack. The application allows users to sign up, log in, view, post, edit, and comment on blogs. Additionally, users can be able to view other users' profiles and blogs.

### THE PROJECT VIDEO LINK: 
https://www.loom.com/share/d4ff4eb567c246e9b46aa2f52697edd1?sid=6674b63a-092c-4859-8ea6-ba8e2477780d

### Project hosted:  
Frontend(React) in Vercel platform: https://blogger-app-five.vercel.app
Backend(Node.js,Sqlite) in Render platfrom: https://blogger-app-backend-haxv.onrender.com

### Project Setup Using Docker:
- clone the git repository
```
git clone https://github.com/Sudhardeena/Blogger-App.git
```
- Execute following command to build Image and create containers for both frontend and backend
```
docker-compose up --build
```
- For development run on watch mode for instant rebuild and syn the changes
```
docker compose watch
```
- If you like to use docker desktop GUI
  - pull the Images for both frontend and backend by searching "sudhardeena/blogger-app-web" and "sudhardeena/blogger-app-api" on docker hub.
  - First run the blogger-app-api image for creating containers with optional settings port : 8000,1) host path : "your absolute path/api/BlogDatabase.db", container path: "/app/BlogDatabase.db" 2) host path : "your absolute path/api/uploads", container path: "/app/uploads".
  - Then run blogger-app-web, with optional setting Port: 5173

### UI Components:
#### 1. Home Page:
- Displays a list of all blogs by all authors with previews (title, short excerpt, author,date).
- Search bar to filter blogs by title.    
- Includes a navigation bar with links to Login and Sign Up, or User Profile (if logged in).
#### 2. Blog Post Page:
- Displays the full content of the blog post.    
- Shows the comments section below the post.    
- Provides a form to add a new comment (only for logged-in users).    
- Include a link to the author's profile.
#### 3. Profile Page:
- Displays a user's public details, including name, profile picture, and email.    
- List all blogs posted by the user.    
#### 4. Login and Sign-Up Pages:
- Create forms for user authentication.    
- Include validation and error messages for incorrect inputs.    
    
### Actions and Enhancements:    
#### 1. User Authentication:    
- Implemented sign-up and login functionality.    
- Protect routes and actions based on user authentication and ownership.    
#### 2. Blog Management:    
- Implemented CRUD (Create, Read, Update, Delete) operations for blog posts.    
- Ensuring only the author can edit or delete their blogs.    
- Non-authenticated users should only be able to view blogs, not comment or post.    
#### 3. Comment System:    
- Allows users to add comments to blogs.    
- Display comments below each blog post with the commenter's name and    
  timestamp.    
#### 4. Profile Management:    
- Implement functionality to view and edit user profile information.    
- Display user's blogs on their profile page (dashboard).    
    
### Frontend (React):    
#### 1. State Management:    
-  React Context managing user state and authentication.    
- Implemented local state management for form inputs and temporary states.    
#### 2. Routing:    
- React Router for client-side routing.    
- Implement protected routes for profile, creating, editing Blogs.    
#### 3. Enhancement: Responsiveness:    
- Ensure a responsive design using CSS Flexbox.    

### Backend (Node.js + Express.js):    
#### 1. Database Schema:    
- Designed and implemented schemas for Users, Blogs, Comments    
    
#### 2. API Endpoints:    
- Developed API endpoints to handle user actions such as authentication, blog    
management, and comment handling.    
    
#### 3. Middleware:    
- Implemented authentication middleware.
- Implemented authorization.
