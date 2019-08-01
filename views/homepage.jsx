var React = require("react");

class Homepage extends React.Component {
  render() {
    let urlProfile = '/findfood/profile/'+this.props.userId;
    let urlLogout = '/findfood/signout'
    let urlSearchLocation ='/findfood/search'
    let urlAddNewPlace = '/findfood/addfoodplace/'+this.props.userId;
    let mapFoodPlace = this.props.placeData.map(shop=>{
        let urlIndividualShop = '/findfood/individual/'+shop.id;
        return(
            <div>
                <a href={urlIndividualShop}>
                    <p>Shop name: {shop.shopname}</p>
                </a>
                <p>Address: {shop.address}</p>
                <p>Postalcode: S({shop.postalcode})</p>
                <p>Location: {shop.location}</p>
                <p>Category: {shop.category}</p>
            </div>
        )
    })

    return (
      <html>
        <head />
        <body>
            <h1>Homepage</h1>
            <a href={urlLogout}>Sign out</a>
            <br />
            <br />
            <p>search by location</p>
            <form method='POST' action={urlSearchLocation}>
                <input type='text' name='search'/>
                <input type='submit'/>
            </form>
            <a href={urlAddNewPlace}>Add new place</a>
            <a href={urlProfile}>Profile</a>
            <h3>All food</h3>
            <p>{mapFoodPlace}</p>
        </body>
      </html>
    );
  }
}

module.exports = Homepage;