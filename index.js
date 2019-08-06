console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser')
const sha256 = require('js-sha256');
var cloudinary = require('cloudinary');
var multer = require('multer');
// var upload = multer({ dest: './upload/' });
var storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, './upload')
  },
  filename: function (request, file, cb) {
    cb(null,file.originalname)
  }
})
var upload = multer({ storage: storage })


// Initialise postgres client
//require the url library
//this comes with node, so no need to yarn add
const url = require('url');

//check to see if we have this heroku environment variable
if( process.env.DATABASE_URL ){

  //we need to take apart the url so we can set the appropriate configs

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  //make the configs object
  var configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

}else{

  //otherwise we are on the local network
  var configs = {
      user: 'mohammadasshikin',
      host: '127.0.0.1',
      database: 'foodie',
      port: 5432
    };
}

cloudinary.config({
cloud_name: 'kinskin',
api_key: '247796894467252',
api_secret: '7lp9R--e0hOxUv0nROCeD0OyBVc'
});

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

let deleteReview = (request,response)=>{
    // console.log(request.params.review_id);
    // response.send('inside deletereview function');
    let query = 'DELETE from reviews WHERE review_id =$1'
    let values=[request.params.review_id];
    pool.query(query,values,(error,result)=>{
        if(error){
            console.log('error',error);
            response.send('error in deleting data')
        }
        else{
            response.redirect('/findfood/showallreviews/'+request.cookies.user_id)
        }
    })
}

let deleteReviewPage = (request,response)=>{
    // console.log(request.params.review_id);
    // response.send('inside deletereviewpage function');
    let query = 'select * from reviews where review_id = $1'
    let values = [request.params.review_id];
    pool.query(query,values,(error,result)=>{
        if(error){
            console.log('error',error)
            response.send('error in checking database');
        }
        else{
            // console.log(result.rows[0]);
            if(result.rows.length>0){
                let query2='select * from users where id=$1'
                values = [request.cookies.user_id]
                pool.query(query2,values,(error,result2)=>{
                    if(error){
                        console.log('error',error)
                        response.send('error in checking data base')
                    }
                    else{
                        let data = {
                            userId:request.cookies.user_id,
                            reviewData : result.rows[0],
                            userData:result2.rows[0]
                        }
                        response.render('deletereviewpage',data)
                    }
                })
            }
        }
    })
}

let updateReview = (request,response)=>{
    // console.log(request.body);
    // console.log(request.params.review_id);
    // response.send('inside update function');
    let query = 'UPDATE reviews SET rating = $1, comment = $2 WHERE review_id = $3'
    let values=[request.body.rating, request.body.comment,request.params.review_id];
    console.log(values);
    pool.query(query,values,(error,result)=>{
        if(error){
            console.log('error',error);
            response.send('error in updating database');
        }
        else{
            response.redirect('/findfood/showallreviews/'+request.cookies.user_id);
        }
    })
}

let reviewEditPage = (request,response)=>{
    // console.log(request.params.review_id);
    // response.send('inside reviewEditPage function');
    let query = 'select * from reviews where review_id = $1'
    let values = [request.params.review_id];
    pool.query(query,values,(error,result)=>{
        if(error){
            console.log('error',error)
            response.send('error in checking database');
        }
        else{
            console.log(result.rows[0]);
            if(result.rows.length>0){
                let query2='select * from users where id=$1'
                values = [request.cookies.user_id]
                pool.query(query2,values,(error,result2)=>{
                    if(error){
                        console.log('error',error)
                        response.send('error in checking data');
                    }
                    else{
                        let data = {
                            userId:request.cookies.user_id,
                            reviewData:result.rows[0],
                            userData:result2.rows[0]
                        }
                        response.render('editreviewpage' ,data);
                    }
                })
            }
        }
    })
}

let deleteFoodPlace = (request,response)=>{
    console.log(request.params.foodplace_id)
    // response.send('inside delete food place function');
    let query ='DELETE from foodplace WHERE foodplace_id =$1'
    let values=[request.params.foodplace_id]
    pool.query(query,values,(error,result)=>{
        if(error){
            console.log('error',error);
            response.send('error in deleting the data from database');
        }
        else{
            response.redirect('/findfood/homepage')
        }
    })
}

