var React = require("react");

class DeleteReview extends React.Component {
  render() {
    let urlDeleteReviewPost = '/findfood/deletereview/'+this.props.reviewData.review_id+'/?_method=DELETE';

    let deleteFoodplacePic = {
        height:'200px',
        width:'300px'
    }

    return (
      <html>
        <head />
        <body>
            <h1>Review post information</h1>
            <p>Shop rating: {this.props.reviewData.rating}</p>
            <p>Shop comment: {this.props.reviewData.comment}</p>
            <br />
            <br />
            <br />
            <p>Are you sure you want to delete the review entry?</p>
            <form method="POST" action={urlDeleteReviewPost}>
                <button type='submit'className = 'btn btn-sm btn-outline-danger'>DELETE</button>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = DeleteReview;