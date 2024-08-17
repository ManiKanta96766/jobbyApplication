import './index.css'
import Header from '../Header'
import {Component} from 'react'
import Profile from '../Profile'
import FiltersGroup from '../FiltersGroup'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobItem from '../JobItem'
import Loader from 'react-loader-spinner'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryRange: '',
    search: '',
    jobsList: [],
    isLoading: true,
    error: null,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({isLoading: true, error: null})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, salaryRange, search} = this.state
    const employmentTypeString = employmentType.join(',')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(
        `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${salaryRange}&search=${search}`,
        options,
      )
      if (response.ok) {
        const data = await response.json()
        const updateJobsList = data.jobs.map(item => ({
          companyLogoUrl: item.company_logo_url,
          employmentType: item.employment_type,
          id: item.id,
          jobDescription: item.job_description,
          location: item.location,
          packagePerAnnum: item.package_per_annum,
          rating: item.rating,
          title: item.title,
        }))
        this.setState({jobsList: updateJobsList, isLoading: false})
      } else {
        this.setState({error: 'Failed to fetch jobs', isLoading: false})
      }
    } catch (error) {
      this.setState({error: 'Something went wrong', isLoading: false})
    }
  }

  modifyEmploymentType = event => {
    const {employmentType} = this.state
    const {id, checked} = event.target
    const updatedEmploymentType = checked
      ? [...employmentType, id]
      : employmentType.filter(type => type !== id)

    this.setState({employmentType: updatedEmploymentType}, this.getJobsList)
  }

  changeSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getJobsList)
  }

  onChangeTitle = event => {
    this.setState({search: event.target.value})
  }

  onClickSearchBtn = () => {
    this.getJobsList()
  }

  render() {
    const {isLoading, jobsList, error} = this.state
    let renderingElement = null
    if (isLoading) {
      ;<div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    } else if (jobsList.length > 0) {
      renderingElement = (
        <ul>
          {jobsList.map(item => (
            <JobItem details={item} key={item.id} />
          ))}
        </ul>
      )
    } else if (error === 'Failed to fetch jobs') {
      renderingElement = (
        <>
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button onClick={this.getJobsList}>Retry</button>
        </>
      )
    } else {
      renderingElement = (
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
      )
    }

    return (
      <div className="job-details-container">
        <Header />
        <div className="jobs-page jobs-container">
          <div className="profile-view">
            <Profile />
            <hr />
            <FiltersGroup
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              modifyEmploymentType={this.modifyEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
            />
          </div>
          <div className="jobs-list">
            <div className="search-group">
              <input
                placeholder="Search"
                type="search"
                className="input"
                onChange={this.onChangeTitle}
              />
              <button
                type="button"
                aria-label="Search Jobs"
                onClick={this.onClickSearchBtn}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            {renderingElement}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
