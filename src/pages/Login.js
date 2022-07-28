import React, { useEffect} from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
//  Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ isLoggedIn, setIsLoggedIn }) {

  let navigate = useNavigate();

  // Prevent the user from accessing the login page if they are logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [])

  const signInWithGoogle = () => {

    signInWithPopup(auth, provider)
      .then(() => {
        localStorage.setItem('isLoggedIn', true);
        setIsLoggedIn(true);
        
        navigate('/');
        toast.dark("Logged in successfully");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className={styles.loginPage}>

      <div className={styles.title}> Sign In With Google to Continue </div>

      <button onClick={signInWithGoogle} type="button" className={styles.loginwithgooglebtn} >
        Sign in with Google
      </button>

    </div>
  )
}

export default Login