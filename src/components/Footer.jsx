import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react'
export default function Footer() {
  return <footer className="footer">
    <div className="container footer-main">
      <div className="footer-brand"><Link to="/" className="brand brand-light"><span className="brand-mark">L<span>.</span></span><span className="brand-name">LUBESON<small>CONSTRUCTION EQUIPMENT</small></span></Link><p>Equipment for the people building what comes next.</p></div>
      <div><h4>Explore</h4><Link to="/equipment">Our equipment</Link><Link to="/about">About LUBESON</Link><Link to="/industries">Industries</Link></div>
      <div><h4>Get in touch</h4><a href="mailto:enquiry@lubeson.com"><Mail size={15}/> enquiry@lubeson.com</a><a href="tel:+910000000000"><Phone size={15}/> Add company phone</a><span><MapPin size={15}/> Add company address</span></div>
      <div className="footer-cta"><span className="eyebrow">HAVE A PROJECT IN MIND?</span><h3>Let’s find the right machine for the job.</h3><Link to="/contact" className="button button-red">Talk to our team <ArrowUpRight size={17}/></Link></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} LUBESON. All rights reserved.</span><span>Built for the work ahead.</span></div>
  </footer>
}