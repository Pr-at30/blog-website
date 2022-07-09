import './App.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import { auth } from './firebase-config';
import { signOut } from 'firebase/auth';


function App() {

  // state for isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // handle signout
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      localStorage.clear();

      // redirect to login page
      window.location.pathname = '/login';   // Can't use use navigate here because it's outside of the React Router
    })
  }

  return (
    <Router>
      <nav>
        <div className='left-links'>
          <Link to="/">Blog Site</Link>
        </div>
        <div className='right-links'>
          <Link to="/createpost">Create Post</Link>
          {isLoggedIn ? <button className="signout" onClick={handleSignOut}>Sign Out</button>:<Link to="/login">Login</Link> }
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>

      <footer>
        <div className="footer">&copy; Developed by Pratyush Kumar Jena </div>
      </footer>
    </Router>
  );
}

export default App;
