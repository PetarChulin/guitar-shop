// import { createContext, useState } from "react";

// export const DetailsContext = createContext({
//   setShow: () => {},
//   show: null,
//   setProductName: () => { },
//   productName: null,
//   setProductPrice: () => { },
//   productPrice: null,
//   setProductImg: () => { },
//   productImg: null,
//   setProductDesc: () => { },
//   productDesc: null,
//   setProductId: () => {},
//   productId: null
// });

// export const DetailsProvider = ({ children }) => {
//   const [show, setShow] = useState();
//   const [productName, setProductName] = useState();
//   const [productPrice, setProductPrice] = useState();
//   const [productImg, setProductImg] = useState();
//   const [productDesc, setProductDesc] = useState();
//   const [productId, setProductId] = useState();
//   const value = {
//     show, setShow, 
//     productName, 
//     setProductName, 
//     productPrice, 
//     setProductPrice,
//      productImg, 
//     setProductImg, 
//     productDesc,
//     setProductDesc,
//     productId,
//     setProductId
//   };


//   return (
//     <DetailsContext.Provider value={value}>{children}</DetailsContext.Provider>
//   );
// };