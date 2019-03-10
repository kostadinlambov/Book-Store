import React, { Component } from 'react'
import Auth from '../../../utils/auth'
import {deleteProductAction} from '../../../actions/productsActions'
import { addToCartAction } from '../../../actions/cartActions'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class BookCard extends Component {
  constructor (props) {
    super(props)

    this.onOrderButtonClick = this.onOrderButtonClick.bind(this)
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this)
  }

  onOrderButtonClick (e) {
    if (Auth.isUserAuthenticated()) {
      this.props.addToCart(this.props.id)
      this.props.history.push('/cart')
    } else {
      this.props.history.push('/login')
    }
  }

  onDeleteButtonClick (e) {
    this.props.deleteProduct(this.props.id)
  }

  render () {
    const { id, title, image, description, author } = this.props
    let footer
    if (Auth.isUserAdmin()) {
      footer = (
        <div className='card-footer'>
          <small className='text-muted'>{author}</small>
          <button onClick={this.onDeleteButtonClick} className='btn btn-danger float-right btn-sm'><i className='fa fa-trash' /></button>
          <Link to={`/admin/edit/${id}`} className='btn btn-warning float-right btn-sm'><i className='fa fa-edit' /></Link>
        </div>
      )
    } else {
      footer = (
        <div className='card-footer'>
          <small className='text-muted'>{author}</small>
          <Link to={`/details/${id}`} type='button' className='btn btn-primary float-right btn-sm'>Details</Link>
          <button type='button' className='btn btn-warning float-right btn-sm' onClick={this.onOrderButtonClick}>Order</button>
        </div>
      )
    }

    return (
      <div className='card col-4'>
        <img className='card-img-top card-image' src={image} alt={title} />
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{description}</p>
        </div>
        {footer}
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addToCart: (id) => dispatch(addToCartAction(id)),
    deleteProduct: (id) => dispatch(deleteProductAction(id))
  }
}

export default withRouter(connect(() => { return {} }, mapDispatchToProps)(BookCard))
