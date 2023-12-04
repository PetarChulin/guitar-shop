import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import ConfirmModal from "../../components/confirm-modal/confirm-modal";
import SignInOutToast from "../../components/sign-in-form/sign-in-out.toast";

const firebaseConfig = {
  apiKey: "your_apiKey",
  authDomain: "your_authDomain",
  projectId: "your_projectId",
  storageBucket: "your_storageBucket",
  messagingSenderId: "your_messagingSenderId",
  appId: "your_appId"

};


// const firebaseApp = 
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.getCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const db = getFirestore();

//signing user with Google popup (optional)
//=========================================
export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const email = user.email;
    localStorage.setItem('email', email);
    SignInOutToast(email, 'signed in successfully.', "success", "bottom-left");

  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
}

//signing user with Google redirect (optional)
//============================================
export const signInWithGoogleRedirect = () => {
  signInWithRedirect(auth, googleProvider);
}

//adding new collection (one time operation, if there is no existing collection)
//==============================================================================
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

//adding a new item to document
export const addItemToDocument = async (collectionName, documentId, newItemData) => {

  const CATEGORY = documentId.toUpperCase().replace(/_/g, " ");
  try {
    const docRef = doc(db, collectionName, documentId);

    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const existingData = docSnapshot.data();

      const existingItems = existingData.items || [];

      const updatedItems = [...existingItems, newItemData];

      await updateDoc(docRef, { items: updatedItems });
      ConfirmModal(`${newItemData.name} added to the ${CATEGORY} field successfully!`, '', 'success', 3000);
      console.log("Item added to the document's array field successfully!");
    } else {
      console.error("Document not found.");
    }
  } catch (error) {
    console.error("Error adding item to document:", error);
  }
};

//editing an item in document
//===========================
export const editItemInDocument = async (collectionName, documentId, itemId, updatedItemData) => {
  const CATEGORY = documentId.toUpperCase().replace(/_/g, " ");

  try {
    const docRef = doc(db, collectionName, documentId);

    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const existingData = docSnapshot.data();

      const existingItems = existingData.items || [];

      // Find the index of the item to be edited
      const itemIndex = existingItems.findIndex(item => item.id === itemId);

      if (itemIndex !== -1) {
        // Update the specific item in the array
        existingItems[itemIndex] = { ...existingItems[itemIndex], ...updatedItemData };

        // Update the document with the modified items array
        await updateDoc(docRef, { items: existingItems });

        ConfirmModal(`Item with ID ${itemId} in the ${CATEGORY} field updated successfully!`, '', 'success', 3000);
        console.log("Item in the document's array field updated successfully!");
      } else {
        console.error("Item not found in the array.");
      }
    } else {
      console.error("Document not found.");
    }
  } catch (error) {
    console.error("Error updating item in document:", error);
  }
};

//fetching data for specific document
//===================================
export const fetchData = async (collectionName, documentId) => {

  const documentRef = doc(db, collectionName, documentId);
  const getData = async () => {
    try {
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        console.log('Document data:', data);
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };
  getData();
};

//fetching data for specific item in document
//===================================
export const fetchItemData = async (collectionName, documentId, itemId) => {

  const documentRef = doc(db, collectionName, documentId);
  const getItemData = async () => {
    try {
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        const result = documentSnapshot.data();
        const data = result.items || [];

        if (data && data.items) {
          const item = data.items.find((item) => item.id === itemId);
          console.log(item);
          if (item) {
            console.log('Item data:', item);
          } else {
            console.log('Item not found in document');
          }
        } else {
          console.log('No items in the document');
        }
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };
  getItemData();
};

//removing an item from document
export const removeItemFromDocument = async (collectionName, documentId, itemIdToRemove, itemName, callback) => {

  const CATEGORY = documentId.toUpperCase().replace(/_/g, " ");
  try {
    const docRef = doc(db, collectionName, documentId);

    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const existingData = docSnapshot.data();

      const existingItems = existingData.items || [];

      const updatedItems = existingItems.filter((item) => item.id !== itemIdToRemove);

      await updateDoc(docRef, { items: updatedItems });
      console.log(`"${itemName}" removed from the ${CATEGORY}'s array field successfully!`);
    } else {
      console.error("Document not found.");
    }
  } catch (error) {
    console.error("Error removing item from document:", error);
  }

  const updatedData = await getCategoriesAndDocuments(collectionName);
  if (callback) {
    callback(updatedData);
  }
};

//fetching whole collection from firebase database
//=====================================================
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "collections");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = {};

  querySnapshot.forEach((docSnapshot) => {
    const { title, items } = docSnapshot.data();
    const lowercaseTitle = title.toLowerCase();
    categoryMap[lowercaseTitle] = items;
  });

  return categoryMap;
};

