import React, { useState } from 'react';

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save to Database
    try {
      await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }

    setSubmitted(true);
    e.target.reset(); // Clear the form
    setFormData({ name: '', email: '', mobile: '', message: '' }); // Clear state
    setTimeout(() => setSubmitted(false), 5000); // Hide after 5 seconds
  };

  return (
    <section id="contact" className="contact">
      <div className="section-title">
        <h2>Get in <span style={{ color: 'var(--primary)' }}>Touch</span></h2>
        <p>We'd love to hear from you.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>Reach out to us for farm visits, bulk orders, or any queries regarding our organic produce.</p>

          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <h4>Farm Location</h4>
              <p>Gauranga Organic Farm, Village Khurampur, Farrukhnagar, Gurgaon, Haryana</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fas fa-phone-alt"></i>
            <div>
              <h4>Phone Number</h4>
              <p>+91 6200057077</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <div>
              <h4>Email Address</h4>
              <p>rahulteck108@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          {submitted && (
            <div style={{ background: '#dcf8c6', color: '#075e54', padding: '15px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-check-circle" style={{ fontSize: '1.2rem' }}></i>
              <span><strong>Message sent!</strong> We'll get back to you soon.</span>
            </div>
          )}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" id="name" required value={formData.name} onChange={handleChange} />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className="input-group">
              <input type="email" id="email" required value={formData.email} onChange={handleChange} />
              <label htmlFor="email">Your Email</label>
            </div>
            <div className="input-group">
              <input type="tel" id="mobile" required value={formData.mobile} onChange={handleChange} />
              <label htmlFor="mobile">Your Mobile</label>
            </div>
            <div className="input-group">
              <textarea id="message" rows="4" required value={formData.message} onChange={handleChange}></textarea>
              <label htmlFor="message">Your Message</label>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
