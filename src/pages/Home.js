import React, { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase-config'
import styles from './Home.module.scss'

function Home({ isLoggedIn }) {

  const [postsLists, setPostsList] = useState([]);

  // Doc refrence for the post
  const postsCollectionRef = collection(db, "posts");

  // Get all posts
  useEffect(() => {
    const getPosts = async () => {
      const posts = await getDocs(postsCollectionRef);
      console.log(posts);
      setPostsList(posts.docs.map((doc) => ({ ...doc.data(), id: doc.id, img: doc.data().img, key: doc.id })));
    };

    getPosts();
  }, []);

  return (
    <>
      <div className={styles.homePage}>
        {postsLists.map((post) => {
          return (
            <div className={styles.card}>
              <div className={styles.content}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <div className={styles.by}>
                  <img className={styles.logo} src={post.image} alt="post" />
                  <span className={styles.author}> {post.author.name}</span>
                </div>
              </div>
            </div>
          )

          // <div className='post'>
          //   <div className='post-title'>
          //     <div className='title'>
          //       <h1>{post.title}</h1>
          //     </div>
          //   </div>
          //   <div className='post-content'>{post.content}</div>
          //   <br></br>
          //   <h3>@{post.author.name}</h3>
          //   <br></br>
          // </div>

        })}
      </div>
    </>
  );
}

export default Home;


