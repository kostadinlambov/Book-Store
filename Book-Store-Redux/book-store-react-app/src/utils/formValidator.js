const registerValidationFunc = (
  email,
  username,
  password,
  confirmPassword
) => {
  let validEmail = (() => {
    let mailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    let testMail = mailRegex.test(email)
    if (testMail && email !== '') {
      return true
    }
    return false
  })()

  let validUsername = (() => {
    if (username.length > 3 &&
      username !== '') {
      return true
    }
    return false
  })()

  let validPassword = (() => {
    if (
      password.length > 7 &&
      password !== ''
    ) {
      return true
    }
    return false
  })()

  let validConfirmPassword = (() => {
    if (
      confirmPassword.length > 7 &&
      confirmPassword !== '' &&
      confirmPassword === password
    ) {
      return true
    }
    return false
  })()

  return {
    validEmail,
    validUsername,
    validPassword,
    validConfirmPassword
  }
}

const loginValidationFunc = (email, password) => {
  let validEmail = (() => {
    let emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    let testMail = emailRegex.test(email)
    if (testMail && email !== '') {
      return true
    }
    return false
  })()

  let validPassword = (() => {
    if (
      password.length > 7 &&
      password !== ''
    ) {
      return true
    }
    return false
  })()

  return {
    validEmail,
    validPassword
  }
}

const createProductValidationFunc = (title, genres, description, image, author, price) => {
  let validTitle = (() => {
    if (
      title.length > 2 &&
      title !== ''
    ) {
      return true
    }
    return false
  })()

  let validGenres = (() => {
    if (
      genres.length > 2 &&
      genres.indexOf(', ') < 0 &&
      genres !== ''
    ) {
      return true
    }
    return false
  })()

  let validDescription = (() => {
    if (
      description.length > 10 &&
      description.length <= 200 &&
      description !== ''
    ) {
      return true
    }
    return false
  })()

  let validImage = (() => {
    if (
      (image.startsWith('https://') || image.startsWith('http://')) && image.length >= 14
    ) {
      return true
    }
    return false
  })()

  let validAuthor = (() => {
    if (
      author !== ''
    ) {
      return true
    }
    return false
  })()

  let validPrice = (() => {
    if (
      price > 0 &&
      price !== ''
    ) {
      return true
    }
    return false
  })()

  return {
    validTitle,
    validGenres,
    validDescription,
    validImage,
    validAuthor,
    validPrice
  }
}

export {
  registerValidationFunc,
  loginValidationFunc,
  createProductValidationFunc
}
