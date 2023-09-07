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

const firebaseConfig = {
  apiKey: "your_",
  authDomain: "your_authDomain",
  projectId: "your_projectId",
  storageBucket: "your_storageBucket",
  messagingSenderId: "your_messagingSenderId",
  appId: "your_appId",
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.getCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
// export const userAuth = getAuth(firebaseApp);

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

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

export const addItemToDocument = async (collectionName, documentId, newItemData) => {

  const CATEGORY = documentId.toUpperCase().replace(/_/g, " ");

  try {
    const docRef = doc(db, collectionName, documentId);

    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const existingData = docSnapshot.data();

      // Get the array field you want to update (e.g., 'items')
      const existingItems = existingData.items || []; // If 'items' field doesn't exist, initialize it as an empty array

      // Update the local array by pushing the new item to it
      const updatedItems = [...existingItems, newItemData];

      // Update the document with the updated array field
      await updateDoc(docRef, { items: updatedItems });
      ConfirmModal(`${newItemData.name} added to the ${CATEGORY} field successfully! Please refresh the page.`, '', 'success', 3000);
      console.log("Item added to the document's array field successfully!");
    } else {
      console.error("Document not found.");
    }
  } catch (error) {
    console.error("Error adding item to document:", error);
  }



};

export const fetchData = async (collectionName, documentId) => {
  
  // Create a reference to the specific document
  const documentRef = doc(db, collectionName, documentId);

  // Fetch the data from the document
  const getData = async () => {
    try {
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        // 'data' now contains the content of the document
        console.log('Document data:', data);
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  // Call the function to fetch the data
  getData();
};

export const removeItemFromDocument = async (collectionName, documentId, itemIdToRemove, itemName) => {

  console.log(documentId);

  const CATEGORY = documentId.toUpperCase().replace(/_/g, " ");

  try {
    // Get a reference to the document you want to update
    const docRef = doc(db, collectionName, documentId);

    // Fetch the existing data of the document
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      // Get the data of the existing document
      const existingData = docSnapshot.data();

      // Get the array field you want to update (e.g., 'items')
      const existingItems = existingData.items || []; // If 'items' field doesn't exist, initialize it as an empty array

      // Update the local array by filtering out the item to remove
      const updatedItems = existingItems.filter((item) => item.id !== itemIdToRemove);

      // Update the document with the updated array field
      await updateDoc(docRef, { items: updatedItems });
      console.log(`"${itemName}" removed from the ${CATEGORY}'s array field successfully!`);
    } else {
      console.error("Document not found.");
    }
  } catch (error) {
    console.error("Error removing item from document:", error);
  }
};


export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "collections");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

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

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

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
          console.log("User signed in successfully.");
        })
        .catch((error) => {
          console.error("Error getting access token:", error);
        });
    }
  });

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth).then(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("userItems");
    console.log("User signed out successfully.");
  });
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const removeCollection = async (collectionKey) => {
  const collectionRef = collection(db, collectionKey);

  // Step 1: Get all the documents in the collection
  const querySnapshot = await getDocs(collectionRef);

  // Step 2: Delete all the documents
  const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

  await Promise.all(deletePromises);

  // Step 3: Delete the collection itself
  await deleteDoc(collectionRef);

  console.log("Collection removed:", collectionKey);
};

export const removeSectionFromCollection = async (
  collectionKey,
  sectionTitle
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
};

export const removeItemFromSectionById = async (
  collectionKey,
  sectionTitle,
  itemName
) => {
  const collectionRef = doc(db, collectionKey);

  // Step 1: Get the current data from the collection document
  const collectionSnapshot = await getDoc(collectionRef);
  const collectionData = collectionSnapshot.data();

  // Step 2: Check if the section exists in the collection
  if (sectionTitle in collectionData) {
    const sectionArray = collectionData[sectionTitle];

    // Step 3: Find the index of the item with the specified id
    const itemIndex = sectionArray.findIndex((item) => item.name === itemName);

    if (itemIndex !== -1) {
      // Step 4: Remove the item from the array
      sectionArray.splice(itemIndex, 1);

      // Step 5: Update the section in Firestore
      await setDoc(collectionRef, { [sectionTitle]: sectionArray });

      console.log(
        `Item with id ${itemName} removed from section "${sectionTitle}"`
      );
    } else {
      console.log(
        `Item with id ${itemName} not found in section "${sectionTitle}"`
      );
    }
  } else {
    console.log(`Section "${sectionTitle}" not found in collection`);
  }
};
