import { useState } from 'react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
export default function QuoteForm({ initialProduct = '' }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', product: initialProduct, message: '' })
  const [status, setStatus] = useState('')
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  async function submit(e) {
    e.preventDefault()
    // Backend connection is added in the next setup stage. This creates a ready-to-send enquiry message for now.
    const message = `LUBESON Equipment Enquiry\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company || 'Not provided'}\nEquipment: ${form.product || 'Not specified'}\nMessage: ${form.message || 'Please contact me.'}`
    const subject = encodeURIComponent(`Equipment enquiry from ${form.name}`)
    const body = encodeURIComponent(message)
    setStatus('ready')
    window.location.href = `mailto:enquiry@lubeson.com?subject=${subject}&body=${body}`
  }
  return <form className="quote-form" onSubmit={submit}>
    <div className="form-grid">
      <label>Full name *<input name="name" value={form.name} onChange={update} required placeholder="Your name"/></label>
      <label>Work email *<input type="email" name="email" value={form.email} onChange={update} required placeholder="you@company.com"/></label>
      <label>Phone number *<input type="tel" name="phone" value={form.phone} onChange={update} required placeholder="+91"/></label>
      <label>Company name<input name="company" value={form.company} onChange={update} placeholder="Company (optional)"/></label>
      <label className="full-field">Equipment of interest<select name="product" value={form.product} onChange={update}><option value="">Select equipment</option><option>Backhoe Loaders</option><option>Excavators</option><option>Cranes & Lifting</option><option>Wheel Loaders</option><option>Road Equipment</option><option>Compaction Equipment</option><option>Other / Not sure</option></select></label>
      <label className="full-field">Tell us about your requirement<textarea name="message" value={form.message} onChange={update} rows="4" placeholder="Project, location, preferred model or questions..."/></label>
    </div>
    <button className="button button-red submit-button" type="submit">Send enquiry <ArrowUpRight size={17}/></button>
    {status === 'ready' && <p className="form-note"><CheckCircle2 size={16}/> Your email app should open with the enquiry details. Connect Supabase to store enquiries directly on the website.</p>}
    <p className="form-disclaimer">Your details will be used to respond to your enquiry. Database submission will be enabled after backend setup.</p>
  </form>
}