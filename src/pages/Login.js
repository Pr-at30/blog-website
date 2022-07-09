import React from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {

  let navigate = useNavigate();

  const signInWithGoogle = () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        localStorage.setItem('isLoggedIn', true);
        setIsLoggedIn(true);
        navigate('/');
      })
  };

  return (
    <div className={styles.loginPage}>

      <div className={ styles.title }> Sign In With Google to Continue </div>

      <button onClick={signInWithGoogle} type="button" className={ styles.loginwithgooglebtn } >
        Sign in with Google
      </button>

    </div>
  )
}

export default Login