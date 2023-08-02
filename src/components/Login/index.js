import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {
  LoginContainer,
  WebsiteImage,
  Logo,
  LoginFormContainer,
  InputFieldContainer,
  Label,
  InputField,
  ErrorMsg,
  LoginButton,
} from './styledComponents'

const LoginForm = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  const onSubmitSuccess = userId => {
    const {history} = props
    Cookies.set('user_id', userId, {expires: 30})
    history.replace('/')
    setEmail('')
    setPassword('')
    setErrorMsg('')
  }

  const onSubmitFailure = error => {
    setErrorMsg(error)
    setIsInvalid(prevState => !prevState)
  }

  const onSubmitLoginForm = async event => {
    event.preventDefault()
    const credentials = {email, password}
    const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/get-user-id?email=${email}&password=${password}`
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
      },
      body: JSON.stringify(credentials),
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()

      const {id} = data.get_user_id[0]
      console.log(data)
      if (response.ok === true) {
        onSubmitSuccess(id)
      }
    } catch (error) {
      onSubmitFailure('Wrong Email or Password')
    }
  }

  const onChangeEmail = event => {
    setEmail(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const renderPasswordField = () => (
    <>
      <Label htmlFor="password">Password*</Label>
      <InputField
        type="password"
        value={password}
        id="password"
        placeholder="Password"
        onChange={onChangePassword}
      />
    </>
  )

  const renderEmailField = () => (
    <>
      <Label htmlFor="email">Email*</Label>
      <InputField
        type="text"
        value={email}
        id="email"
        placeholder="Email"
        onChange={onChangeEmail}
      />
    </>
  )

  const checkJwtToken = () => {
    const jwtToken = Cookies.get('user_id')

    if (jwtToken !== undefined) {
      return true
    }
    return false
  }

  return checkJwtToken() ? (
    <Redirect to="/" />
  ) : (
    <LoginContainer>
      <WebsiteImage
        src="https://res.cloudinary.com/dpkxg8atl/image/upload/v1690612320/bank_twky23.png"
        alt="login website logo"
      />
      <LoginFormContainer onSubmit={onSubmitLoginForm}>
        <Logo
          src="https://res.cloudinary.com/dpkxg8atl/image/upload/v1690613473/Logo_1_bbind2.png"
          alt="login website logo"
        />
        <InputFieldContainer>{renderEmailField()}</InputFieldContainer>
        <InputFieldContainer>{renderPasswordField()}</InputFieldContainer>
        {isInvalid && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <LoginButton type="submit">Login</LoginButton>
      </LoginFormContainer>
    </LoginContainer>
  )
}

export default LoginForm
