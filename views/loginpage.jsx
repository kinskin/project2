var React = require("react");

class Login extends React.Component {
  render() {
    let urlLogin = '/findfood/login';
    let urlSignUp = '/findfood/signup';
    let navStyle = {
        margin:'10px 0'
    }
    let cardStyle = {
        width:'18 rem'
    }
    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
            <link rel="stylesheet" href="/style.css"/>
        </head>
        <body>
            <div className = 'container'>
                <nav style = {navStyle}className="navbar navbar-light bg-light">
                    <a className="navbar-brand mb-0 h1" href="#">
                    <img src="https://img.icons8.com/ios-glyphs/50/000000/restaurant-building.png" className='d-inline-block align-top' width = '30px' height='30px'/>FindFood
                    </a>
                    <div className='text-right'>
                        <a className='btn btn-primary' href={urlSignUp}>Sign-up</a>
                    </div>
                </nav>
                <div className = 'row'>
                    <div className = 'col-9'>
                        <div class="card bg-dark text-white">
                            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <div className="carousel-img carousel-img-1"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="carousel-img carousel-img-2"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="carousel-img carousel-img-3"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-img-overlay text-center">
                                <h2 class="card-title">Find Food</h2>
                                <br />
                                <h4 class="card-text">Don't know where to find food?</h4>
                                <h4 className='card-text'>Use FIND FOOD</h4>
                                <br />
                                <p className='card-text'>Put your own food location to help other when in need of food</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div class="card" style={cardStyle}>
                            <div className='card-header text-center'>
                                <h5 class="card-title">Login</h5>
                            </div>
                            <div class="card-body">
                                <form method='post' action={urlLogin}>
                                    <div className="form-group">
                                        <p className="card-title">Username:</p>
                                        <input className='form-control form-control-sm'type='text' name='username' placeholder='Enter username'/>
                                    </div>
                                    <div className="form-group">
                                        <p className="card-title">Password:</p>
                                        <input className='form-control form-control-sm'type='password' name='password' placeholder='Enter password'/>
                                    </div>
                                    <br />
                                    <div className = "text-right">
                                        <button className="btn btn-primary my-2 my-sm-0" type="submit">Login</button>
                                        <br />
                                        <br />
                                        <a href='' >Forgot password?</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = Login;