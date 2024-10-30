import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage.js";
import CommentsList from "../Components/CommentsList.js";
import AddCommentForm from "../Components/AddCommentForm.js";
import useUser from "../hooks/useUser.js";
import articles from "./article-content.js";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();
  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      if (isLoading) return;

      console.log("Article ID:", articleId); // Log articleId

      const token = user ? await user.getIdToken() : null;
      const headers = token ? { authtoken: token } : {};

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/articles/${articleId}`, // Ensure this is correct
          { headers }
        );
        setArticleInfo(response.data);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    loadArticleInfo();
  }, [articleId, isLoading, user]);

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    if (!canUpvote) return; // Prevent double-upvoting if already upvoted

    const token = user ? await user.getIdToken() : null;
    const headers = token ? { authtoken: token } : {};

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/articles/${articleId}/upvote`,
        null,
        { headers }
      );
      setArticleInfo(response.data); // Update the article info with the new upvotes
    } catch (error) {
      console.error("Error upvoting the article:", error);
    }
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        {user ? (
          <button onClick={addUpvote}>
            {canUpvote ? "Upvote" : "Already Upvoted"}
          </button>
        ) : (
          <button>Log in to upvote</button>
        )}
      </div>
      <p>This article has {articleInfo.upvotes} upvote(s)</p>
      {article.content.map((paragraph, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button>Log in to add a comment.</button>
      )}

      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;