import React from 'react'
import styles from './CreatePost.module.scss'
import { addDoc, deleteDoc, getDoc} from 'firebase/firestore'

function CreatePost({ title, setTitle, content, setContent }) {
  // Ref doc from firestore
  

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(title, content)
    addDoc('posts', { title, content })
    setTitle('')
    setContent('')
    console.log('submit')
  }

  return (
    <div className={styles.cpPage}>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
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
            required />
        </div>

        <div className={styles['form-input-material']}>
          <label className={styles.head}>Body</label>
          <br></br>
          <textarea placeholder="Content..."
            rows={5}
            cols={50}
            className={styles['form-input-material']}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button className={styles["btn"]}>Create</button>
      </form>

    </div>
  )
}

export default CreatePost