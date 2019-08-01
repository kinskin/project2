console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser')
const sha256 = require('js-sha256');

// Initialise postgres client
const configs = {
  user: 'mohammadasshikin',
  host: '127.0.0.1',
  database: 'foodie',
  port: 5432
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));
app.use(express.static(__dirname+'/public/'));
app.use(cookieParser());

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);


/**
 * ===================================
 * Function
 * ===================================
 */


let logout = (request,response)=>{
    // response.send('inside logout function');
    response.clearCookie('logged_in');
    response.cookie('loggedin');
    response.clearCookie('user_id');
    response.redirect('/findfood');
}

let postReview = (request,response)=>{
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        // response.send('inside post review function');
        console.log('this is the shop_id: ',request.params.shop_id)
        console.log('this is the user_id: ',request.params.user_id)
        console.log(request.body);
        let query = 'insert into reviews(rating, comment, shop_id, user_id) values($1, $2, $3, $4)';
        let values = [request.body.rating, request.body.comment,request.params.shop_id,request.params.user_id]
        console.log(values);
        pool.query(query,values,(error,result)=>{
            if(error){
                console.log('error',error);
                response.send('error in inserting data');
            }
            else{
                console.log(result.rows);
                response.redirect('/findfood/individual/'+request.params.shop_id);
            }
        })
    }
}

let showIndividualShop = (request,response)=>{
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        // response.send('inside showIndividualShop function');
        console.log(request.params.id);
        let query = 'select * from foodplace where id = $1';
        let values = [request.params.id];
        pool.query(query,values,(error,result)=>{
            if(error){
                console.log('error',error);
                response.send('error in checking database');
            }
            else{
                // console.log(result.rows[0]);
                let data = {
                    shop:result.rows[0]
                }
                console.log(data);
                response.render('individualpage',data);
            }
        })
    }
}


let showMentionedCategory = (request,response)=>{
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        // response.send('inside showMentionedCategory function');
        // console.log('this is the location: ', request.params.location);
        // console.log('this is the selected category: ', request.params.category);
        let query = 'select * from foodplace where location = $1 and category = $2';
        let values = [request.params.location,request.params.category];
        // console.log(values);
        pool.query(query,values,(error,result)=>{
            if(error){
                console.log('error',error);
                response.send('error in checking database')
            }
            else{
                // console.log(result.rows);
                let data = {
                    location:request.params.location,
                    category:request.params.category,
                    allMentionedFoodResult: result.rows
                }
                console.log(data);
                response.render('category',data);
            }
        })
    }
}

let showAllFood = (request,response)=>{
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        // response.send('inside show all food function');
        console.log(request.params.location);
        let query = 'select * from foodplace where location = $1'
        let values = [request.params.location];
        pool.query(query,values,(error,result)=>{
            if(error){
                console.log('error', error);
            }
            else{
                console.log(result.rows);
                let data = {
                    location: request.params.location,
                    allFoodAtLocation : result.rows
                }
                response.render('allfoodlocationpage',data);
            }
        })
    }
}

let searchByLocation = (request,response)=>{
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        console.log(request.body.search);
    // response.send('inside search by location function');
        response.redirect('/findfood/search/'+request.body.search);
    }
}

let foodPost = (request,response)=>{
    // console.log(request.params.id);
    // console.log(request.body);
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        let query = 'insert into foodplace(shopname, address, postalcode, location, image_url, category, user_id) values($1, $2, $3, $4, $5, $6, $7)'
        let values = [request.body.shopname, request.body.address, request.body.postalcode, request.body.location, request.body.image_url, request.body.category, request.params.id];
        console.log(values);
        pool.query(query,values,(error,result)=>{
            if(error){
                console.log('error',error);
                response.send('error in saving the data in database');
            }
            else{
                console.log(result.rows)
                response.redirect('/findfood/homepage')
            }
        })
    }
}

