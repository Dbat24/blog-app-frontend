import ArticlesList from "../Components/ArticlesList.js";
import articles from "./article-content.js";

const ArticlesListPage = () => {
  return (
    <div className="articles-list-page">
      <h1>Articles</h1>
      <ArticlesList articles={articles} />
    </div>
  );
};

export default ArticlesListPage;