let deleteFoodPlacePage = (request,response)=>{
    console.log(request.params.foodplace_id);
    // response.send('inside deletefoodplacepage function');
    let query = 'select * from foodplace where foodplace_id=$1'
    let values = [request.params.foodplace_id];
    pool.query(query,values,(error,result)=>{
        if(error){
            console.log('error',error);
            response.send('error checking database');
        }
        else{
            // console.log(result.rows[0]);
            if(result.rows.length>0){
                let query2 = 'select * from users where id = $1'
                values = [request.cookies.user_id]
                pool.query(query2,values,(error,result2)=>{
                    if(error){
                        console.log('error',error)
                        response.send('error checking database')
                    }
                    else{
                        // console.log(result2.rows[0])
                        let data = {
                            userId:request.cookies.user_id,
                            foodPlaceData:result.rows[0],
                            userData:result2.rows[0]
                        }
                        response.render('deletefoodplace',data);
                    }
                })
            }
        }
    })
}

let userUpdateFoodPlacePost = (request,response)=>{
    // response.send('inside userUpdateFoodPlacePost function');
    console.log(request.params.foodplace_id);
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        // console.log(request.body);
        cloudinary.uploader.upload(request.file.path, function(result) {
            // console.log(result.url);
            let query = 'UPDATE foodplace SET shopname=$1, address=$2, postalcode=$3, location=$4, image_url=$5 WHERE foodplace_id = $6'
            let values = [request.body.shopname, request.body.address, request.body.postalcode, request.body.location, result.url, request.params.foodplace_id];
            // console.log(values);
            pool.query(query,values,(error,result)=>{
                if(error){
                    console.log('error',error);
                    response.send('error in updating the database');
                }
                else{
                    response.redirect('/findfood/individual/'+request.params.foodplace_id);
                }
            })
        });
    }
}

let editFoodplacePage = (request,response)=>{
    console.log(request.params.foodplace_id);
    // response.send('inside editfoodplacepage function');
    let query = 'select * from foodplace where foodplace_id=$1';
    let values=[request.params.foodplace_id];
    pool.query(query,values,(error,result)=>{
        if(error){
            console.log('error',error);
            response.send('error in checking database');
        }
        else{
            if(result.rows.length>0){
                let query2='select * from users where id=$1'
                values = [request.cookies.user_id]
                pool.query(query2,values,(error,result2)=>{
                    if(error){
                        console.log('error',error)
                        response.send('error in checking data');
                    }
                    else{
                        let data = {
                            userId:request.cookies.user_id,
                            foodPlaceData:result.rows[0],
                            userData:result2.rows[0]
                        }
                        response.render('editfoodplaceform',data)
                    }
                })
            }
        }
    })
}

let userAllReviewsPost = (request,response)=>{
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        console.log(request.params.id);
    // response.send('inside userAllReviewsPost function');
        let query = 'select * from users where id=$1'
        let values = [request.params.id]
        pool.query(query,values,(error,result)=>{
            if(error){
                console.log('error',error);
                response.send('error in checking database');
            }
            else{
                // console.log(result.rows[0]);
                if(result.rows.length>0){
                    let query2 = 'select reviews. review_id, reviews.rating, reviews.comment, foodplace.foodplace_id, foodplace.shopname, foodplace.image_url from reviews inner join foodplace on(foodplace.foodplace_id = reviews.shop_id) where reviews.user_id = $1'
                    pool.query(query2,values,(error,result2)=>{
                        if(error){
                            console.log('error',error);
                            response.send('error in checking database');
                        }
                        else{
                            // console.log(result2.rows);
                            if(result2.rows.length>0){
                                let query3 ='select count(*) from users inner join reviews on (users.id = reviews.user_id) where users.id = $1';
                                pool.query(query3,values,(error,result3)=>{
                                    if(error){
                                        console.log('error',error);
                                        response.send('error in checking database');
                                    }
                                    else{
                                        console.log(result3.rows[0]);
                                        if(result3.rows.length>0){
                                            let query4 = 'select count(*) from users inner join foodplace on (users.id = foodplace.user_id) where users.id = $1'
                                            pool.query(query4,values,(error,result4)=>{
                                                if(error){
                                                    console.log('error',error);
                                                }
                                                else{
                                                    console.log(result4.rows[0]);
                                                    let data = {
                                                        userId:request.cookies.user_id,
                                                        userData:result.rows[0],
                                                        allShopReviews:result2.rows,
                                                        userTotalReviewNum:result3.rows[0],
                                                        userTotalFoodPlacePost:result4.rows[0]
                                                    }
                                                    console.log(data);
                                                    response.render('userallreviewpost',data);
                                                }
                                            })
                                        }
                                        else{

                                        }
                                    }
                                })
                            }
                            else{

                            }

                        }
                    })
                }
                else{
                    response.send('no such users')
                }
            }
        })
    }
}

