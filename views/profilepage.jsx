var React = require("react");

class ProfilePage extends React.Component {
  render() {
    let urlHome = '/findfood/homepage';
    let urlLogout = '/findfood/signout';
    let urlSearchLocation ='/findfood/search';
    let urlProfile = '/findfood/profile/'+this.props.userId;
    let urlShowAllFoodPlace = '/findfood/showallfoodpost/'+this.props.userId;
    let urlShowAllReviews = '/findfood/showallreviews/'+this.props.userId;

    let navStyle = {
        margin:'10px 0 0 0'
    }

    let image = {
        height: '400px',
        widht: '600px'
    }

    let allFoodStyle = {
        display:'flex',
        flexWrap:'wrap',
    }

    let shopImageCategory = {
        height:'150px',
        weight:'300px'
    }

    let postReview={
        width:'18rem',
        margin:'10px auto'
    }

    let shopStyle = {
        width:'16rem',
        margin:'10px auto'
    }

    let reviewRow = {
        maxWidth:'100%'
    }

    let shopRowCategory = {
        height:'100px',
        weight:'150px',
        margin:' 10px auto'
    }
    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
            <link rel="stylesheet" href="/profile.css"/>
        </head>
        <body>
            <div className='container-fluid'>
                <nav style = {navStyle} className="navbar navbar-light bg-light">
                    <a className="navbar-brand mb-0 h1" href={urlHome}>
                    <img src="https://img.icons8.com/ios-glyphs/50/000000/restaurant-building.png" className='d-inline-block align-top' width = '30px' height='30px'/>FindFood
                    </a>
                    <div className='text-center'>
                        <form className='d-flex justify-content-center form-inline'method='POST' action={urlSearchLocation}>
                            <div className='form-group'>
                                <input className='form-control form-control-sm'type='text' name='search' placeholder='Search by location'/>
                                <div className='text-right'>
                                    <button className = 'btn btn-sm d-inline-block' type='submit'>Search</button>
                                </div>
                            </div>
                        </form>
                        <small id="emailHelp" class="form-text text-muted">Search by location: (e.g : tanjong pagar, bishan, yishun,.....)</small>
                    </div>
                    <div className = 'text-right'>
                        <a className='btn' href={urlProfile}>{this.props.userData.profile_name}</a>
                        <a className='btn' href={urlLogout}>Sign out</a>
                    </div>
                </nav>
                <div className='row'>
                    <div className='col-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='card-title'>{this.props.userData.profile_name}
                                </div>
                                <div className='card-text'>
                                    <p>Reviews made: {this.props.userTotalReviewNum.count}</p>
                                    <p>Food shop post made: {this.props.userTotalFoodPlacePost.count}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-9'>
                        <div className='card'>
                            <div className='card-header'>
                                <h5>Your post</h5>
                            </div>
                            <div className='card'>
                                <div className = 'card-header'>
                                    <p>Your food places posts</p>
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-4'>
                                            <div className='card'>
                                                <img style = {shopImageCategory} class="card-img-top" src={this.props.userFoodPlacePost[0].image_url}/>
                                                <div className='card-body'>
                                                    <p className='card-title'>{this.props.userFoodPlacePost[0].shopname}</p>
                                                    <p>Address: {this.props.userFoodPlacePost[0].address}</p>
                                                    <p>Postal Code: {this.props.userFoodPlacePost[0].postalcode}</p>
                                                    <p>Location: {this.props.userFoodPlacePost[0].location}</p>
                                                    <p>Category: {this.props.userFoodPlacePost[0].category}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className='card'>
                                                <img style = {shopImageCategory} class="card-img-top" src={this.props.userFoodPlacePost[1].image_url}/>
                                                <div className='card-body'>
                                                    <p className='card-title'>{this.props.userFoodPlacePost[1].shopname}</p>
                                                    <p>Address: {this.props.userFoodPlacePost[1].address}</p>
                                                    <p>Postal Code: {this.props.userFoodPlacePost[1].postalcode}</p>
                                                    <p>Location: {this.props.userFoodPlacePost[1].location}</p>
                                                    <p>Category: {this.props.userFoodPlacePost[1].category}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className='card'>
                                                <img style = {shopImageCategory} class="card-img-top" src={this.props.userFoodPlacePost[2].image_url}/>
                                                <div className='card-body'>
                                                    <p className='card-title'>{this.props.userFoodPlacePost[2].shopname}</p>
                                                    <p>Address: {this.props.userFoodPlacePost[2].address}</p>
                                                    <p>Postal Code: {this.props.userFoodPlacePost[2].postalcode}</p>
                                                    <p>Location: {this.props.userFoodPlacePost[2].location}</p>
                                                    <p>Category: {this.props.userFoodPlacePost[2].category}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='card-footer text-right'>
                                    <a href={urlShowAllFoodPlace}>Show all your food places post</a>
                                </div>
                            </div>
                            <div className='card'>
                                <div className='card-header'>
                                    <p>Your food places reviews</p>
                                </div>
                                <div className="card mb-3" style={reviewRow}>
                                    <div className="row no-gutters">
                                        <div className="col-3">
                                            <div className = 'card-body'>
                                                <img style = {shopRowCategory} src={this.props.userReviewData[0].image_url}/>
                                            </div>
                                        </div>
                                        <div class="col-9">
                                            <div class="card-body">
                                                <p className="card-title">{this.props.userReviewData[0].shopname}</p>
                                                <p>Rating: {this.props.userReviewData[0].rating}/5</p>
                                                <p>Comment: {this.props.userReviewData[0].comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-3" style={reviewRow}>
                                    <div className="row no-gutters">
                                        <div className="col-3">
                                            <div className = 'card-body'>
                                                <img style = {shopRowCategory} src={this.props.userReviewData[1].image_url}/>
                                            </div>
                                        </div>
                                        <div class="col-9">
                                            <div class="card-body">
                                                <p className="card-title">{this.props.userReviewData[1].shopname}</p>
                                                <p>Rating: {this.props.userReviewData[1].rating}/5</p>
                                                <p>Comment: {this.props.userReviewData[1].comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-3" style={reviewRow}>
                                    <div className="row no-gutters">
                                        <div className="col-3">
                                            <div className = 'card-body'>
                                                <img style = {shopRowCategory} src={this.props.userReviewData[2].image_url}/>
                                            </div>
                                        </div>
                                        <div class="col-9">
                                            <div class="card-body">
                                                <p className="card-title">{this.props.userReviewData[2].shopname}</p>
                                                <p>Rating: {this.props.userReviewData[2].rating}/5</p>
                                                <p>Comment: {this.props.userReviewData[2].comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                 <div className='card-footer text-right'>
                                    <a href={urlShowAllReviews}>Show all your reviews post</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = ProfilePage;