import './index.css'

const SimilarJobs = props => {
  const {details} = props
  const {company_logo_url, title, rating, job_description} = details
  return (
    <li>
      <div>
        <img src={company_logo_url} alt="simialr job company logo" />
        <div>
          <p>{title}</p>
          <p>{rating}</p>
        </div>
      </div>
      <h1>Description</h1>
      <p>{job_description}</p>
    </li>
  )
}
export default SimilarJobs
