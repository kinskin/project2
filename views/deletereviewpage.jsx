var React = require("react");

class DeleteReview extends React.Component {
  render() {
    let urlDeleteReviewPost = '/findfood/deletereview/'+this.props.reviewData.review_id+'/?_method=DELETE';
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

    let deleteFoodplacePic = {
        height:'200px',
        width:'300px'
    }

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
            <link rel="stylesheet" href="/deletefoodshop.css"/>
        </head>
        <body>
            <div className='container-fluid'>
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
                                <h5>Review post information</h5>
                            </div>
                            <div className='card-body'>
                                <p>Shop rating: {this.props.reviewData.rating}</p>
                                <p>Shop comment: {this.props.reviewData.comment}</p>
                                <br />
                                <br />
                                <br />
                                <p>Are you sure you want to delete the review entry?</p>
                                <form method="POST" action={urlDeleteReviewPost}>
                                    <button type='submit'className = 'btn btn-sm btn-outline-danger'>DELETE</button>
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

module.exports = DeleteReview;