import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
export default function ProductCard({ product }) {
  return <article className="product-card">
    <Link to={`/equipment/${product.id}`} className="product-image"><img src={product.image} alt={product.name} loading="lazy"/><span className="image-arrow"><ArrowUpRight size={20}/></span></Link>
    <div className="product-info"><div className="product-meta"><span>{product.type}</span><span className="product-dot"/></div><h3><Link to={`/equipment/${product.id}`}>{product.name}</Link></h3><p>{product.description}</p><Link className="text-link" to={`/equipment/${product.id}`}>Explore equipment <ArrowUpRight size={16}/></Link></div>
  </article>
}