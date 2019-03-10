import React, {Component} from 'react'
import Input from '../common/Input'
import toastr from 'toastr'
import createProductValidator from '../../utils/createProductValidator'
import NotFoundPage from '../common/NotFound/NotFoundPage'
import {createProductValidationFunc} from '../../utils/formValidator'
import {editProductAction, fetchProductsAction} from '../../actions/productsActions'
import {redirectAction} from '../../actions/authActions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class EditPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      genre: '',
      description: '',
      author: '',
      price: '',
      image: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    const productId = this.props.match.params.id
    let product = this.props.products.find(p => p._id === productId)
    if (product) {
      this.setState({
        title: product.title,
        genres: product.genres.join(','),
        description: product.description,
        author: product.author,
        price: product.price.toFixed(2),
        image: product.image
      })
    } else {
      this.props.fetchProducts()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.editProductError.hasError) {
      toastr.error(nextProps.editProductError.message)
    } else if (nextProps.editProductSuccess) {
      this.props.redirect()
      toastr.success('Product edited successfully')
      this.props.history.push('/store')
    } else {
      const productId = this.props.match.params.id
      let product = this.props.products.find(p => p._id === productId)
      if (product) {
        this.setState({
          title: product.title,
          genres: product.genres.join(','),
          description: product.description,
          author: product.author,
          price: product.price.toFixed(2),
          image: product.image
        })
      }
    }
  }

  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit (e) {
    e.preventDefault()
    if (!createProductValidator(this.state.title, this.state.genres,
      this.state.description, this.state.image, this.state.author, this.state.price)) {
      return
    }
    this.props.editProduct(this.props.match.params.id, this.state.title, this.state.genres,
      this.state.description, this.state.image, this.state.author, this.state.price)
  }

  render () {
    let productId = this.props.match.params.id
    let product = this.props.products.find(o => o._id === productId)
    if (!product) {
      return (
        <NotFoundPage errMessage='PRODUCT NOT FOUND' />
      )
    }

    let validObj = createProductValidationFunc(
      this.state.title,
      this.state.genres,
      this.state.description,
      this.state.image,
      this.state.author,
      this.state.price
    )

    return (
      <div className='form-wrapper'>
        <h1>Edit Book</h1>
        <form onSubmit={this.onSubmit}>
              <Input
                type='text'
                name='title'
                label='Title'
                placeholder='Enter book title'
                value={this.state.title}
                onChange={this.onChange}
                valid={validObj.validTitle} />
              <Input
                type='text'
                name='genres'
                label='Genres'
                placeholder='Enter genres for the book. Put a comma between them'
                value={this.state.genres}
                onChange={this.onChange}
                valid={validObj.validGenres} />
              <Input
                type='text'
                name='description'
                label='Description'
                placeholder='Enter book description'
                value={this.state.description}
                onChange={this.onChange}
                valid={validObj.validDescription} />
              <Input
                type='text'
                name='image'
                label='Image URL'
                placeholder='Enter book image URL'
                value={this.state.image}
                onChange={this.onChange}
                valid={validObj.validImage} />
              <Input
                type='text'
                name='author'
                label='Author'
                placeholder='Enter book author'
                value={this.state.author}
                onChange={this.onChange}
                valid={validObj.validAuthor} />
              <Input
                type='number'
                name='price'
                label='Price'
                placeholder='Enter book price'
                value={this.state.price}
                onChange={this.onChange}
                valid={validObj.validPrice} />
              <input type='submit' value='Edit'/>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    editProductSuccess: state.editProduct.success,
    editProductError: state.editProductError,
    products: state.products
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editProduct: (id, title, genres, description, image, author, price) => {
      dispatch(editProductAction(id, {id, title, genres, description, image, author, price}))
    },
    redirect: () => dispatch(redirectAction()),
    fetchProducts: () => dispatch(fetchProductsAction())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPage))
