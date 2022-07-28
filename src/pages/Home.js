import React, { useState, useEffect } from 'react'
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase-config'
import styles from './Home.module.scss'
import { isEmpty } from '@firebase/util';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    </>
  );
}

export default Home;



// return (
//   <>
//     {isLoading ? <Loader />
//       :
//       isEmpty(postsLists) ? <div className={styles.noPosts}>No posts yet</div> :
//         <div className={styles.homePage}>
//           {postsLists.map((post) => {
//             return (
//               <div className={styles.card} key={post.id}>
//                 <div className={styles.content}>

//                   <div className={styles.top}>
//                     <h2>{post.title}</h2>
//                     {isLoggedIn && auth.currentUser.uid === post.author.id &&
//                       (<button onClick={() => deletePost(post.id)} className={styles.deletebtn}>
//                         <span className="material-symbols-outlined">
//                           delete
//                         </span>
//                       </button>)
//                     }
//                   </div>

//                   <div className={styles.text}>{post.content}</div>
//                   <div className={styles.by}>
//                     <img className={styles.logo} src={post.image} alt="post" />
//                     <span className={styles.author}> {post.author.name}</span>
//                     <span className={styles.date}> {post.date}</span>
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//     }
//   </>
// );
