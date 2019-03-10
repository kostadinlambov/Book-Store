import React, { Component } from 'react'

class CartRow extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onRefreshButtonClick = this.onRefreshButtonClick.bind(this)
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this)
  }

  onChange (e) {
    this.props.syncCart(this.props.product._id, parseInt(e.target.value, 10))
  }

  onRefreshButtonClick () {
    this.props.syncCart(this.props.product._id, 1)
  }

  onDeleteButtonClick () {
    this.props.removeFromCart(this.props.product._id)
  }

  render () {
    const {image, title, genres, price} = this.props.product
    const subtotal = price
    return (
      <tr>
        <td data-th='Product'>
          <div className='row'>
            <div className='col-sm-4 hidden-xs'><img src={image} alt='...' className='cart-image' /></div>
            <div className='col-sm-8'>
              <h4 className='nomargin'>{title}</h4>
              <p>{genres.join(', ')}</p>
            </div>
          </div>
        </td>
        <td data-th='Price'>${price.toFixed(2)}</td>
        <td className='actions' data-th=''>
          <button className='btn btn-info btn-sm' onClick={this.onRefreshButtonClick}><i className='fa fa-refresh' /></button>
          <button className='btn btn-danger btn-sm' onClick={this.onDeleteButtonClick}><i className='fa fa-trash-o' /></button>
        </td>
      </tr>
    )
  }
}

export default CartRow
