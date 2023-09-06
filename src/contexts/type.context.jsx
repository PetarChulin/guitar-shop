import { createContext, useState } from "react";

export const TypeContext = createContext({
  type: () => "",
  setType: "",
});

export const TypeProvider = ({ children }) => {
  const [type, setType] = useState();
  const value = { type, setType };


  return (
    <TypeContext.Provider value={value}>{children}</TypeContext.Provider>
  );
};