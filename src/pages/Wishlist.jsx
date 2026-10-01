import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'

import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'


const Wishlist = () => {

  const userCart = useSelector(state=>state.cartReducer)

  const dispatch = useDispatch()

  const userWishlist = useSelector(state=>state.wishlistReducer)


  const handleCart =(product)=>{
    dispatch(removeItem(product.id))
    dispatch(addToCart(product))
    const existingProduct = userCart?.find(item=>item?.id==product.id)
    if(existingProduct){
      alert('Product quantity increemented !!!')
    }else{
      alert("product added to Cart")
    }
  }

  return (

    <><Header/><main className="page-width inner-page"><div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Wishlist</span></div>
    {userWishlist?.length>0 ? <><div className="page-heading"><div><span className="eyebrow">THE ONES YOU LOVE</span><h1>Your wishlist<span>.</span></h1><p>{userWishlist.length} {userWishlist.length===1?'favorite':'favorites'}, saved for a little later.</p></div><Link className="text-link" to="/">Find more favorites <i className="fa-solid fa-arrow-right" aria-hidden="true"/></Link></div><div className="product-grid wishlist-grid">{userWishlist?.map(product=><ProductCard key={product.id} product={product}><button onClick={()=>dispatch(removeItem(product?.id))} className="icon-button wishlist-remove" aria-label={'Remove '+product?.title+' from wishlist'}><i className="fa-solid fa-heart-circle-xmark" aria-hidden="true"/></button><button onClick={()=>handleCart(product)} className="button button-primary move-to-bag"><i className="fa-solid fa-bag-shopping" aria-hidden="true"/> Move to bag</button></ProductCard>)}</div></> : <EmptyState icon="heart" title="Your favorites belong here." description="See something you love? Save it from the product page and come back whenever you’re ready."/>}</main></>
  )
}

export default Wishlist
