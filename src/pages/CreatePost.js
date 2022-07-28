import React from 'react'
import styles from './CreatePost.module.scss'
import { addDoc, collection } from 'firebase/firestore'
import { useEffect } from 'react';
import { db, auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePost({ title, setTitle, content, setContent, isLoggedIn }) {

  let navigate = useNavigate();

  // Prevent the user from accessing the create post page if they are not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [])

  // Doc refrence for the post
  const postsCollectionRef = collection(db, "posts");


  // Create a new post
  const createPost = async (e) => {
    e.preventDefault();
    await addDoc(postsCollectionRef, {
      title: title,
      content: content,
      image: auth.currentUser.photoURL,
      date: new Date().toLocaleDateString(),
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      }
    });

    // Clear the form
    setTitle('');
    setContent('');

    // Navigate to the home page
    navigate('/');

    // Show a toast message
    toast.dark("Post created");
  }

  return (
    <div className={styles.cpPage}>
      <form className={styles['login-form']} onSubmit={createPost}>
        <h1>Create Post</h1>

        <div className={styles['form-input-material']}>
          <label className={styles.head}>Title</label>
          <br></br>
          <input
            type="text"
            className={styles['form-input-material']}
            placeholder="Title..."
            size={30}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className={styles['form-input-material']}>
          <label className={styles.head}>Body</label>
          <br></br>
          <textarea
            placeholder="Content..."
            rows={5}
            cols={50}
            className={styles['form-input-material']}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button className={styles["btn"]}>Create</button>
      </form>

    </div>
  )
}

export default CreatePost