let profilePage = (request,response)=>{
    // console.log('profile page of user with userId: ',request.params.id);
    console.log('cookies in profilePage',request.cookies);
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        // response.send('inside profile page function');
        let data = {
            userId : request.cookies.user_id
        }
        response.render('profilepage',data);
    }

}

let addFoodPlacePage = (request,response)=>{
    // response.send('inside addFoodPlacePage function');
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        console.log(request.params.id);
        let data = {
            userId : request.params.id
        }
    response.render('addfoodplace',data)
    }
}

let homePage = (request,response)=>{
    // response.send('inside homepage function');
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        // console.log('cookies inside homepage function to view ',request.cookies);
        let query = 'select * from foodplace'
        pool.query(query,(error,result)=>{
            if(error){
                console.log('error',error);
                response.send('error in checking data');
            }
            else{
                // console.log(result.rows);
                let data = {
                    userId : request.cookies.user_id,
                    placeData:result.rows
                }
                response.render('homepage',data)
            }
        })
    }
}


let loginCheck = (request,response)=>{
    // response.send('inside logincheck function');
    // console.log(request.body);
    let username = request.body.username;
    let password = sha256(request.body.password);
    let query = 'select * from users where username = $1';
    let values = [username];
    pool.query(query,values,(error,result)=>{
        if(error){
            console.log('error',error);
            response.send('Error in checking the database');
        }
        else{
            // console.log(result.rows[0]);
            if(result.rows.length > 0){
                if(username === result.rows[0].username && password === result.rows[0].password){
                    let userId = result.rows[0].id;
                    let currentSessionCookie = sha256(userId + 'logged_id');
                    response.cookie('logged_in', currentSessionCookie);
                    response.cookie('loggedin', true);
                    response.cookie('user_id', userId);
                    response.redirect('/findfood/homepage')
                }
            }
        }
    })
}

let createAccountCheck = (request,response)=>{
    // response.send('inside createaccountcheck function');
    let username = request.body.username;
    let password = sha256(request.body.password);
    let profileName = request.body.profile_name;
    let query = 'select username from users where username = $1';
    let values = [request.body.username];
    // console.log(password);
    pool.query(query,values,(error,result)=>{
        if(error){
            console.log('error',error);
            response.send('Error in checking the database');
        }
        else{
            if(result.rows.length > 0){
                response.send('Account with similar username exist. Pick another.');
            }
            else{
                let query = 'insert into users (username, password, profile_name) values ($1, $2, $3)';
                values = [username,password,profileName];
                pool.query(query,values,(error,result)=>{
                    if(error){
                        // console.log('error',error);
                        response.send('Error in inserting data to database');
                    }
                    else{
                        // console.log('Done inputing the data to database');
                        response.redirect('/findfood');
                    }
                })
            }
        }
    })
}

let createAccount = (request,response)=>{
    // response.send('inside createAccount function');
    response.render('createaccountpage')
}

let login = (request,response)=>{
    // response.send('inside admin post')
    console.log(request.cookies);
    response.render('loginpage')
}

let home = (request,response)=>{
    response.redirect('/findfood')
}

/**
 * ===================================
 * Routes
 * ===================================
 */

app.post('/findfood/review/:shop_id/:user_id', postReview);

app.get('/findfood/individual/:id',showIndividualShop);

app.get('/findfood/search/:location/:category', showMentionedCategory);

app.get('/findfood/search/:location', showAllFood);

app.post('/findfood/search', searchByLocation);

app.post('/findfood/foodpost/:id', foodPost);

app.get('/findfood/signout',logout);

app.get('/findfood/profile/:id',profilePage);

app.get('/findfood/addfoodplace/:id',addFoodPlacePage);

app.get('/findfood/homepage',homePage);

app.post('/findfood/signup',createAccountCheck);

app.post('/findfood/login',loginCheck);

app.get('/findfood/signup',createAccount);

app.get('/findfood', login);

app.get('/', home);


/**
 * ===================================
 * Listen to requests on port
 * ===================================
 */
const PORT = 3010;
const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);