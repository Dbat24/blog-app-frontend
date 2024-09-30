import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ArticlesList = ({ articles = [] }) => {
  return (
    <>
      {articles.length > 0 ? (
        articles.map((article) => (
          <Link
            key={article.name}
            className="article-list-item"
            to={`/articles/${article.name}`}
          >
            <h3>{article.title}</h3>
            <p>{article.content[0]?.substring(0, 150)}...</p>
          </Link>
        ))
      ) : (
        <p>No articles available</p>
      )}
    </>
  );
};

ArticlesList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
};

export default ArticlesList;

