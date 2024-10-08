import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submit button
  const { user } = useUser();

  const addComment = async () => {
    if (!commentText.trim()) return; // Prevent submitting empty comments
    setIsSubmitting(true); // Set loading state to true while submitting

    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BACKEND_URL}/api/articles/${articleName}/comments`,
        {
          postedBy: user.email, // Using user email since the user is logged in
          text: commentText,
        },
        { headers }
      );

      const updatedArticle = response.data;
      onArticleUpdated(updatedArticle); // Update the article with the new comment
      setCommentText(""); // Clear comment input after submitting
    } catch (error) {
      console.error("Error adding comment:", error.message);
    } finally {
      setIsSubmitting(false); // Reset loading state after submission
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
        placeholder="Write your comment here"
      />
      <button 
        onClick={addComment} 
        disabled={isSubmitting || !commentText.trim()} // Disable when submitting or no text
      >
        {isSubmitting ? "Submitting..." : "Add Comment"}
      </button>
    </div>
  );
};

export default AddCommentForm;
