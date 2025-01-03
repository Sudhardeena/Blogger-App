import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const backendUrl = "https://blogger-app-backend-haxv.onrender.com";
  //   const backendUrl = "http://localhost:8000";
  // console.log(user)

  return (
    <UserContext.Provider value={{ user, setUser, backendUrl }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
