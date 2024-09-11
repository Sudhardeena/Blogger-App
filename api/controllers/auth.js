import { db } from "../index.js"
import bcrypt from 'bcrypt'

export const register = async (req,res) =>{
    // check existing user
    const {username, password, email,img} = req.body

    
  const getUserQuery = `SELECT * FROM users WHERE username='${username}'`
  const selectedUser = await db.get(getUserQuery)
  console.log(selectedUser)
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
      (username,password,email)
      VALUES ('${username}','${hashedPassword}','${email}')`
      await db.run(registerUserQuery)
      res.status(200)
      res.json('User created successfully')
    }
  }


    
    

}

export const login = (req,res) =>{
    
}

export const logout = (req,res) =>{
    
}