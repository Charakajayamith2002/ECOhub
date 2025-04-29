// components/CartPage.jsx
// import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart, placeOrder } from '../redux/Cart/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => 
    state.cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const userId = useSelector((state) => state.auth.user?._id); // Get user ID from auth state

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePlaceOrder = () => {
    dispatch(placeOrder({ userId })); // Pass userId to placeOrder action
    navigate('/orders');
  };

  const handleGoBackToProducts = () => {
    navigate('/allProducts');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4"><span>Your</span> Cart</h1>
        <p>Your cart is empty.</p>
        <button 
          onClick={handleGoBackToProducts} 
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-14 mb-20">
      <h1 className="text-4xl font-bold mb-14"><span className='text-green-500'>Your</span> Cart</h1>

      {cartItems.map((item) => (
        <div key={item._id} className="flex items-center justify-between mb-4 py-5 px-2 bg-gray-50 shadow-md rounded-lg">
          <div className="flex items-center">
            <img 
              src={`data:image/jpeg;base64,${item.image}`} 
              alt={item.title} 
              className="w-24 h-24 object-cover mr-4" 
            />
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">Price: RS.{item.price}</p>
              <div className="flex items-center mt-2">
                <label htmlFor={`quantity-${item._id}`} className="mr-2 text-sm text-gray-600">Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${item._id}`}
                  min="1"
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item._id, parseInt(e.target.value))}
                  className="w-16 border border-gray-300 rounded px-2 py-1 bg-green-400 text-center"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-gray-800 font-semibold mr-4">RS.{item.price * item.quantity}</p>
            <button 
              onClick={() => handleRemoveFromCart(item._id)} 
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total Amount: RS.{totalAmount}</h2>
        <div>
          <button 
            onClick={handlePlaceOrder} 
            className="bg-black text-white px-4 py-2 rounded-md mr-4"
          >
            Place the Order
          </button>
          <button 
            onClick={handleClearCart} 
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="mt-6">
        <button 
          onClick={handleGoBackToProducts} 
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default CartPage;
