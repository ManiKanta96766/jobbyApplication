import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">
            <p>Jobs</p>
          </Link>
        </li>
      </ul>
      <button
        onClick={onClickLogout}
        className="logout-btn"
        aria-label="Logout"
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
