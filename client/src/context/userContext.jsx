import {  createContext, useState } from "react";

export  const UserContext = createContext()

const UserContextProvider = (props) =>{
    const [user,setUser] = useState(null) 

    // console.log(user)

    return (
        <UserContext.Provider value={{user,setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider