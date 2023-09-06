import { createContext, useState } from "react";

export const UsernameContext = createContext({
  user: () => "",
  setUser: "",
});

export const UsernameProvider = ({ children }) => {
  const [user, setUser] = useState();
  const value = { user, setUser };


  return (
    <UsernameContext.Provider value={value}>{children}</UsernameContext.Provider>
  );
};