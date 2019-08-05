var React = require("react");

class EditFoodPlaceForm extends React.Component {
  render() {
    let urlEditFoodPlacePost = '/findfood/updatefoodplace/'+this.props.foodPlaceData.foodplace_id+'/?_method=PUT';
    return (
      <html>
        <head />
        <body>
            <h1>Update foodplace post information</h1>
            <form method = 'POST'encType="multipart/form-data" action={urlEditFoodPlacePost}>
                <div className = 'form-group'>
                    <p>Enter shop name:</p>
                    <input className = 'form-control form-control-sm' type="text" name="shopname" defaultValue={this.props.foodPlaceData.shopname}/>
                </div>
                <div className='form-group'>
                    <p>Enter shop address:</p>
                    <input className = 'form-control form-control-sm' type="text" name="address" defaultValue={this.props.foodPlaceData.address}/>
                </div>
                <div className='form-group'>
                    <p>Enter shop postalcode:</p>
                    <input className = 'form-control form-control-sm' type="text" name="postalcode" defaultValue={this.props.foodPlaceData.postalcode}/>
                </div>
                <div className='form-group'>
                    <p>Enter shop location: (e.g tanjung pagar, yishun, ....)</p>
                    <input className = 'form-control form-control-sm' type="text" name="location" defaultValue={this.props.foodPlaceData.location}/>
                </div>
                <div className='form-group'>
                    <p>Enter shop photo:</p>
                    <input className='btn btn-sm'type="file" name='image_url'/>
                </div>
                <div className='form-group'>
                    <p>Enter category of food: (non-halal/halal/vegeterian)</p>
                    <input className = 'form-control form-control-sm' type="text" name="category" defaultValue={this.props.foodPlaceData.category}/>
                </div>
                <br />
                <div className='text-right'>
                    <button type="submit" className = 'btn btn-outline-success'>Post</button>
                </div>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = EditFoodPlaceForm;