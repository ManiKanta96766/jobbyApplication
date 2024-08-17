import Header from '../Header'
import './index.css'

const Home = props => {
  const navigateToJobsSection = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-section">
        <h1 className="home-title">
          Find the Job That
          <br /> Fits Your Life
        </h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary
          <br />
          information, and company reviews. Find the job that fits your
          <br /> abilities and potential.
        </p>
        <button
          onClick={navigateToJobsSection}
          className="find-jobs-btn"
          aria-label="Find Jobs"
        >
          Find Jobs
        </button>
      </div>
    </>
  )
}

export default Home
