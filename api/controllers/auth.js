import { db } from "../index.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import { Buffer } from "buffer";


export const register = async (req,res) =>{
    // check existing user
   
    const {username, password, email} = req.body
    const profileImage = req.file ? req.file.filename : null; // Save file name or null if no file
    // const profileImage = req.file ? req.file.buffer : null;
  

    // console.log(req.body)
    // console.log(profileImage)
  const getUserQuery = `SELECT * FROM users WHERE username='${username}'`
  const selectedUser = await db.get(getUserQuery)
  // console.log(selectedUser)
  if (selectedUser !== undefined) {
    res.status(400)
    res.json('User already exists')
  } else {
    if (password.length < 6) {
      res.status(400)
      res.json('Password is too short')
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const registerUserQuery = `INSERT INTO users
      (username,password,email,profile_image)
      VALUES ('${username}','${hashedPassword}','${email}','${profileImage}')`
      await db.run(registerUserQuery)
      res.status(200)
      res.json('User created successfully')
    }
  }


    
    

}

export const login = async (req,res) =>{
  const {username, password} = req.body
  const getUserQuery = `SELECT * FROM users WHERE username='${username}'`
  const selectedUser = await db.get(getUserQuery)
  // console.log(selectedUser)
  if (selectedUser === undefined) {
    res.status(400)
    res.json('Invalid user')
  } else {
    const isMatchedPassword = await bcrypt.compare(
      password,
      selectedUser.password,
    )
    if (isMatchedPassword === false) {
      res.status(400)
      res.json('Invalid password')
    } else if (isMatchedPassword === true) {
      const {user_id,username,email,profile_image} = selectedUser
      const userInformation = {username,email,profile_image}
      const payload = {user_id}
      const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN')
      res.status(200)
      res.json({jwtToken,userInformation})
    }
  }
}

export const logout = (req,res) =>{
    
}