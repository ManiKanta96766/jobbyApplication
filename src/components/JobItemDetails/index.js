import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'

const SkillItem = ({details}) => {
  const {image_url, name} = details
  return (
    <li className='skill-item'>
      <img src={image_url} alt={name} className='skill-image' />
      <p className='skill-name'>{name}</p>
    </li>
  )
}

class JobItemDetails extends Component {
  state = {
    jobDetails: null,
    isLoading: true,
    error: null,
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          jobDetails: data.job_details,
          similarJobs: data.similar_jobs,
          isLoading: false,
        })
      } else {
        this.setState({
          error: 'Failed to fetch job details. Please try again later.',
          isLoading: false,
        })
      }
    } catch (error) {
      this.setState({
        error:
          'Something went wrong. Please check your connection and try again.',
        isLoading: false,
      })
    }
  }

  renderError() {
    const {error} = this.state
    return (
      <div className='error-container'>
        <p className='error-message'>{error}</p>
        <button className='retry-button' onClick={this.getJobDetails}>
          Retry
        </button>
      </div>
    )
  }

  renderLoading() {
    return (
      <div className='loader-container' data-testid='loader' aria-live='polite'>
        <Loader type='ThreeDots' color='#ffffff' height={50} width={50} />
      </div>
    )
  }

  renderJobDetails() {
    const {jobDetails, similarJobs} = this.state

    if (!jobDetails) {
      return <p>No job details available.</p>
    }

    const {
      company_logo_url,
      employment_type,
      job_description,
      location,
      package_per_annum,
      title,
      rating,
      company_website_url,
      skills,
      life_at_company,
    } = jobDetails

    return (
      <div className='job-item'>
        <div className='job-information'>
          <img
            src={company_logo_url}
            alt='job item details company logo'
            className='company-logo'
          />
          <div className='title-rating'>
            <h1 className='job-title'>{title}</h1>
            <p className='job-rating'>{rating}</p>
          </div>
        </div>

        <div className='job-information'>
          <div className='job-location'>
            <p>{location}</p>
          </div>
          <div className='job-employment-type'>
            <p>{employment_type}</p>
          </div>
          <p className='job-package'>{package_per_annum}</p>
        </div>

        <hr className='separator' />

        <h1 className='section-title'>Description</h1>
        <p className='job-description'>{job_description}</p>

        <h1 className='section-title'>Skills</h1>
        <ul className='skills-list'>
          {skills.map(item => (
            <SkillItem details={item} key={item.name} />
          ))}
        </ul>

        <h1 className='section-title'>Life at Company</h1>
        <p className='life-at-company'>{life_at_company.description}</p>

        <h1 className='section-title'>Company Website</h1>
        <a
          href={company_website_url}
          className='company-website-link'
          target='_blank'
          rel='noopener noreferrer'
        >
          Visit Company Website
        </a>

        {similarJobs && similarJobs.length > 0 && (
          <>
            <h1 className='section-title'>Similar Jobs</h1>
            <ul className='similar-jobs-list'>
              {similarJobs.map(item => (
                <SimilarJobs details={item} key={item.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }

  render() {
    const {isLoading, error} = this.state

    return (
      <div className='job-details-container'>
        <Header />
        {isLoading
          ? this.renderLoading()
          : error
          ? this.renderError()
          : this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