//fetching title and image for certain category
// ======================================================
export const getTitleAndImageFromDocument = async () => {
  const collectionRef = collection(db, "collections");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const titleAndImage = [];

  querySnapshot.forEach((docSnapshot) => {
    const { title, image } = docSnapshot.data();
    titleAndImage[title.replace(/_/g, " ")] = image;
  });

  return titleAndImage;
};

//creating a new user document when a new user signs up
//=====================================================
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

//creating a new user account using an email and password (wroks together with 'createUserWithEmailAndPassword')
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

//signing in user
//===============
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      user
        .getIdToken()
        .then((accessToken) => {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("email", email)
          localStorage.setItem("userItems", []);
          localStorage.setItem("userFavorites", []);
          console.log("User signed in successfully.");
        })
        .catch((error) => {
          console.error("Error getting access token:", error);
        });
    }
  });
  return await signInWithEmailAndPassword(auth, email, password);
};

//signing out user
//================
export const signOutUser = async () => {
  await signOut(auth).then(() => {
    localStorage.clear();
    console.log("User signed out successfully.");
  });
};

//listening for changes in authentication state
//=============================================
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

//removing whole collection from firebase databse
export const removeCollection = async (collectionKey) => {
  const collectionRef = collection(db, collectionKey);
  const querySnapshot = await getDocs(collectionRef);
  const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

  await Promise.all(deletePromises);
  await deleteDoc(collectionRef);

  console.log("Collection removed:", collectionKey);
};

//removing document(category) from collection
//============================================
export const removeSectionFromCollection = async (
  collectionKey,
  sectionTitle,
  callback
) => {
  const collectionRef = collection(db, collectionKey);
  const querySnapshot = await getDocs(collectionRef);

  const docToDelete = querySnapshot.docs.find(
    (doc) => doc.data().title.toLowerCase() === sectionTitle
  );
  if (docToDelete) {

    await deleteDoc(docToDelete.ref);

    console.log(`Section "${sectionTitle}" removed`);
  } else {
    console.log(`Section "${sectionTitle}" not found in collection`);
  }

  const updatedData = await getCategoriesAndDocuments(collectionKey);
  if (callback) {
    callback(updatedData);
  }
};

// export const removeItemFromSectionById = async (
//   collectionKey,
//   sectionTitle,
//   itemName
// ) => {
//   const collectionRef = doc(db, collectionKey);

//   const collectionSnapshot = await getDoc(collectionRef);
//   const collectionData = collectionSnapshot.data();

//   if (sectionTitle in collectionData) {
//     const sectionArray = collectionData[sectionTitle];

//     const itemIndex = sectionArray.findIndex((item) => item.name === itemName);

//     if (itemIndex !== -1) {
//       sectionArray.splice(itemIndex, 1);

//       await setDoc(collectionRef, { [sectionTitle]: sectionArray });

//       console.log(
//         `Item with id ${itemName} removed from section "${sectionTitle}"`
//       );
//     } else {
//       console.log(
//         `Item with id ${itemName} not found in section "${sectionTitle}"`
//       );
//     }
//   } else {
//     console.log(`Section "${sectionTitle}" not found in collection`);
//   }
// };
