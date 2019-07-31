var React = require("react");

class AllFoodLocation extends React.Component {
  render() {
    let urlLogout = '/findfood/signout'
    let urlHome ='/findfood/homepage'
    let urlHalal = '/findfood/search/'+this.props.location+'/halal';
    let urlVegetarian = '/findfood/search/'+this.props.location+'/vegetarian';
    let urlAllFood = '/findfood/search/'+this.props.location;
    let mapFoodLocation = this.props.allFoodAtLocation.map(food=>{
        let urlIndividualShop = '/findfood/individual/'+food.id;
        return(
            <div>
                <a href={urlIndividualShop}>
                    <p>Shop name: {food.shopname}</p>
                </a>
                <p>Address: {food.address}</p>
                <p>Postalcode: S({food.postalcode})</p>
                <p>Category: {food.category}</p>
            </div>
        );
    })

    return (
      <html>
        <head />
        <body>
            <h1>Food at {this.props.location}</h1>
            <a href={urlHome}>Homepage</a>
            <br />
            <a href={urlLogout}>Sign out</a>
            <br />
            <br />
            <h3>All Food at {this.props.location}</h3>
            <a href={urlAllFood}>All food</a>
            <a href={urlHalal}>Halal</a>
            <a href={urlVegetarian}>Vegetarian</a>
            <p>{mapFoodLocation}</p>
        </body>
      </html>
    );
  }
}

module.exports = AllFoodLocation;