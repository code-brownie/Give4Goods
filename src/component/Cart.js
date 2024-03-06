import React from 'react';
import '../style/cart.css';
import { useDispatchCart, useCart } from './ContexReducer';



const Cart = () => {
  const userId = localStorage.getItem("UserId");
  console.log(userId);
  const data = useCart(userId);
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh', margin: 0, textAlign: 'center', flexFlow: 'column' }}>
        <img src='./images/Cart-logo.png' alt='Cart is empty' style={{ maxWidth: '20%', height: 'auto' }} />
        <p>Your cart is currently empty please add some product to view them here!!!.</p>
      </div>

    );
  }
  const handlePayment = async () => {
    try {
      const response = await fetch('https://give4goods.onrender.com/api/auth/stripe', {
        // const response = await fetch('http://localhost:5000/api/auth/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const Data = await response.json();
      window.location = (Data.url)
    } catch (error) {
      console.log(error.message);
    }

  }

  let totalPrice = data.reduce((total, item) => total + item.price * item.Qty, 0);

  return (
    <div className="small-containers cart">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (

              <tr key={item.id}>
                <td>
                  <div className="cart-info">
                    <img src={item.img} alt="cart" />
                    <div>
                      <p style={{ fontSize: '14px' }}>{item.name.toUpperCase()}</p>
                      <h4 style={{ fontSize: '14px' }}>Price: ₹{item.price}</h4>
                      <p className="delete" onClick={() => { dispatch({ type: 'REMOVE', index: index }) }}>Remove</p>
                    </div>
                  </div>
                </td>
                <td>{item.Qty}</td>
                <td>₹{item.price * parseInt(item.Qty)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="total-price">
        <table>
          <tbody>
            <tr>
              <td>Total</td>
              <td>₹{totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="btn" onClick={handlePayment}>Checkout</div>
    </div>
  );
};

export default Cart;
