import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class Profile extends Component {
  state = {
    profileData: {},
    isLoading: true,
    retryBtn: false,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch('https://apis.ccbp.in/profile', options)
      const dataResponse = await response.json()
      if (response.ok) {
        const {profile_details} = dataResponse
        const formatData = {
          name: profile_details.name,
          profileImageUrl: profile_details.profile_image_url,
          shortBio: profile_details.short_bio,
        }
        this.setState({
          profileData: formatData,
          isLoading: false,
        })
      } else {
        this.setState({retryBtn: true, isLoading: false})
      }
    } catch (error) {
      this.setState({retryBtn: true, isLoading: false})
    }
  }

  onRetry = () => {
    this.setState({isLoading: true, retryBtn: false}, this.getProfileDetails)
  }

  render() {
    const {profileData, isLoading, retryBtn} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    if (isLoading) {
      return <p>Loading...</p>
    }

    if (retryBtn) {
      return (
        <div className="retry-container">
          <p>Failed to load profile details. Please try again.</p>
          <button type="button" onClick={this.onRetry} className="retry-button">
            Retry
          </button>
        </div>
      )
    }

    return (
      <div className="profile-container">
       
          <img src={profileImageUrl} alt="profile" className="profile-image" />
       
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }
}

export default Profile
