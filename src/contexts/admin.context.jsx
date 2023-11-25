import { createContext, useState, useContext, useEffect } from "react";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
// import GUITAR_DATA from '../guitar-data';

export const AdminContext = createContext({
  isAdmin: () => false,
  setIsAdmin: false,
  searchField: '',
  setSearchField: () => {}
});

export const AdminProvider = ({ children }) => {

  const [searchField, setSearchField] = useState('');
  const [isAdmin, setIsAdmin] = useState(() => {
    const savedIsAdmin = localStorage.getItem('isAdmin');
    return savedIsAdmin === 'true';
  });
  console.log(isAdmin);


  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin.toString());
  }, [isAdmin]);
  // it triggers only once if 'collections' collection is empty
  // useEffect(() => {
  //   addCollectionAndDocuments('collections', GUITAR_DATA);
  // }, []);

  const value = { isAdmin, setIsAdmin, searchField, setSearchField };


  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

// export const useAdminStatus = () => {
//   const { isAdmin, setIsAdmin } = useContext(AdminContext);
//   return { isAdmin, setIsAdmin };
// };
