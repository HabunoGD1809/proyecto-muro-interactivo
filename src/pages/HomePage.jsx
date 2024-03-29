import React, { useState, useEffect } from 'react';
import { firestore } from '../services/firebase';
import '../styles/HomePage.css';

function HomePage({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('posts') 
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(posts);
      });

    return unsubscribe;
  }, []);

  return (
    <div>
      <h1>Muro Interactivo</h1>
      {user ? (
        <p>Bienvenido, {user.displayName}</p>
      ) : (
        <p>No has iniciado sesión</p>
      )}
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Autor: {post.author.displayName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;