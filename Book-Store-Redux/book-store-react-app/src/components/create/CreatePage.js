import React, {Component} from 'react'
import Input from '../common/Input'
import toastr from 'toastr'
import createProductValidator from '../../utils/createProductValidator'
import {createProductValidationFunc} from '../../utils/formValidator'
import {createProductAction} from '../../actions/productsActions'
import {redirectAction} from '../../actions/authActions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class CreatePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      genres: '',
      description: '',
      author: '',
      price: '',
      image: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.createProductError.hasError) {
      toastr.error(nextProps.createProductError.message)
    } else if (nextProps.createProductSuccess) {
      this.props.redirect()
      toastr.success('Book created successfully')
      this.props.history.push('/store')
    }
  }

  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit (e) {
    e.preventDefault()
    if (!createProductValidator(this.state.title, this.state.genres.split(", "),
      this.state.description, this.state.image, this.state.author, this.state.price)) {
      return
    }
    this.props.createProduct(this.state.title, this.state.genres.split(", "),
      this.state.description, this.state.image, this.state.author, this.state.price)
  }

  render () {
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
        <h1>Create New Book</h1>
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
              <input type='submit' value='Create' />
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    createProductSuccess: state.createProduct.success,
    createProductError: state.createProductError
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createProduct: (title, genres, description, image, author, price) => {
      dispatch(createProductAction({title, genres, description, image, author, price}))
    },
    redirect: () => dispatch(redirectAction())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePage))
