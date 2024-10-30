import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser.js";

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [error, setError] = useState(""); // Track errors
  const { user } = useUser();

  const addComment = async () => {
    if (!commentText.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/articles/${articleName}/comments`,
        {
          text: commentText,
        },
        { headers }
      );

      const updatedArticle = response.data;
      onArticleUpdated(updatedArticle); 
      setCommentText(""); 
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("There was an issue submitting your comment. Please try again.");
    } finally {
      setIsSubmitting(false);
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
        placeholder="Enter your comment here"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={addComment} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Add Comment"}
      </button>
    </div>
  );
};

export default AddCommentForm;