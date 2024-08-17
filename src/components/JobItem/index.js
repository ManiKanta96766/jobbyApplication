import './index.css'
import {Link} from 'react-router-dom'

const JobItem = ({details}) => {
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    title,
    rating,
  } = details

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} aria-label={`Job: ${title} at ${companyLogoUrl}`}>
        <div className="job-information">
          {/* Company Logo and Job Title with Rating */}
          <img src={companyLogoUrl} alt={`${title} company logo`} className="company-logo" />
          <div className="title-rating">
            <h1 className="job-title">{title}</h1>
            <p className="job-rating">{rating}</p>
          </div>
        </div>

        {/* Location, Employment Type, and Package Details */}
        <div className="job-details">
          <p className="job-location">{location}</p>
          <p className="job-employment-type">{employmentType}</p>
          <p className="job-package">{packagePerAnnum}</p>
        </div>

        <hr className="separator" />

        {/* Job Description */}
        <h1 className="description-title">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
