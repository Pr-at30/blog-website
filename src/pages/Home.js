import React, { useState, useEffect } from 'react'
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import styles from './Home.module.scss'
import { isEmpty } from '@firebase/util';

function Home({ isLoggedIn }) {

  const [postsLists, setPostsList] = useState([]);
  const [chkDel, setChkDel] = useState(false);

  // Doc refrence for the post
  const postsCollectionRef = collection(db, "posts");

  // Get all posts
  useEffect(() => {
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
  }, [chkDel]);

  // Delete a post
  const deletePost = async (id) => {
    await (deleteDoc(doc(db, "posts", id)));
    setChkDel(!chkDel);
  }

  return (
    <>
      { isEmpty(postsLists) ? <div className={styles.noPosts}>No posts yet</div> :
        <div className={styles.homePage}>
          {postsLists.map((post) => {
            return (
              <div className={styles.card}>
                <div className={styles.content}>

                  <div className={styles.top}>
                    <h2>{post.title}</h2>
                    {isLoggedIn && auth.currentUser.uid === post.author.id &&
                      (<button onClick={() => deletePost(post.id)} className={styles.deletebtn}>
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>)
                    }
                  </div>

                  <div className={styles.text}>{post.content}</div>
                  <div className={styles.by}>
                    <img className={styles.logo} src={post.image} alt="post" />
                    <span className={styles.author}> {post.author.name}</span>
                    <span className={styles.date}> {post.date}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      }
    </>
  );
}

export default Home;


