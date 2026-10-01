import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-top page-width">
      <div className="footer-brand"><Link className="brand" to="/">e-kart<span className="brand-dot">.</span></Link><h2>Good things.<br />For your everyday.</h2><p>A fresh perspective on the things you love. Explore, save your favorites, and make them yours.</p></div>
      <div className="footer-links"><h3>Make yourself at home</h3><Link to="/">Discover</Link><Link to="/#collection">Shop the collection</Link><Link to="/wishlist">Your wishlist</Link><Link to="/cart">Your shopping bag</Link></div>
      <div className="footer-contact"><h3>Contact us</h3><label htmlFor="contact-email">Your email address</label><div className="footer-input"><i className="fa-regular fa-envelope" aria-hidden="true" /><input id="contact-email" type="text" placeholder="Enter your email here" /></div><p className="footer-fineprint">A thoughtful shopping experience, made with love.</p><div className="social-icons" aria-label="Social platforms"><i className="fa-brands fa-twitter" title="Twitter" /><i className="fa-brands fa-instagram" title="Instagram" /><i className="fa-brands fa-facebook" title="Facebook" /><i className="fa-brands fa-linkedin" title="LinkedIn" /><i className="fa-brands fa-github" title="GitHub" /><i className="fa-solid fa-phone" title="Phone" /></div></div>
    </div>
    <div className="footer-bottom page-width"><span>© E-Kart · June 2024 Batch</span><span>Designed with love by the Luminar team & contributors.<br/>Code licensed Luminar · Docs CC BY 3.0 · v5.3.2</span><span>Built with React & Redux</span></div>
  </footer>
)

export default Footer
