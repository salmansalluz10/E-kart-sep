import ProductCard from '../components/ProductCard'


import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'


const Home = () => {


  const dispatch = useDispatch()
  const {allProducts,loading,errorMsg} =  useSelector(state=>state.productReducer)
  const { hash } = useLocation()
  // Scroll only the new editorial section links; catalog and shopping state are unchanged.
  useEffect(() => {
    if (hash && !loading) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [hash, loading])
  console.log(allProducts,loading,errorMsg);
  
  //Pagination =>

    const [currentPage,setCurrentPage] = useState(1)
    const productsPerPage = 8
    const totalPages = Math.ceil(allProducts?.length/productsPerPage)
    const currentPageProductLastIndex = currentPage * productsPerPage
    const currentPageProductFirstIndex = currentPageProductLastIndex-productsPerPage
    const visibleAllProducts = allProducts?.slice(currentPageProductFirstIndex,currentPageProductLastIndex)

  const navigateToNextPage = ()=>{
    if(currentPage!=totalPages){
      setCurrentPage(currentPage+1)
    }
  }

  const navigateToPrePage = ()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
  }


  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  return (

    <>
      <Header insideHome={true}/>
      <main className="home-main page-width">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy"><span className="eyebrow"><span className="small-line"/> THE EVERYDAY EDIT</span><h1 id="hero-title">A little upgrade.<br/>A lot to <em>love.</em></h1><p>Discover feel-good finds for your home, your routine, and everything in between.</p><a href="#collection" className="button button-primary">Find your favorites <i className="fa-solid fa-arrow-right" aria-hidden="true" /></a><div className="hero-footnote"><span className="mini-star">✳</span> Small discoveries. Everyday possibilities.</div></div>
          <div className="hero-visual"><span className="hero-orbit"/><span className="hero-stamp">THE GOOD<br/><strong>STUFF</strong><span>↓</span></span><span className="hero-watermark" aria-hidden="true">everyday</span>
            {allProducts?.length > 0 ? <Link to={'/'+allProducts[0].id+'/view'} className="hero-product"><img src={allProducts[0].thumbnail} alt={allProducts[0].title}/><span className="hero-product-label"><span><small>MEET YOUR NEXT FAVORITE</small><strong>{allProducts[0].title}</strong></span><span className="round-arrow"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"/></span></span></Link> : <div className="hero-placeholder"><i className="fa-solid fa-bag-shopping" aria-hidden="true"/><span>Something good awaits.</span></div>}
            <span className="hero-edition">E-KART / THE COLLECTION</span>
          </div>
        </section>
        <div className="benefits-strip"><div><i className="fa-solid fa-compass" aria-hidden="true"/><span><strong>Discover something different</strong><small>Fresh finds for your everyday</small></span></div><div><i className="fa-regular fa-heart" aria-hidden="true"/><span><strong>Keep what catches your eye</strong><small>Your favorites, in one place</small></span></div><div><i className="fa-solid fa-bag-shopping" aria-hidden="true"/><span><strong>Make a little room for joy</strong><small>From your wishlist to your bag</small></span></div></div>
        <section id="collection" className="collection-section" aria-labelledby="collection-title">
          <div className="section-heading"><div><span className="eyebrow">YOUR NEXT GREAT FIND</span><h2 id="collection-title">Everyday, elevated<span>.</span></h2></div><p>Good things worth a closer look.</p></div>
          <div className="collection-toolbar"><span className="collection-tab">All products <span>{allProducts?.length || 0}</span></span><span className="results-count">{allProducts?.length > 0 ? 'Discover '+allProducts.length+' products' : 'The E-Kart collection'}</span></div>
          {loading ? <div className="loading-area" role="status" aria-live="polite"><div className="loading-label"><span className="spinner"/>Finding the good stuff…</div><div className="product-grid skeleton-grid" aria-hidden="true">{Array.from({length:8}, (_, index)=><div className="skeleton-card" key={index}><div/><span/><span/></div>)}</div></div> : allProducts?.length > 0 ? <div className="product-grid">{visibleAllProducts?.map(products=><ProductCard key={products.id} product={products}/>)}</div> : <div className="search-empty" role="status"><i className="fa-solid fa-magnifying-glass" aria-hidden="true"/><h3>{errorMsg ? 'The collection is taking a moment' : 'No finds this time'}</h3><p>{errorMsg ? 'We couldn’t load the products. Please refresh the page to try again.' : 'Try a different product name in the search above.'}</p></div>}
          <nav className="pagination" aria-label="Product pages"><button onClick={navigateToPrePage} className="pagination-arrow" aria-label="Previous page"><i className="fa-solid fa-arrow-left" aria-hidden="true"/></button><span>Page <strong>{currentPage}</strong> of {totalPages}</span><button onClick={navigateToNextPage} className="pagination-arrow" aria-label="Next page"><i className="fa-solid fa-arrow-right" aria-hidden="true"/></button></nav>
        </section>
        {allProducts?.length > 0 && <section id="categories" className="categories-section" aria-labelledby="categories-title"><div className="section-heading"><div><span className="eyebrow">FOLLOW YOUR CURIOSITY</span><h2 id="categories-title">A world of good finds<span>.</span></h2></div><span className="muted">Something for every part of your day.</span></div><div className="category-grid">{allProducts.filter((product,index,items)=>items.findIndex(item=>item.category===product.category)===index).slice(0,4).map(product=><Link key={product.category} to={'/'+product.id+'/view'} className="category-card"><div><span className="eyebrow">EXPLORE A FIND IN</span><h3>{product.category?.replaceAll('-', ' ')}</h3><span className="category-link">Take a look <i className="fa-solid fa-arrow-right" aria-hidden="true"/></span></div><img src={product.thumbnail} alt="" loading="lazy"/></Link>)}</div></section>}
        <section className="discovery-banner"><span className="banner-star" aria-hidden="true">✳</span><div><span className="eyebrow">SPOTTED SOMETHING YOU LOVE?</span><h2>Save it now. Love it later.</h2><p>Give your favorites a place to call home.</p></div><Link to="/wishlist" className="button button-light">Visit your wishlist <i className="fa-regular fa-heart" aria-hidden="true"/></Link></section>
      </main>
    </>
  )
}

export default Home
