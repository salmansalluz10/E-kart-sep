import EmptyState from '../components/EmptyState'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DecrementQantity, emptyCart, incrementQantity, removeCartItem } from '../redux/slices/cartSlice'


const Cart = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userCart = useSelector(state=>state.cartReducer)

  const [cartTotal,setCartTotal] = useState(0)

  useEffect(()=>{
    if(userCart?.length>0){
      setCartTotal(userCart?.map(item=>item.totalPrice).reduce((a1,a2)=>a1+a2))
    }
  },[userCart])

  const handleDecrement =(product)=>{
    if(product?.quantity>1){
      dispatch(DecrementQantity(product.id))
    }else{
      dispatch(removeCartItem(product.id))
    }
  }

  const handleCheckout = ()=>{
    dispatch(emptyCart())
    alert('Your Order Placed successfully !!')
    // redirect to home page =>
      navigate('/')
  }

  return (

    <><Header/><main className="page-width inner-page"><div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Shopping bag</span></div>
      {userCart?.length>0 ? <><div className="page-heading"><div><span className="eyebrow">YOUR GOOD FINDS</span><h1>Your shopping bag<span>.</span></h1><p>{userCart.length} {userCart.length===1?'item':'items'} with your name on it.</p></div><Link className="text-link" to="/">Continue exploring <i className="fa-solid fa-arrow-right" aria-hidden="true"/></Link></div>
      <div className="cart-layout"><section className="cart-items" aria-label="Items in your cart"><div className="cart-table-heading"><span>Product</span><span>Quantity</span><span>Total</span></div>{userCart?.map((product,index)=><article key={product.id} className="cart-row"><div className="cart-product"><img src={product?.thumbnail} alt={product?.title}/><div><span className="product-meta">Item {index+1} · {product?.category?.replaceAll('-', ' ')}</span><h2>{product?.title}</h2><p>${product?.price?.toFixed(2)} each</p><button onClick={()=>dispatch(removeCartItem(product?.id))} className="remove-link" aria-label={'Remove '+product?.title+' from cart'}><i className="fa-regular fa-trash-can" aria-hidden="true"/> Remove</button></div></div><div className="quantity-control"><button onClick={()=>handleDecrement(product)} aria-label={'Decrease quantity of '+product?.title}>−</button><input type="text" value={product?.quantity} readOnly aria-label={'Quantity of '+product?.title}/><button onClick={()=>dispatch(incrementQantity(product?.id))} aria-label={'Increase quantity of '+product?.title}>+</button></div><strong className="cart-row-total">$ {product?.totalPrice?.toFixed(2)}</strong></article>)}<div className="cart-bottom"><Link to="/" className="text-link"><i className="fa-solid fa-arrow-left" aria-hidden="true"/> Shop more</Link><button onClick={()=>dispatch(emptyCart())} className="remove-link">Empty cart</button></div></section>
      <aside className="order-summary"><span className="eyebrow">ONE STEP CLOSER</span><h2>Order summary</h2><div className="summary-line"><span>Items</span><span>{userCart.length}</span></div><div className="summary-line"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div><div className="summary-total"><span>Total amount</span><strong>${cartTotal.toFixed(2)}</strong></div><button onClick={handleCheckout} className="button button-primary checkout-button">Checkout <i className="fa-solid fa-arrow-right" aria-hidden="true"/></button><p className="summary-note">A few good finds, all in one bag.</p><div className="summary-decoration" aria-hidden="true">Made for your everyday. ✳</div></aside></div></> : <EmptyState title="Your bag is full of possibilities." description="It’s empty for now. Find something you love and make it yours."/>}
    </main></>
  )
}

export default Cart
