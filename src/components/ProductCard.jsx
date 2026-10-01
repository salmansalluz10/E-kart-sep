/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const ProductCard = ({ product, children }) => (
  <article className="product-card">
    <Link className="product-image" to={`/${product?.id}/view`} aria-label={`View ${product?.title}`}>
      {product?.discountPercentage > 0 && <span className="discount-badge">−{Math.round(product.discountPercentage)}%</span>}
      <img src={product?.thumbnail} alt={product?.title || 'Product'} loading="lazy" />
      <span className="image-arrow" aria-hidden="true"><i className="fa-solid fa-arrow-up-right-from-square" /></span>
    </Link>
    <div className="product-info">
      <div className="product-meta"><span>{product?.category?.replaceAll('-', ' ')}</span>{product?.rating != null && <span className="rating"><i className="fa-solid fa-star" aria-hidden="true" /> {product.rating.toFixed(1)}</span>}</div>
      <h3><Link to={`/${product?.id}/view`}>{product?.title}</Link></h3>
      <div className="product-bottom"><strong>${product?.price?.toFixed(2)}</strong><Link to={`/${product?.id}/view`} className="text-link">View details <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link></div>
      {children && <div className="product-actions">{children}</div>}
    </div>
  </article>
)

export default ProductCard
