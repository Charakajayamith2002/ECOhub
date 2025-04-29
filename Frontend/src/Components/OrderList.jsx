// components/OrderList.jsx
// import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const orders = useSelector((state) => state.cart.orders);
  const userId = useSelector((state) => state.auth.user?._id); // Get user ID from auth state
  const navigate = useNavigate();

  // Filter orders by userId
  const userOrders = orders.filter(order => order.userId === userId);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {userOrders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul>
          {userOrders.map((order) => (
            <li key={order.id} className="mb-4 p-4 bg-gray-100 rounded-md shadow-md">
              <h2 className="text-lg font-semibold">Order Date: {new Date(order.orderDate).toLocaleString()}</h2>
              <p>Total Amount: RS.{order.totalAmount}</p>
              <button onClick={() => navigate(`/orders/${order.id}`)} className="bg-green-500 text-white px-4 py-2 rounded-md mt-2">
                View Order Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
