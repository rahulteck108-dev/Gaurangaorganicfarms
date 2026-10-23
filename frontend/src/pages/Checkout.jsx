import React, { useState } from 'react';
import { API_BASE_URL } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', state: '', zip: '', phone: '', paymentMethod: 'credit',
    cardNumber: '', cardExpiry: '', cardCvv: '', upiId: '', cardHolderName: ''
  });
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [verifyingUpi, setVerifyingUpi] = useState(false);
  const [upiName, setUpiName] = useState(null);
  const [upiError, setUpiError] = useState(null);
  const [isCardVerified, setIsCardVerified] = useState(false);
  const [verifyingCard, setVerifyingCard] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'upiId') {
      setIsUpiVerified(false);
      setUpiName(null);
      setUpiError(null);
    }
    if (['cardNumber', 'cardExpiry', 'cardCvv', 'cardHolderName'].includes(e.target.name)) {
      setIsCardVerified(false);
    }
  };

  const handleVerifyUpi = () => {
    if (!formData.upiId) return;
    setVerifyingUpi(true);
    setUpiError(null);
    setUpiName(null);

    setTimeout(() => {
      setVerifyingUpi(false);
      // Lenient Regex: allows 10-digit mobile numbers or valid UPI IDs (with @)
      const upiRegex = /^([0-9]{10}|[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64})$/;
      if (upiRegex.test(formData.upiId.trim())) {
        setIsUpiVerified(true);
        // Mocking a banking name
        let namePart = formData.upiId.split('@')[0].replace(/[.\-_0-9]/g, ' ').trim();
        if (!namePart || namePart.length < 2) namePart = "Verified Customer";
        const capitalizedName = namePart.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        setUpiName(capitalizedName);
      } else {
        setIsUpiVerified(false);
        setUpiError("Please enter a valid 10-digit mobile number or UPI ID (e.g., 9876543210 or name@ybl)");
      }
    }, 1500);
  };

  const handleVerifyCard = () => {
    if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv || !formData.cardHolderName) return;
    setVerifyingCard(true);
    setTimeout(() => {
      setVerifyingCard(false);
      setIsCardVerified(true);
    }, 1500);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (formData.paymentMethod === 'upi' && !isUpiVerified) {
      alert("Please verify your UPI ID before placing the order.");
      return;
    }
    if (formData.paymentMethod === 'credit' && !isCardVerified) {
      alert("Please verify your Card Details before placing the order.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('gauranga_user') || '{}');
    const shippingDetails = Object.fromEntries(
      ['name', 'email', 'address', 'city', 'state', 'zip', 'phone'].map(key => [key, formData[key]])
    );
    const orderPayload = {
      userId: storedUser?.user?.id ?? null,
      items: cartItems.map(({ id, title, quantity, price }) => ({ id, title, quantity, price })),
      totalAmount: getCartTotal(),
      formData: shippingDetails
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        const emailMessage = data.emailSent
          ? `A confirmation email was sent to ${formData.email}.`
          : 'Order is saved, but the confirmation email was not sent. Please check the sender setup with the site administrator.';
        alert(`Order placed successfully!\nThank you for shopping with Gauranga Organic Farm.\nShipping to: ${formData.address}\n${emailMessage}`);
        clearCart();
        navigate('/');
      } else {
        alert(data.error || "There was an error placing your order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to connect to the server.");
    }
  };

  // Step Progress Bar Component
  const Stepper = () => (
    <div className="checkout-stepper" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '15px', left: '0', right: '0', height: '2px', background: 'var(--border)', zIndex: 0 }}></div>
      
      {['Cart Review', 'Shipping Details', 'Payment'].map((label, index) => {
        const stepNum = index + 1;
        const isActive = step >= stepNum;
        return (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isActive ? 'var(--primary)' : 'var(--white)',
              color: isActive ? 'var(--white)' : 'var(--text-light)',
              border: isActive ? '2px solid var(--primary)' : '2px solid var(--border)',
              fontWeight: 'bold', marginBottom: '0.5rem', transition: 'var(--transition)'
            }}>
              {step > stepNum ? <i className="fas fa-check"></i> : stepNum}
            </div>
            <span style={{ fontSize: '0.85rem', color: isActive ? 'var(--primary-dark)' : 'var(--text-light)', fontWeight: isActive ? '600' : '400' }}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="checkout-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-light)' }}>
      <Navbar />
      <div className="checkout-content" style={{ flex: 1, padding: '4rem 2rem 2rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem', textAlign: 'center' }}>Checkout</h1>
        
        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--white)', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
            <i className="fas fa-shopping-basket" style={{ fontSize: '4rem', color: 'var(--border)', marginBottom: '1rem' }}></i>
            <h2>Your cart is empty</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Looks like you haven't added any organic produce yet.</p>
            <Link to="/" className="btn btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="checkout-panel" style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
            <Stepper />

            {/* STEP 1: CART REVIEW */}
            {step === 1 && (
              <div>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-dark)', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>Step 1: Review Your Cart</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="checkout-cart-item" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px', marginBottom: '1rem' }}>
                    <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>{item.title}</h4>
                      <p style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>₹{item.price.toFixed(2)} <span style={{ fontWeight: 'normal', fontSize: '0.8rem' }}>{item.unit}</span></p>
                    </div>
                    <div className="checkout-quantity" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-light)', cursor: 'pointer' }}>-</button>
                      <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-light)', cursor: 'pointer' }}>+</button>
                    </div>
                    <div style={{ fontWeight: 'bold', width: '80px', textAlign: 'right' }}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '0.5rem' }}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                ))}
                
                <div className="checkout-cart-total" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-light)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>
                    Total: ₹{getCartTotal().toFixed(2)}
                  </div>
                  <button className="btn btn-primary" onClick={nextStep}>Next: Shipping <i className="fas fa-arrow-right"></i></button>
                </div>
              </div>
            )}

            {/* STEP 2: SHIPPING ADDRESS */}
            {step === 2 && (
              <div>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-dark)', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>Step 2: Shipping Details</h3>
                <form className="checkout-shipping-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px' }} required />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Address *</label>
                    <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px' }} required></textarea>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px' }} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>State *</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px' }} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>PIN Code *</label>
                    <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px' }} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px' }} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px' }} required />
                  </div>
                </form>
                
                <div className="checkout-step-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                  <button className="btn btn-outline" onClick={prevStep}><i className="fas fa-arrow-left"></i> Back to Cart</button>
                  <button className="btn btn-primary" onClick={nextStep}>Next: Payment <i className="fas fa-arrow-right"></i></button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT DETAILS */}
            {step === 3 && (
              <form className="checkout-payment-form" onSubmit={handlePlaceOrder}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-dark)', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>Step 3: Payment Method</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '2rem' }}>
                  
                  {/* Credit Card Section */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: formData.paymentMethod === 'credit' ? '8px 8px 0 0' : '8px', cursor: 'pointer', background: formData.paymentMethod === 'credit' ? 'var(--bg-light)' : 'transparent', margin: 0 }}>
                      <input type="radio" name="paymentMethod" value="credit" checked={formData.paymentMethod === 'credit'} onChange={handleInputChange} />
                      <i className="fas fa-credit-card" style={{ color: 'var(--primary)', fontSize: '1.2rem' }}></i> Credit / Debit Card
                    </label>
                    {formData.paymentMethod === 'credit' && (
                      <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', background: 'var(--white)' }}>
                        <div style={{ marginBottom: '1rem' }}>
                          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: '500' }}>Cardholder Name *</label>
                          <input type="text" name="cardHolderName" value={formData.cardHolderName} onChange={handleInputChange} placeholder="Name as it appears on card" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '6px' }} required={formData.paymentMethod === 'credit'} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: '500' }}>Card Number *</label>
                          <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 5678 9101 1121" maxLength="16" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '6px' }} required={formData.paymentMethod === 'credit'} />
                        </div>
                        <div className="checkout-payment-row" style={{ display: 'flex', gap: '1rem' }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: '500' }}>Expiry Date *</label>
                            <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/YY" maxLength="5" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '6px' }} required={formData.paymentMethod === 'credit'} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: '500' }}>CVV *</label>
                            <input type="password" name="cardCvv" value={formData.cardCvv} onChange={handleInputChange} placeholder="123" maxLength="3" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '6px' }} required={formData.paymentMethod === 'credit'} />
                          </div>
                        </div>
                        <div style={{ marginTop: '1.2rem', textAlign: 'right' }}>
                          <button type="button" onClick={handleVerifyCard} disabled={verifyingCard || !formData.cardNumber || !formData.cardExpiry || !formData.cardCvv || !formData.cardHolderName || isCardVerified} style={{ padding: '0.6rem 1.5rem', background: isCardVerified ? '#28a745' : 'var(--primary)', color: 'var(--white)', border: 'none', borderRadius: '6px', cursor: (verifyingCard || !formData.cardNumber || !formData.cardExpiry || !formData.cardCvv || !formData.cardHolderName || isCardVerified) ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                            {verifyingCard ? <i className="fas fa-spinner fa-spin"></i> : isCardVerified ? <><i className="fas fa-check-circle"></i> Card Verified</> : 'Verify Card'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* UPI Section */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: formData.paymentMethod === 'upi' ? '8px 8px 0 0' : '8px', cursor: 'pointer', background: formData.paymentMethod === 'upi' ? 'var(--bg-light)' : 'transparent', margin: 0 }}>
                      <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleInputChange} />
                      <i className="fas fa-mobile-alt" style={{ color: 'var(--primary)', fontSize: '1.2rem' }}></i> UPI (GPay, PhonePe, Paytm)
                    </label>
                    {formData.paymentMethod === 'upi' && (
                      <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', background: 'var(--white)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', border: '1px dashed var(--border)' }}>
                          <p style={{ marginBottom: '1rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>Scan to Pay ₹{getCartTotal().toFixed(2)}</p>
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=Q731752489@ybl&pn=Gauranga Organic Farm&am=${getCartTotal().toFixed(2)}&cu=INR`)}`} 
                            alt="Dynamic Payment QR Code" 
                            style={{ maxWidth: '200px', height: 'auto', borderRadius: '8px', boxShadow: 'var(--shadow)', background: 'white', padding: '10px' }} 
                          />
                          <p style={{ marginTop: '0.8rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary)' }}>Gauranga Organic Farm</p>
                          <p style={{ marginTop: '0.2rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>Exact amount will automatically show in your app!</p>
                        </div>

                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: '500' }}>UPI ID *</label>
                        <div className="checkout-payment-row" style={{ display: 'flex', gap: '0.5rem' }}>
                          <input type="text" name="upiId" value={formData.upiId} onChange={handleInputChange} placeholder="yourname@bank" style={{ flex: 1, padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '6px' }} required={formData.paymentMethod === 'upi'} />
                          <button type="button" onClick={handleVerifyUpi} disabled={verifyingUpi || !formData.upiId || isUpiVerified} style={{ padding: '0 1.2rem', background: isUpiVerified ? '#28a745' : 'var(--primary)', color: 'var(--white)', border: 'none', borderRadius: '6px', cursor: (verifyingUpi || !formData.upiId || isUpiVerified) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                            {verifyingUpi ? <i className="fas fa-spinner fa-spin"></i> : isUpiVerified ? <><i className="fas fa-check-circle"></i> Verified</> : 'Verify'}
                          </button>
                        </div>
                        {upiName && (
                          <div style={{ marginTop: '0.8rem', color: '#28a745', fontSize: '0.95rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <i className="fas fa-shield-check" style={{ fontSize: '1.1rem' }}></i> Banking Name: {upiName}
                          </div>
                        )}
                        {upiError && (
                          <div style={{ marginTop: '0.8rem', color: '#dc3545', fontSize: '0.95rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <i className="fas fa-exclamation-circle"></i> {upiError}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* COD Section */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', background: formData.paymentMethod === 'cod' ? 'var(--bg-light)' : 'transparent', margin: 0 }}>
                      <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} />
                      <i className="fas fa-money-bill-wave" style={{ color: 'var(--primary)', fontSize: '1.2rem' }}></i> Cash on Delivery
                    </label>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-light)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Items Total:</span>
                    <span>₹{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Shipping:</span>
                    <span style={{ color: 'green' }}>FREE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>
                    <span>Order Total:</span>
                    <span>₹{getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button type="button" className="btn btn-outline" onClick={prevStep}><i className="fas fa-arrow-left"></i> Back to Shipping</button>
                  <button type="submit" className="btn btn-primary" style={{ background: 'var(--accent)', border: 'none' }}><i className="fas fa-check"></i> Place Order</button>
                </div>
              </form>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
