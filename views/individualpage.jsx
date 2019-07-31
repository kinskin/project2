var React = require("react");

class Individual extends React.Component {
  render() {
    let urlLogout = '/findfood/signout'
    let urlHome ='/findfood/homepage'
    let urlHalal = '/findfood/search/'+this.props.shop.location+'/halal';
    let urlVegetarian = '/findfood/search/'+this.props.shop.location+'/vegetarian';
    let urlAllFood = '/findfood/search/'+this.props.shop.location;
    let urlPostReview = '/findfood/review/'+this.props.shop.id+'/'+this.props.shop.user_id;
    return (
      <html>
        <head />
        <body>
            <h1>Food at {this.props.shop.location}</h1>
            <a href={urlHome}>Homepage</a>
            <br />
            <a href={urlLogout}>Sign out</a>
            <br />
            <br />
            <a href={urlAllFood}>All food</a>
            <a href={urlHalal}>Halal</a>
            <a href={urlVegetarian}>Vegetarian</a>
            <br />
            <br />
            <h3>{this.props.shop.shopname}</h3>
            <p>Address: {this.props.shop.address} S({this.props.shop.postalcode})</p>
            <p>Category: {this.props.shop.category}</p>
            <h3>Review</h3>
            <h5>Post review</h5>
            <form method="POST" action={urlPostReview}>
                <p>rating</p>
                <input type='number' name='rating' min="1" max="5"/>
                <p>comment</p>
                <input type='text' name='comment'/>
                <br />
                <input type='submit'/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Individual;