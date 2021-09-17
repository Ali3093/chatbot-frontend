import './login.css';
import { auth,onAuthStateChanged,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "./firebase";
import React, {useEffect,useState} from 'react';
import { useHistory,Link} from "react-router-dom";


function Loginform() {
      
      let history = useHistory();
      const [currentUser, setCurrentUser] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [emailError, setEmailError] = useState('');
      const [passwordError, setPasswordError] = useState('');
      //const [hasAccount, setHasAccount] = useState(false);

    

      const clearInput = () => {
        setEmail('');
        setPassword('');
      }
    
      const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
      }

    const formLogin = () => {
     signInWithEmailAndPassword(email, password)
     .then( currentUser => {
          //console.log(currentUser);
          if(currentUser !== undefined){
            history.push('./chat');
          }
           else 
           {
             clearInput();
           }
         })
       .catch((err) => {
            switch (err.code) {
              case 'auth/invalid-email':
              case 'auth/user-not-found':
                setEmailError(err.message);
               break
              case 'auth/wrong-password':
                setPasswordError(err.message)
                break
              default:
            }
          });
          
       }

    
      const handleSignUp = () => 
      {
        clearErrors()
        createUserWithEmailAndPassword(email, password)
        .catch((err) => {
          switch (err.code) {
            case 'auth/mail-already-in-use':
            case 'auth/invalid-email':
              setEmailError(err.message)
              break
            case 'auth/weak-password':
              setPasswordError(err.message);
              break
            default:
          }
        });
      }
 

      // const handleLogOut = () => {
      //    logout();
      //  }
    
      const authListener = () => {
        onAuthStateChanged(() => {
          if (auth.currentUser) {
            clearInput();
            setCurrentUser(auth.currentUser);        

          } else {
            setCurrentUser(null);
         }
        })
      }

  
    useEffect(() => {
        authListener()
        return () => {
            authListener()
          }
    }, []);
  return (
    <div className="card col-12 col-lg-6 log-card mt-5 hv-center">
        <div className="form-group text-left">
        <label htmlFor="userEmail">Email Address</label>
        <input type="email" 
               className="form-control" 
               id="email" 
               placeholder="Enter Email" 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
        />
    </div>
        
    <div className="form-group text-left">
                <label htmlFor="UserPassword">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Enter Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
      </div>
      <button
          className="btn btn-primary btn-block"
          onClick={() => formLogin(email, password)}>
          Login
      </button>
       <br/>
      <button className="btn btn-primary btn-block"
      onClick={handleSignUp}>Sign Up</button>
              {/* <p>
                Have an account?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign In </span>
              </p> */}  
              <div>
              <Link to='/reset'>Forgot Password</Link>
                </div>              
      </div>
  );
}

export default Loginform ;


