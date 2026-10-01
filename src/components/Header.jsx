/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { searchProduct } from '../redux/slices/productSlice'

const Header = ({insideHome}) => {
  const userCart = useSelector(state=>state.cartReducer)
  const userWishlist = useSelector(state=>state.wishlistReducer)
  const dispatch = useDispatch()

  return (
    <>
      <div className="announcement"><span>Everyday essentials. Extraordinary finds.</span><span className="announcement-note">A little discovery, every day <i className="fa-solid fa-star" aria-hidden="true" /></span></div>
      <header className="site-header">
        <div className="header-main page-width">
          <Link className="brand" to="/" aria-label="E-Kart home"><span className="brand-symbol"><i className="fa-solid fa-bag-shopping" aria-hidden="true" /></span>e-kart<span className="brand-dot">.</span></Link>
          {insideHome ? <label className="search-field"><i className="fa-solid fa-magnifying-glass" aria-hidden="true" /><input onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} type="search" placeholder="Find your next favorite…" aria-label="Search products" /><span className="search-hint">Discover more</span></label> : <Link className="header-browse" to="/">Discover your everyday favorites <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>}
          <nav className="header-actions" aria-label="Shopping navigation">
            <NavLink to="/wishlist" className="header-action"><i className="fa-regular fa-heart" aria-hidden="true" /><span className="action-label">Wishlist</span><span className="count-badge" aria-label={`${userWishlist?.length} wishlist items`}>{userWishlist?.length}</span></NavLink>
            <NavLink to="/cart" className="header-action"><i className="fa-solid fa-bag-shopping" aria-hidden="true" /><span className="action-label">Bag</span><span className="count-badge" aria-label={`${userCart?.length} cart items`}>{userCart?.length}</span></NavLink>
          </nav>
        </div>
        <div className="nav-row page-width"><nav aria-label="Main navigation"><NavLink to="/" end>Discover</NavLink><Link to="/#collection">Shop all</Link><Link to="/#categories">Explore categories</Link></nav><span className="nav-note"><span /> Good finds. Great everyday.</span></div>
      </header>
    </>
  )
}

export default Header
