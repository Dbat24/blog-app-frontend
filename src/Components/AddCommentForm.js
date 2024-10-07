import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();

  const addComment = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BACKEND_URL}/api/articles/${articleName}/comments`, // Updated URL
        {
          postedBy: name,
          text: commentText,
        },
        { headers }
      );
      const updatedArticle = response.data;
      onArticleUpdated(updatedArticle);
      setName("");
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div id="add-comment-form">
      <h3>Add A Comment</h3>
      {user && <p>You are posting as {user.email}</p>}

      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows="4"
        cols="50"
      />

      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
