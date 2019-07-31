var React = require("react");

class ProfilePage extends React.Component {
  render() {
    var urlHome = '/findfood/homepage'
    var urlFoodPost = '/findfood/foodpost/'+this.props.userId;
    let urlLogout = '/findfood/signout'
    return (
      <html>
        <head />
        <body>
            <h1>Profile page</h1>
            <a href={urlHome}>Homepage</a>
            <br />
            <a href={urlLogout}>Sign out</a>
            <br />
            <p>profile description to be input later</p>
        </body>
      </html>
    );
  }
}

module.exports = ProfilePage;