let userAllFoodplacesPost = (request,response)=>{
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        // console.log(request.params.id);
        // response.send('inside userAllFoodPlacesPost function');
        let query = 'select * from users where id=$1'
        let values = [request.params.id]
        pool.query(query,values,(error,result)=>{
            if(error){
                console.log('error',error);
                response.send('error in checking database');
            }
            else{
                // console.log(result.rows[0]);
                if(result.rows.length>0){
                    let query2 = 'select users.id, foodplace.foodplace_id, foodplace.shopname, foodplace.address, foodplace.postalcode, foodplace.location, foodplace.category, foodplace.image_url from users inner join foodplace on (users.id = foodplace.user_id) where users.id = $1'
                    pool.query(query2,values,(error,result2)=>{
                        if(error){
                            console.log('error',error);
                            response.send('error in checking database');
                        }
                        else{
                            // console.log(result2.rows);
                            if(result2.rows.length>0){
                                let query3 ='select count(*) from users inner join reviews on (users.id = reviews.user_id) where users.id = $1';
                                pool.query(query3,values,(error,result3)=>{
                                    if(error){
                                        console.log('error',error);
                                        response.send('error in checking database');
                                    }
                                    else{
                                        console.log(result3.rows[0]);
                                        if(result3.rows.length>0){
                                            let query4 = 'select count(*) from users inner join foodplace on (users.id = foodplace.user_id) where users.id = $1'
                                            pool.query(query4,values,(error,result4)=>{
                                                if(error){
                                                    console.log('error',error);
                                                }
                                                else{
                                                    console.log(result4.rows[0]);
                                                    let data = {
                                                        userId:request.cookies.user_id,
                                                        userData:result.rows[0],
                                                        allFoodPlacePost:result2.rows,
                                                        userTotalReviewNum:result3.rows[0],
                                                        userTotalFoodPlacePost:result4.rows[0]
                                                    }
                                                    console.log(data);
                                                    response.render('userallfoodpost',data);
                                                }
                                            })
                                        }
                                        else{

                                        }
                                    }
                                })
                            }
                            else{

                            }

                        }
                    })
                }
                else{
                    response.send('no such users')
                }
            }
        })
    }
}

let showCategory = (request,response)=>{
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up')
    }
    else{
        console.log(request.params.categoryname);
    // response.send('inside the show category function');
        let query = 'select * from foodplace where category=$1';
        let values = [request.params.categoryname]
        pool.query(query,values,(error,result)=>{
            if(error){
                console.log('error',error);
                response.send('error in checking data');
            }
            else{
                // console.log(result.rows);
                if(result.rows.length > 0){
                    let query2 = 'select * from users where id = $1';
                    values = [request.cookies.user_id];
                    pool.query(query2,values,(error,result2)=>{
                        if(error){
                            console.log('error',error);
                            response.send('error in checking data');
                        }
                        else{
                            let data={
                                foodShop:result.rows,
                                userData:result2.rows[0],
                                userId:request.cookies.user_id,
                                category:request.params.categoryname
                            }
                            // console.log(data);
                            response.render('allcategorized',data);
                        }
                    })
                }
            }
        })
    }
}


