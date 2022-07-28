import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
import { auth } from './firebase-config';
import { signOut } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  // state for isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));

  // State for Title
  const [title, setTitle] = React.useState('')

  // State for Content
  const [content, setContent] = React.useState('')


  // handle signout
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        localStorage.clear();
        toast.dark("Logged out successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // redirect to login page
        window.location.pathname = '/login';   // Can't use use navigate here because it's outside of the React Router
      })
  }

  return (
    <>
      <ToastContainer />
      <Router>
        <nav>
          <div className='left-links'>
            <Link to="/">Blog Site</Link>
          </div>
          <div className='right-links'>
            {isLoggedIn && <Link to="/createpost">Create Post</Link>}
            {isLoggedIn ?
              <button className="signout" onClick={handleSignOut}>Sign Out</button>
              :
              <Link to="/login">Login</Link>}
            <Link to="/about">About</Link>
          </div>

          <div className='mobile'>
          <div className='right-links-mobile'>
            {isLoggedIn && <Link to="/createpost">Create Post</Link>}
            {isLoggedIn ?
              <button className="signout" onClick={handleSignOut}>Sign Out</button>
              :
              <Link to="/login">Login</Link>}
            <Link to="/about">About</Link>
          </div>
          </div>
        </nav>

        <Routes>
          <Route path="/"
            element={<Home
              isLoggedIn={isLoggedIn}
            />} />

          <Route path="/createpost"
            element={<CreatePost
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              isLoggedIn={isLoggedIn}
            />} />

          <Route path="/login"
            element=
            {<Login
              setIsLoggedIn={setIsLoggedIn}
            />} />

          <Route path="/about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
