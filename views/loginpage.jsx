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
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Sign up
                        </button>
                    </div>
                </nav>

                <div className = 'row'>
                    <div className = 'col-9'>
                        <div className="card bg-dark text-white">
                            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="carousel-img carousel-img-1"></div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="carousel-img carousel-img-2"></div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="carousel-img carousel-img-3"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-img-overlay text-center">
                                <h2 className="card-title">Find Food</h2>
                                <br />
                                <h4 className="card-text">Don't know where to find food?</h4>
                                <h4 className='card-text'>Use FIND FOOD</h4>
                                <br />
                                <p className='card-text'>Put your own food location to help other when in need of food</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="card" style={cardStyle}>
                            <div className='card-header text-center'>
                                <h5 className="card-title">Login</h5>
                            </div>
                            <div className="card-body">
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

            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalCenterTitle">Sign up</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form method="POST" action={urlSignUp}>
                                                <div className='form-group'>
                                                    <p>Enter username: </p>
                                                    <input className = 'form-control form-control-sm' type="text" name="username" placeholder='Username'/>
                                                </div>
                                                <div className='form_group'>
                                                    <p>Enter profile name: </p>
                                                    <input className = 'form-control form-control-sm' type="text" name="profile_name" placeholder='Profile name'/>
                                                </div>
                                                <br />
                                                <div className='form-group'>
                                                    <p>Enter password: </p>
                                                    <input className = 'form-control form-control-sm' type="password" name="password" placeholder='password'/>
                                                </div>
                                                <br />
                                                <div className='text-right'>
                                                    <button className='btn btn-outline-primary' type="submit">Sign up</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">Close</button>
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