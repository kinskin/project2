var React = require("react");

class AllCategorized extends React.Component {
  render() {
    let urlProfile = '/findfood/profile/'+this.props.userId;
    let urlLogout = '/findfood/signout'
    let urlSearchLocation ='/findfood/search'
    let urlAddNewPlace = '/findfood/addfoodplace/'+this.props.userId;
    let urlFoodPost = '/findfood/foodpost/'+this.props.userId;
    let urlHalalCategory = '/findfood/category/halal'
    let urlVegeterianCategory = '/findfood/category/vegetarian'
    let urlNonHalalCategory = '/findfood/category/non-halal'

    let urlHome ='/findfood/homepage'
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

    let mapFoodPlace = this.props.foodShop.map(allShop=>{
        let urlIndividualShop = '/findfood/individual/'+allShop.foodplace_id;
        let urlSeacrhByLocation = '/findfood/search'+allShop.location;
        let urlSearchByCategory = '/findfood/category'+allShop.category;
        return(
            <div class="card" style={shopStyle}>
                <a href={urlIndividualShop}>
                    <img style={shopImageCategory} class="card-img-top" src={allShop.image_url} />
                </a>
                <div class="card-body">
                    <h5 class="card-title">{allShop.shopname}</h5>
                    <p>Location: {allShop.location}</p>
                    <p>Address: {allShop.address}</p>
                    <p>s({allShop.postalcode})</p>
                </div>
                <div class="card-footer">
                    <a className ='btn btn-sm' href={urlSeacrhByLocation}>#{allShop.location}</a>
                    <a className='btn btn-sm' href={urlSearchByCategory}>#{allShop.category}</a>
                </div>
            </div>
        )
    })

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
            <link rel="stylesheet" href="/homepage.css"/>
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
                <div className ='row'>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <div class="card bg-dark text-white" id="test">
                            <img src="https://www.nea.gov.sg/images/default-source/our-serivces/hawker-management/chomp-chomp-food-centre.jpg" class="card-img"/>
                            <div class="card-img-overlay">
                                <form method='POST' action={urlSearchLocation}>
                                    <div className='form-group'>
                                        <input className='form-control'type='text' name='search' placeholder='Search by location'/>
                                        <small>Search by location: (e.g : tanjong pagar, bishan, yishun,.....)</small>
                                        <br />
                                        <div className='text-right'>
                                            <button className = 'btn btn-primary' type='submit'>Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'></div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link btn" href={urlHome}>All food</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn" href={urlNonHalalCategory}>Non-halal</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn" href={urlHalalCategory}>Halal</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn" href={urlVegeterianCategory}>Vegetarian</a>
                            </li>
                        </ul>
                    </div>
                    <div className = 'text-right'>
                        <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
                            Add shop location</button>
                    </div>
                </nav>
                <div class="card">
                    <div class="card-header"> All {this.props.category} food places
                    </div>
                    <div className="foodCard">
                        <div class="card-body" style={allFoodStyle}>
                            <p>{mapFoodPlace}</p>
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
                            <form encType="multipart/form-data" method="POST" action={urlFoodPost}>
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
                                    <p>Enter shop location: (e.g tanjong pagar, yishun, ....)</p>
                                    <input className = 'form-control form-control-sm' type="text" name="location" placeholder='Enter location'/>
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

module.exports = AllCategorized;