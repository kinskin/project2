var React = require("react");

class Category extends React.Component {
  render() {
    let urlLogout = '/findfood/signout'
    let urlHome ='/findfood/homepage'
    let urlHalal = '/findfood/search/'+this.props.location+'/halal';
    let urlVegetarian = '/findfood/search/'+this.props.location+'/vegetarian';
    let urlNonHalalCategory = '/findfood/search/'+this.props.location+'/non-halal'
    let urlAllFood = '/findfood/search/'+this.props.location;
    let urlSearchLocation ='/findfood/search'
    let urlProfile = '/findfood/profile/'+this.props.userData.id;
    var urlFoodPost = '/findfood/foodpost/'+this.props.userData.id;

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
        flexWrap:'wrap',
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

    let mapFoodLocation = this.props.allMentionedFoodResult.map(food=>{
        let urlIndividualShop = '/findfood/individual/'+food.id;
        let urlSearchByLocation = '/findfood/search/'+food.location;
        let urlSearchByCategory = '/findfood/category/'+food.category;
        return(
            <div className="card" style={shopStyle}>
                <a href={urlIndividualShop}>
                    <img style={shopImageCategory} className="card-img-top" src={food.image_url} />
                </a>
                <div className="card-body">
                    <h5 className="card-title">{food.shopname}</h5>
                    <p>Location: {food.location}</p>
                    <p>Address: {food.address}</p>
                    <p>s({food.postalcode})</p>
                </div>
                <div className="card-footer">
                    <a className='btn btn-sm' href={urlSearchByCategory}>#{food.category}</a>
                    <a className='btn btn-sm' href={urlSearchByCategory}>#{food.location}</a>
                </div>
            </div>
        )
    })

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
            <link rel="stylesheet" href="/category.css"/>
        </head>
        <body>
            <div className = 'container-fluid'>
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
                        <h6>All {this.props.category} food shop at {this.props.location}</h6>
                    </div>
                    <div className ='col-4 text-right'>
                        <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
                            Add shop location</button>
                    </div>
                </nav>
                <div class="card text-center">
                    <div className="foodCard">
                        <div class="card-body" style={allFoodStyle}>
                            <p>{mapFoodLocation}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add shop location</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form method="POST" action={urlFoodPost}>
                                <div className = 'form-group'>
                                    <p>Enter shop name:</p>
                                    <input className = 'form-control form-control-sm' type="text" name="shopname" placeholder='Enter shop name'/>
                                </div>
                                <div className='form-group'>
                                    <p>Enter shop address:</p>
                                    <input className = 'form-control form-control-sm' type="text" name="address" placeholder='Enter shop address'/>
                                </div>
                                <div className='form-group'>
                                    <p>Enter shop postalcode:</p>
                                    <input className = 'form-control form-control-sm' type="text" name="postalcode" placeholder='Enter postal code'/>
                                </div>
                                <div className='form-group'>
                                    <p>Enter shop location: (e.g tanjung pagar, yishun, ....)</p>
                                    <input className = 'form-control form-control-sm' type="text" name="location" readOnly='readOnly'defaultValue={this.props.location}/>
                                </div>
                                <div className='form-group'>
                                    <p>Enter shop photo:</p>
                                    <input className='btn btn-sm'type="file" name='image_url'/>
                                </div>
                                <div className='form-group'>
                                    <p>Enter category of food: (normal/halal/vegeterian)</p>
                                    <input className = 'form-control form-control-sm' type="text" name="category" placeholder='normal/halal/vegetarian'/>
                                </div>
                                <br />
                                <div className='text-right'>
                                    <button type="submit" className = 'btn btn-outline-success'>Post</button>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
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

module.exports = Category;