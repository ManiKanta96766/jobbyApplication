import './index.css'

const EmploymentTypeItem = props => {
  const {details, modifyEmploymentType} = props
  const {label, employmentTypeId} = details
  return (
    <div className="filter-item">
      <input
        type="checkbox"
        id={employmentTypeId}
        onChange={modifyEmploymentType}
        aria-label={label}
        className="filter-checkbox"
      />
      <label htmlFor={employmentTypeId} className="filter-label">{label}</label>
    </div>
  )
}

const SalaryItem = props => {
  const {details, salaryRange, changeSalaryRange} = props
  const {salaryRangeId, label} = details
  return (
    <div className="filter-item">
      <input
        type="radio"
        name="salaryItem"
        value={salaryRangeId}
        id={salaryRangeId}
        onChange={changeSalaryRange}
        checked={salaryRange === salaryRangeId}
        aria-label={label}
        className="filter-radio"
      />
      <label htmlFor={salaryRangeId} className="filter-label">{label}</label>
    </div>
  )
}

const FiltersGroup = props => {
  const {
    employmentTypesList,
    modifyEmploymentType,
    salaryRangesList,
    changeSalaryRange,
    salaryRange,
  } = props
  return (
    <div className="filters-group">
      <h1 className="filters-group-title">Type of Employment</h1>
      {employmentTypesList.map(item => (
        <EmploymentTypeItem
          details={item}
          key={item.employmentTypeId}
          modifyEmploymentType={modifyEmploymentType}
        />
      ))}
      <hr className="filters-separator" />
      <h1 className="filters-group-title">Salary Range</h1>
      {salaryRangesList.map(item => (
        <SalaryItem
          details={item}
          salaryRange={salaryRange}
          changeSalaryRange={changeSalaryRange}
          key={item.salaryRangeId}
        />
      ))}
    </div>
  )
}

export default FiltersGroup
