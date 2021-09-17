import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordResetEmail } from "./firebase";
import { useHistory} from "react-router-dom";
import "./passwordReset.css";


function PasswordReset() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [user, loading, error] = useAuthState(auth);
    //let history = useHistory();
    
    const clearInput = () => {
        setEmail('');
      }

    const sendPResetEmail = () => {
        sendPasswordResetEmail(email)
        .then(() => {
         clearInput();
       })        
       .catch((err) => {
            switch (err.code) {
              case 'auth/invalid-email':
              case 'auth/user-not-found':
                setEmailError(err.message);
               break
            }
      });
      }
    
    useEffect(() => {
        if (loading) return;
    
      }, [user, loading]);
return (
    <div className="passwordReset ">
        <div className="form-group col-10 col-lg-4 text-left">
        <label htmlFor="userEmail">Email Address</label>
        <input type="email" 
               className="form-control" 
               id="email" 
               placeholder="Enter Email" 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
        />
      <br/>
        
        <button
          className="passwordReset__btn btn-block"
          onClick={() => sendPResetEmail(email)}>
          Send Password Reset Email
        </button>
      </div>
    </div>
  );
}
export default PasswordReset;