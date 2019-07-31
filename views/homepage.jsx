var React = require("react");

class Homepage extends React.Component {
  render() {
    let urlProfile = '/findfood/profile/'+this.props.userId;
    let urlLogout = '/findfood/signout'
    let urlSearchLocation ='/findfood/search'
    let urlAddNewPlace = '/findfood/addfoodplace/'+this.props.userId;
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
        </body>
      </html>
    );
  }
}

module.exports = Homepage;