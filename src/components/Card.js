import React from 'react'
import styles from './Card.module.scss'
import { auth } from '../firebase-config'

function Card({ post, isLoggedIn, deletePost, bookmarkPost }) {
  return (
    <>
      <div className={styles.card} key={post.id}>
        <div className={styles.content}>

          <div className={styles.top}>

            <h2>{post.title}</h2>
            <div>
              {isLoggedIn && auth.currentUser.uid === post.author.id &&
                (<button onClick={() => deletePost(post.id)} className={styles.deletebtn}>
                  <span className="material-symbols-outlined">
                    delete
                  </span>
                </button>)
              }

              {isLoggedIn && 
                (<button onClick={() => bookmarkPost(post.id)} className={styles.bookmarkbtn}>
                  <span className="material-symbols-outlined">
                    bookmark_add
                  </span>
                </button>)
              }

            </div>
          </div>

          <div className={styles.text}>{post.content}</div>
          <div className={styles.by}>
            <img className={styles.logo} src={post.image} alt="post" />
            <span className={styles.author}> {post.author.name}</span>
            <span className={styles.date}> {post.date}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;


