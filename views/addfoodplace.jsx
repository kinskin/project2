var React = require("react");

class AddFoodPlace extends React.Component {
  render() {
    var urlHome = '/findfood/homepage'
    var urlFoodPost = '/findfood/foodpost/'+this.props.userId;
    let urlLogout = '/findfood/signout'
    return (
      <html>
        <head />
        <body>
            <h1>Add new foodplace</h1>
            <a href={urlHome}>Homepage</a>
            <br />
            <a href={urlLogout}>Sign out</a>
            <br />
            <form method="POST" action={urlFoodPost}>
                <h2>Enter shop name</h2>
                <input type="text" name="shopname"/>
                <h2>Enter shop address</h2>
                <input type="text" name="address"/>
                <h2>Enter shop postalcode</h2>
                <input type="text" name="postalcode"/>
                <h2>Enter shop location</h2>
                <p>(e.g tanjung pagar, yishun, ....)</p>
                <input type="text" name="location"/>
                <h2>Enter shop photo</h2>
                <input type="text" name="image_url"/>
                <h2>Enter category of food</h2>
                <p>(e.g non-halal, halal, vegeterian)</p>
                <input type="text" name="category"/>
                <br />
                <input type="submit"/>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = AddFoodPlace;