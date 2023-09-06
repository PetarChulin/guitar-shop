import { createContext, useState, useContext, useEffect } from "react";
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
import GUITAR_DATA from '../guitar-data';

export const AdminContext = createContext({
  isAdmin: () => false,
  setIsAdmin: false,
});

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {

    const savedIsAdmin = localStorage.getItem('isAdmin');
    return savedIsAdmin === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin.toString());
  }, [isAdmin]);

  // useEffect(() => {
  //   addCollectionAndDocuments('collections', GUITAR_DATA);
  // }, []);

  const value = { isAdmin, setIsAdmin };


  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminStatus = () => {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  return { isAdmin, setIsAdmin };
};