let postReview = (request,response)=>{
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        // response.send('inside post review function');
        // console.log('this is the shop_id: ',request.params.shop_id)
        // console.log('this is the user_id: ',request.params.user_id)
        // console.log(request.body.rating);
        // console.log(request.body.comment);
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
        // console.log(request.params.id);
        let query = 'select * from foodplace where foodplace_id = $1';
        let values = [request.params.id];
        pool.query(query,values,(error,result)=>{
            if(error){
                console.log('error',error);
                response.send('error in checking database');
            }
            else{
                // console.log(result.rows[0]);
                if(result.rows.length>0){
                    let query2 = 'select * from users where id = $1'
                    values = [request.cookies.user_id]
                    pool.query(query2,values,(error, result2)=>{
                        if(error){
                            console.log('error',error);
                            response.send('error in checking data');
                        }
                        else{
                            // console.log(result2.rows[0]);
                            if(result2.rows.length>0){
                                let query3 = 'SELECT reviews.review_id,reviews.rating, reviews.comment, users.profile_name, users.profile_image FROM reviews INNER JOIN users ON (users.id = reviews.user_id) where shop_id = $1 order by reviews.review_id desc';
                                values = [request.params.id];
                                pool.query(query3,values,(error,result3)=>{
                                    if(error){
                                        console.log('error',error);
                                        response.send('error in checking database');
                                    }
                                    else{
                                        console.log(result3.rows)
                                        let data = {
                                            shop:result.rows[0],
                                            userData:result2.rows[0],
                                            shopReview:result3.rows
                                        }
                                        // console.log(data);
                                        response.render('individualpage',data);
                                    }
                                })
                            }
                        }
                    })
                }
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
                // console.log(request.cookies.user_id)
                if(result.rows.length > 0){
                    let query2='select * from users where id = $1'
                    values = [request.cookies.user_id]
                    pool.query(query2,values,(error,result2)=>{
                        if(error){
                            console.log('error',error);
                            response.send('error in checking the database');
                        }
                        else{
                            let data = {
                                location:request.params.location,
                                category:request.params.category,
                                allMentionedFoodResult: result.rows,
                                userData:result2.rows[0]
                            }
                            // console.log(data);
                            response.render('category',data);
                        }
                    })
                }
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
        // console.log(request.params.location);
        // console.log(request.cookies.user_id);
        let query = 'select * from foodplace where location = $1'
        let values = [request.params.location];
        pool.query(query,values,(error,result)=>{
            if(error){
                console.log('error', error);
                response.send('error in fetching data');
            }
            else{
                // console.log(result.rows.length);
                if(result.rows.length > 0){
                    let query2 = 'select * from users where id=$1';
                    values = [request.cookies.user_id];
                    pool.query(query2,values,(error,result2)=>{
                        if(error){
                            console.log('error',error);
                            response.send('error in fetching data')
                        }
                        else{
                            console.log(result2.rows[0]);
                            let data = {
                                location: request.params.location,
                                allFoodAtLocation : result.rows,
                                userData:result2.rows[0]
                            }
                            response.render('allfoodlocationpage',data);
                        }
                    })
                }
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
        // console.log(request.file);
        console.log(request.body);
        cloudinary.uploader.upload(request.file.path, function(result) {
            console.log(result.url);
            // response.send(result);
            let query = 'insert into foodplace(shopname, address, postalcode, location, image_url, category, user_id) values($1, $2, $3, $4, $5, $6, $7)'
            let values = [request.body.shopname, request.body.address, request.body.postalcode, request.body.location, result.url, request.body.category, request.params.id];
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
        });
    }
}

let profilePage = (request,response)=>{
    // console.log('profile page of user with userId: ',request.params.id);
    // console.log('cookies in profilePage',request.cookies);
    if(request.cookies.logged_in === undefined || request.cookies.loggedin === false){
        response.send('Please login or sign up');
    }
    else{
        let query = 'select * from users where id = $1';
        let values = [request.cookies.user_id];
        pool.query(query,values,(error,result)=>{
            if(error){
                console.log('error',error)
                response.send('error in checking database');
            }
            else{
                // console.log(result.rows[0]);
                if(result.rows.length>0){
                    let query2 = 'select reviews. review_id, reviews.rating, reviews.comment,foodplace.foodplace_id,foodplace.shopname,foodplace.image_url from reviews inner join foodplace on(foodplace.foodplace_id = reviews.shop_id) where reviews.user_id = $1'
                    pool.query(query2,values,(error,result2)=>{
                        if(error){
                            console.log('error',error);
                            response.send('error in checking database');
                        }
                        else{
                            // console.log(result2.rows)
                            if(result2.rows.length>0){
                                let query3 = 'select users.id, foodplace.foodplace_id, foodplace.shopname, foodplace.address, foodplace.postalcode, foodplace.location, foodplace.category, foodplace.image_url from users inner join foodplace on (users.id = foodplace.user_id) where users.id = $1';
                                pool.query(query3,values,(error,result3)=>{
                                    if(error){
                                        console.log('error',error)
                                        response.send('error checking the database');
                                    }
                                    else{
                                        // console.log(result3.rows);
                                        if(result3.rows.length>0){
                                            let query4 ='select count(*) from users inner join reviews on (users.id = reviews.user_id) where users.id = $1';
                                            pool.query(query4,values,(error,result4)=>{
                                                if(error){
                                                    console.log('error',error)
                                                    response.send('error in checking database');
                                                }
                                                else{
                                                    // console.log(result4.rows[0]);
                                                    if(result4.rows.length>0){
                                                        let query5 = 'select count(*) from users inner join foodplace on (users.id = foodplace.user_id) where users.id = $1'
                                                        pool.query(query5,values,(error,result5)=>{
                                                            if(error){
                                                                console.log('error',error);
                                                                response.send('error in checking database');
                                                            }
                                                            else{
                                                                // console.log(result5.rows[0]);
                                                                let data = {
                                                                    userId:request.cookies.user_id,
                                                                    userData:result.rows[0],
                                                                    userReviewData:result2.rows,
                                                                    userFoodPlacePost:result3.rows,
                                                                    userTotalReviewNum:result4.rows[0],
                                                                    userTotalFoodPlacePost:result5.rows[0]
                                                                }
                                                                console.log(data);
                                                                response.render('profilepage',data);
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
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
    let outcome = false;
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
                outcome = true;
                if(outcome = true){
                    let query2 = 'select * from users where id = $1'
                    let values = [request.cookies.user_id]
                    pool.query(query2,values,(error,results)=>{
                        if(error){
                            console.log('error at second query', error);
                            response.send('error at second query');
                        }
                        else{
                            console.log(results.rows)
                            let data = {
                                userId : request.cookies.user_id,
                                placeData:result.rows,
                                userData: results.rows[0]
                            }
                            response.render('homepage',data)
                        }
                    })
                }
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

app.get('/findfood/signout',logout);

app.delete('/findfood/deletereview/:review_id', deleteReview)

app.put('/findfood/updatereviewplace/:review_id',updateReview)

app.get('/findfood/deletereview/:review_id', deleteReviewPage)

app.get('/findfood/editreview/:review_id',reviewEditPage)

app.delete('/findfood/deletefoodplace/:foodplace_id',deleteFoodPlace);

app.put('/findfood/updatefoodplace/:foodplace_id', upload.single('image_url'), userUpdateFoodPlacePost);

app.get('/findfood/deletefoodplace/:foodplace_id', deleteFoodPlacePage);

app.get('/findfood/updatefoodplace/:foodplace_id', editFoodplacePage);

app.get('/findfood/showallreviews/:id',userAllReviewsPost);

app.get('/findfood/showallfoodpost/:id',userAllFoodplacesPost);

app.get('/findfood/category/:categoryname', showCategory);

app.post('/findfood/review/:shop_id/:user_id', postReview);

app.get('/findfood/individual/:id',showIndividualShop);

app.get('/findfood/search/:location/:category', showMentionedCategory);

app.get('/findfood/search/:location', showAllFood);

app.post('/findfood/search', searchByLocation);

app.post('/findfood/foodpost/:id', upload.single('image_url'), foodPost);

app.get('/findfood/profile/:id',profilePage);

app.get('/findfood/addfoodplace/:id',addFoodPlacePage);

app.get('/findfood/homepage',homePage);

app.post('/findfood/signup', createAccountCheck);

app.post('/findfood/login',loginCheck);

app.get('/findfood/signup',createAccount);

app.get('/findfood', login);

app.get('/', home);


/**
 * ===================================
 * Listen to requests on port
 * ===================================
 */


const PORT = process.env.PORT || 3010;

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