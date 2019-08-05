var React = require("react");

class EditReviewForm extends React.Component {
  render() {
    let urlEditReviewPost = '/findfood/updatereviewplace/'+this.props.reviewData.review_id+'/?_method=PUT';
    let urlLogout = '/findfood/signout'
    let urlHome ='/findfood/homepage'
    let urlSearchLocation ='/findfood/search'
    let urlProfile = '/findfood/profile/'+this.props.userId;

    let navStyle = {
        margin:'10px 0 0 0'
    }

    let image = {
        height: '400px',
        widht: '600px'
    }

    let shopStyle = {
        width:'18rem',
        margin:'10px auto'
    }

    let allFoodStyle = {
        display:'flex',
        flexWrap:'wrap'
    }

    let shopImageCategory = {
        height:'200px',
        weight:'300px'
    }

    let profileImage = {
        height:'30px',
        width:'30px',
        borderRadius:'100%'
    }

    let margin={
        marginTop:'10px'
    }

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
            <link rel="stylesheet" href="/editreviewpage.css"/>
        </head>
        <body>
            <div className = 'container-fluid'>
                <nav style = {navStyle} className="navbar navbar-light bg-light">
                    <a className="navbar-brand mb-0 h1" href={urlHome}>
                    <img src="https://img.icons8.com/ios-glyphs/50/000000/restaurant-building.png" className='d-inline-block align-top' width = '30px' height='30px'/>FindFood
                    </a>
                    <div className = 'text-right'>
                        <a className='btn' href={urlProfile}>
                        <img className='d-inline-block align-top' style = {profileImage} src={this.props.userData.profile_image}/>{this.props.userData.profile_name}
                        </a>
                        <a className='d-inline-block align-top btn' href={urlLogout}>Sign out</a>
                    </div>
                </nav>
                <div className='foodCard' style={margin}>
                    <div className='col-6 offset-3'>
                        <div className='card'>
                            <div className='card-header'>
                                <h5>Update review post information</h5>
                            </div>
                            <div className='card-body'>
                                <div className='card-title'>
                                    <h6>Rating</h6>
                                </div>
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
                                        <h6 className="card-title">Comments</h6>
                                        </div>
                                        <textarea type="text" name="comment" className="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue = {this.props.reviewData.comment}/>
                                    <br />
                                    <div className='text-right'>
                                        <button type="submit" className = 'btn btn-outline-success'>Edit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = EditReviewForm;