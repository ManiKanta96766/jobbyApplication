import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error_msg: '',
    error: false,
  }
  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }
  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }
  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    history.replace('/')
  }
  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const formdata = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(formdata),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({
        error: true,
        error_msg: data.error_msg,
      })
    }
  }
  render() {
    const {username, password, error_msg, error} = this.state
    return (
      <div className="login-page">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <br/>
          <form className="login-form" onSubmit={this.onClickLogin}>
            <div className="input-group">
              <label htmlFor="username">USERNAME</label>
              <input
                required=""
                placeholder="Username"
                id="username"
                type="text"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                required=""
                placeholder="Password"
                name="password"
                id="password"
                type="password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            {error && <p>{error_msg}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
