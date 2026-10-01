import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'

const View = () => {

    const usercart = useSelector(state=>state.cartReducer)
    const dispatch = useDispatch()
    const userWishlist = useSelector(state=>state.wishlistReducer)

    const [products,setProducts] = useState({})

    const {id} = useParams()
    console.log(id);
    console.log(products);
    

  useEffect(()=>{
    if(sessionStorage.getItem("allProducts")){
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      console.log( allProducts.find(item=>item.id==id));
      setProducts( allProducts.find(item=>item.id==id))
    }
  },[])
  
  const handleWishlist = ()=>{
    const existingProduct = userWishlist?.find(item=>item?.id==id)
    if(existingProduct){
      alert('Product Already in wishlist !!!')
    }else{
      dispatch(addToWishlist(products))
      alert("product added to Wishlist")
    }
  }

  const handleCart = ()=>{
    dispatch(addToCart(products))
    const existingProduct = usercart?.find(item=>item?.id==id)
    if(existingProduct){
      alert('Product quantity increemented !!!')
    }else{
      alert("product added to Cart")
    }
  }

  return (

    <><Header/><main className="page-width inner-page"><div className="breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/#collection">Collection</Link><span>/</span><span>{products?.title || 'Product details'}</span></div>
      <section className="product-detail"><div className="detail-image">{products?.discountPercentage>0 && <span className="discount-badge">−{Math.round(products.discountPercentage)}%</span>}<img src={products?.thumbnail} alt={products?.title || 'Product'}/><span className="detail-image-note">THE E-KART COLLECTION</span></div><div className="detail-copy"><span className="eyebrow">{products?.category?.replaceAll('-', ' ') || 'THE EVERYDAY EDIT'}</span><h1>{products?.title}</h1>{products?.rating!=null && <div className="detail-rating"><i className="fa-solid fa-star" aria-hidden="true"/><strong>{products.rating.toFixed(1)}</strong><a href="#reviews">{products?.reviews?.length || 0} customer reviews</a></div>}<div className="detail-price">$ {products?.price?.toFixed(2)}{products?.discountPercentage>0 && <span className="saving-tag">{products.discountPercentage}% off</span>}</div><p className="detail-description">{products?.description}</p><dl className="product-specs"><div><dt>Brand</dt><dd>{products?.brand || '—'}</dd></div><div><dt>Category</dt><dd>{products?.category?.replaceAll('-', ' ')}</dd></div><div><dt>Product ID</dt><dd>{products?.id}</dd></div></dl><div className="detail-actions"><button onClick={handleCart} className="button button-primary"><i className="fa-solid fa-bag-shopping" aria-hidden="true"/> Add to cart <i className="fa-solid fa-arrow-right" aria-hidden="true"/></button><button onClick={handleWishlist} className="button button-secondary"><i className="fa-regular fa-heart" aria-hidden="true"/> Add to wishlist</button></div><p className="detail-note"><i className="fa-regular fa-heart" aria-hidden="true"/> A little something for your everyday.</p></div></section>
      <section id="reviews" className="reviews-section"><div className="section-heading"><div><span className="eyebrow">FROM THE COMMUNITY</span><h2>A closer look, from you<span>.</span></h2></div><span className="muted">Customer reviews</span></div>{products?.reviews?.length>0 ? <div className="reviews-grid">{products?.reviews?.map(items=><article key={items.date+items.reviewerName} className="review-card"><div className="review-stars" aria-label={items?.rating+' out of 5 stars'}>{Array.from({length:5},(_,index)=><i key={index} className={(index<items?.rating?'fa-solid':'fa-regular')+' fa-star'} aria-hidden="true"/>)}</div><p>“{items?.comment}”</p><div className="reviewer"><span className="review-avatar">{items?.reviewerName?.charAt(0)}</span><strong>{items?.reviewerName}</strong></div></article>)}</div> : <div className="search-empty"><i className="fa-regular fa-comment" aria-hidden="true"/><h3>No reviews yet</h3><p>This find is waiting for its first review.</p></div>}</section>
    </main></>
  )
}

export default View
