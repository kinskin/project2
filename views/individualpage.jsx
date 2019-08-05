var React = require("react");

class Individual extends React.Component {
  render() {
    let urlLogout = '/findfood/signout'
    let urlHome ='/findfood/homepage'
    let urlHalal = '/findfood/search/'+this.props.shop.location+'/halal';
    let urlVegetarian = '/findfood/search/'+this.props.shop.location+'/vegetarian';
     let urlNonHalalCategory = '/findfood/search/'+this.props.location+'/non-halal'
    let urlAllFood = '/findfood/search/'+this.props.shop.location;
    let urlPostReview = '/findfood/review/'+this.props.shop.foodplace_id+'/'+this.props.userData.id;
    let urlSearchLocation ='/findfood/search'
    let urlProfile = '/findfood/profile/'+this.props.userData.id;

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
        height:'200px',
        weight:'300px'
    }

    let postReview={
        width:'18rem',
        margin:'10px auto'
    }

    let shopStyle = {
        width:'18rem',
        margin:'0 auto'
    }

    let reviewStyle = {
        margin : '10px auto'
    }

    let profileImage = {
        height:'30px',
        width:'30px',
        borderRadius:'100%'
    }

    let bigProfileImageStyle = {
        height:'100px',
        width:'100px',
        borderRadius:'100%'
    }

    let mapReviews = this.props.shopReview.map(review=>{
        return(
            <div className="card text-left" style={reviewStyle}>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-3 text-center'>
                            <img style={bigProfileImageStyle} src={review.profile_image}/>
                            <h5 className="card-title">{review.profile_name}</h5>
                        </div>
                        <div className='col-9'>
                            <p>Rating: {review.rating}/5</p>
                            <p>Comment: {review.comment}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
            <link rel="stylesheet" href="/individual.css"/>
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
                        <a className='btn' href={urlProfile}>
                        <img className='d-inline-block align-top' style = {profileImage} src={this.props.userData.profile_image}/>{this.props.userData.profile_name}
                        </a>
                        <a className='d-inline-block align-top btn' href={urlLogout}>Sign out</a>
                    </div>
                </nav>
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                    <div className="col-4 collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link btn" href={urlAllFood}>All food</a>
                            </li>
                            <li className="nav-item">
                                    <a className="nav-link btn" href={urlNonHalalCategory}>Non-halal</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn" href={urlHalal}>Halal</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn" href={urlVegetarian}>Vegetarian</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-4 text-center'>
                        <h6 className='d-inline-block align-top'> Food shop at {this.props.shop.location}</h6>
                    </div>
                </nav>
                <div className="card text-center">
                    <div className="card mb-3">
                        <div className='row'>
                            <div className='col-3'></div>
                            <div className='col-6'>
                                <img style={image}className="card-img-top" src={this.props.shop.image_url}/>
                            </div>
                            <div className='col-3'></div>
                        </div>
                        <div className='row'>
                            <div className="card-body" style={allFoodStyle}>
                                <div className='col-4'>
                                    <div class="card" style={shopStyle}>
                                        <div class="card-body">
                                            <h5 class="card-title">{this.props.shop.shopname}</h5>
                                            <p>Location: {this.props.shop.location}</p>
                                            <p>Address: {this.props.shop.address}</p>
                                            <p>s({this.props.shop.postalcode})</p>
                                        </div>
                                    </div>
                                    <div className="card" style={postReview}>
                                        <div className='card-header'>Post review</div>
                                        <div className="card-body">
                                            <form method="POST" action={urlPostReview}>
                                                <div className="form-group">
                                                    <div className='text-left'>
                                                        <p className='card-title'>Rating</p>
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
                                                    <textarea type="text" name="comment" className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                                                </div>
                                                <div className="text-right">
                                                    <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Post</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-8'>
                                    <div className="card">
                                        <div className="card-header">{this.props.shop.shopname} Reviews</div>
                                        <div className='foodCard'>
                                            <div className='card-body'>
                                                <p>{mapReviews}</p>
                                            </div>
                                        </div>
                                    </div>
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

module.exports = Individual;