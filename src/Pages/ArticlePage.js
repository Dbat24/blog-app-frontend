import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../Components/CommentsList";
import AddCommentForm from "../Components/AddCommentForm";
import useUser from "../hooks/useUser";
// import articles from "./article-content";

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
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BACKEND_URL}/api/articles/${articleId}`,
          { headers }
        );
        const newArticleInfo = response.data;
        setArticleInfo(newArticleInfo);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };
    if (!isLoading) {
      loadArticleInfo();
    }
  }, [articleId, isLoading, user]);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BACKEND_URL}/api/articles/${articleId}/upvote`,
        null,
        { headers }
      );
      const updatedArticle = response.data;
      setArticleInfo(updatedArticle);
    } catch (error) {
      console.error("Error upvoting the article:", error);
    }
  };

  const handleCommentUpdate = (updatedArticle) => {
    setArticleInfo(updatedArticle);
  };

  if (!articleId) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{articleInfo.title}</h1>
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
      {articleInfo.content.map((paragraph, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          onArticleUpdated={handleCommentUpdate}
        />
      ) : (
        <button>Log in to add a comment.</button>
      )}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
