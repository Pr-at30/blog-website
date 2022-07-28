import React, { useState, useEffect } from 'react'
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase-config'
import styles from './Home.module.scss'
import { isEmpty } from '@firebase/util';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "react-scroll-to-top";

function Home({ isLoggedIn }) {

  const [postsLists, setPostsList] = useState([]);
  const [chkDel, setChkDel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Doc refrence for the post
  const postsCollectionRef = collection(db, "posts");

  // Get all posts
  useEffect(() => {
    setIsLoading(true);
    const getPosts = async () => {
      const posts = await getDocs(postsCollectionRef);
      console.log(posts);
      setPostsList(posts.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        img: doc.data().img,
        key: doc.id,
        date: doc.data().date,
      })));
    };

    getPosts();
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [chkDel]);


  // Delete a post
  const deletePost = async (id) => {
    await (deleteDoc(doc(db, "posts", id)));
    if (localStorage.getItem(id) === "bookmarked") {
      localStorage.removeItem(id);
    }
    setChkDel(!chkDel);
    toast.dark("Post deleted");
  }

  // Bookmark a post
  const bookmarkPost = async (id) => {
    if (localStorage.getItem(id) === "bookmarked") {
      localStorage.removeItem(id);
      toast.dark("Post removed from bookmarks");
    }
    else { 
      localStorage.setItem(id, "bookmarked");
      toast.dark("Post bookmarked");
    }
  }

  return (
    <>
      {isLoading ? <Loader />
        :
        isEmpty(postsLists) ? <div className={styles.noPosts}>No posts yet</div> :
          <div className={styles.homePage}>
            {postsLists.map((post) => {
              return (
                <Card
                  key={post.id}
                  post={post}
                  isLoggedIn={isLoggedIn}
                  deletePost={deletePost}
                  bookmarkPost={bookmarkPost}
                />
              )
            })}
          </div>
      }
      <ScrollToTop smooth={true} />
    </>
  );
}

export default Home;
