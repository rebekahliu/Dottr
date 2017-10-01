import React from 'react';

class ItemDetail extends React.Component{
  constructor(){
    super();
  }

  render(){
    console.log(this.props);
    return(
      <ul>
        <li>Name:{this.props.item[0].name}</li>
        <li>Price:{this.props.item[0].price}</li>
        <li>Happiness:{this.props.item[0].happiness}</li>
      </ul>
    );
  }
}

export default ItemDetail;
