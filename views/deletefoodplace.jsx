var React = require("react");

class DeleteFoodPlace extends React.Component {
  render() {
    let urlDeleteFoodPlacePost = '/findfood/deletefoodplace/'+this.props.foodPlaceData.foodplace_id+'/?_method=DELETE';

    let deleteFoodplacePic = {
        height:'200px',
        width:'300px'
    }

    return (
      <html>
        <head />
        <body>
            <h1>Foodplace post information</h1>
            <img style = {deleteFoodplacePic} src={this.props.foodPlaceData.image_url}/>
            <p>Shop name: {this.props.foodPlaceData.shopname}</p>
            <p>Shop address: {this.props.foodPlaceData.address}</p>
            <p>shop postalcode: {this.props.foodPlaceData.postalcode}</p>
            <p>Shop location: {this.props.foodPlaceData.location}</p>
            <p>Shop category: {this.props.foodPlaceData.category}</p>
            <br />
            <br />
            <br />
            <p>Are you sure you want to delete the shop entry?</p>
            <form method="POST" action={urlDeleteFoodPlacePost}>
                <button type='submit'className = 'btn btn-sm btn-outline-danger'>DELETE</button>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = DeleteFoodPlace;