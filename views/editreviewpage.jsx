var React = require("react");

class EditReviewForm extends React.Component {
  render() {
    let urlEditReviewPost = '/findfood/updatereviewplace/'+this.props.reviewData.review_id+'/?_method=PUT';
    return (
      <html>
        <head />
        <body>
            <h1>Update review post information</h1>
            <p>Rating</p>
            <form method = 'POST' action={urlEditReviewPost}>
                <div className = 'form-group'>
                    <div className="form-check-inline">
                            <label class="form-check-label">
                                <input type="radio" className="form-check-input" name="rating" value='1'/>1</label>
                        </div>
                        <div class="form-check-inline">
                            <label class="form-check-label">
                                <input type="radio" className="form-check-input" name="rating" value='2'/>2</label>
                        </div>
                        <div class="form-check-inline disabled">
                            <label class="form-check-label">
                                <input type="radio" className="form-check-input" name="rating" value='3'/>3</label>
                        </div>
                        <div class="form-check-inline disabled">
                            <label class="form-check-label">
                                <input type="radio" className="form-check-input" name="rating" value='4'/>4</label>
                        </div>
                        <div class="form-check-inline disabled">
                            <label class="form-check-label">
                                <input type="radio" className="form-check-input" name="rating" value='5'/>5</label>
                        </div>
                        <br />
                        <br />
                    <p className="card-title">Comments</p>
                    </div>
                    <textarea type="text" name="comment" className="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue = {this.props.reviewData.comment}/>
                <br />
                <div className='text-right'>
                    <button type="submit" className = 'btn btn-outline-success'>Edit</button>
                </div>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = EditReviewForm;