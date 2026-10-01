/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const EmptyState = ({ icon = 'bag-shopping', title, description }) => (
  <div className="empty-state">
    <span className="empty-icon"><i className={`fa-solid fa-${icon}`} aria-hidden="true" /></span>
    <span className="eyebrow">A little room for something good</span>
    <h2>{title}</h2><p>{description}</p>
    <Link className="button button-primary" to="/">Explore the collection <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
  </div>
)

export default EmptyState
