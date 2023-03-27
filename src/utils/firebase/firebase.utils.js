
import { initializeApp } from "firebase/app";

import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import {
        getFirestore, 
        doc, 
        getDoc, 
        setDoc,
        collection,
        writeBatch,
        getDocs,
        query,
        } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCB9LqwAec0sz6DM5CkPOYQY4w6jinrssY",
  authDomain: "e-commerce-by-reactjs.firebaseapp.com",
  projectId: "e-commerce-by-reactjs",
  storageBucket: "e-commerce-by-reactjs.appspot.com",
  messagingSenderId: "482991626329",
  appId: "1:482991626329:web:6de60db6a70fc24273b948"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);
    
    objectsToAdd.forEach((object) => {
       const docRef = doc(collectionRef, object.title.toLowerCase());
       batch.set(docRef, object);
    });
  
    await batch.commit();
    console.log('done');
};


export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapShot => docSnapShot.data());
  };

export const createUserDocumentFromAuth = async (userAuth, additionalInformation= {}) => {
    if(!userAuth) return ;
    const userDecRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await  getDoc(userDecRef);
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try {
            await setDoc(userDecRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }

    return userDecRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback); 

