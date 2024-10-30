import PropTypes from "prop-types";

const CommentsList = ({ comments = [] }) => (
  <>
    <h3>Comments</h3>
    {comments.length > 0 ? (
      comments.map((comment, index) => (
        <div className="comment" key={index}>
          <h4>{comment.postedBy}</h4>
          <p>{comment.text}</p>
        </div>
      ))
    ) : (
      <p>No comments yet. Be the first to comment!</p>
    )}
  </>
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      postedBy: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

export default CommentsList;

