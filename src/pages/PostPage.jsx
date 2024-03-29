import React, { useState } from "react";
import { firestore } from "../services/firebase";
import { useNavigate } from "react-router-dom"; // Importa useNavigate en lugar de useHistory
import '../styles/PostPage.css';

function PostPage({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Utiliza useNavigate en lugar de useHistory

  const handlePost = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Debes iniciar sesión para publicar");
      return;
    }
    try {
      await firestore.collection("posts").add({
        title,
        content,
        author: {
          uid: user.uid,
          displayName: user.displayName,
        },
        timestamp: new Date(),
      });
      setTitle("");
      setContent("");
      navigate("/"); // Utiliza navigate("/") en lugar de history.push("/")
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Publicar nuevo post</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handlePost}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}

export default PostPage;