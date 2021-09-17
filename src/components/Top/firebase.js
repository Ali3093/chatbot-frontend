//import { getAuth, setPersistence } from "@firebase/auth";
import firebase from "firebase";
 
const firebaseConfig = {
    apiKey: "AIzaSyBuf5Z37VYdptNI9i-pz5p_J5OQmBvbhoQ",
    authDomain: "helical-liberty-321002.firebaseapp.com",
    databaseURL: "https://helical-liberty-321002-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "helical-liberty-321002",
    storageBucket: "helical-liberty-321002.appspot.com",
    messagingSenderId: "207720154270",
    appId: "1:207720154270:web:a050b2f1f8b03a20c0e78f",
    measurementId: "G-VEJN0922DX"
  };
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth(); 


const signInWithEmailAndPassword = async (email, password) => {
      try {
       const result = await auth.signInWithEmailAndPassword(email, password);
       //console.log(JSON.stringify(result));
         return result.user;
      } catch (err) {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found':
            alert('No User Record found corresponding to this Email !');
           break
          case 'auth/wrong-password':
            alert('Incorrect Password ! Please try again .')
            break
          default:
        }
     }
    };

  const onAuthStateChanged = (email, password) => {
    try {
       auth.onAuthStateChanged(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
  }
};

  const sendPasswordResetEmail = async (email) => {
    try {
       await auth.sendPasswordResetEmail(email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert('No User Record found corresponding to this Email !');
    }
  };

  // const logout = () => {
  //   auth.signOut();
  // };

  const createUserWithEmailAndPassword = async(email, password) => {
    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);
      const user = result.user;
      await user.sendEmailVerification();
      alert('Account creation successfull ! An email has been sent to you for verification');
    } catch (err) {
      console.error(err);
      alert(err.message);
  }
};

 
export  {
    auth ,signInWithEmailAndPassword ,sendPasswordResetEmail , onAuthStateChanged ,createUserWithEmailAndPassword 
}




