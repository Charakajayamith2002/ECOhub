import { createSlice } from '@reduxjs/toolkit';

// Function to load cart and orders from local storage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  const savedOrders = localStorage.getItem('orders');

  // Parse the saved cart and orders or return defaults
  return savedCart ? JSON.parse(savedCart) : { cartItems: [], totalQuantity: 0, totalAmount: 0, orders: savedOrders ? JSON.parse(savedOrders) : [] };
};

// Define the initial state for the cart
const initialState = loadCartFromLocalStorage();

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item._id === newItem._id);

      if (!existingItem) {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
        });
        state.totalQuantity++;
        state.totalAmount += newItem.price;
      } else {
        existingItem.quantity++;
        state.totalQuantity++;
        state.totalAmount += newItem.price;
      }
      saveCartToLocalStorage(state);
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item._id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter(item => item._id !== id);
      }
      saveCartToLocalStorage(state);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item._id === id);

      if (existingItem && quantity > 0) {
        const quantityChange = quantity - existingItem.quantity;
        state.totalQuantity += quantityChange;
        state.totalAmount += existingItem.price * quantityChange;
        existingItem.quantity = quantity;
      }
      saveCartToLocalStorage(state);
    },

    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cart');
    },

    placeOrder(state, action) {
      const userId = action.payload.userId; // Get userId from payload
      const newOrder = {
        id: new Date().toISOString(),
        userId: userId, // Save userId with order details
        items: state.cartItems.map(item => ({
          _id: item._id,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: state.totalAmount,
        totalQuantity: state.totalQuantity,
        orderDate: new Date().toISOString(),
      };

      state.orders.push(newOrder);

      // Save orders to local storage
      saveOrdersToLocalStorage(state.orders);

      // Clear the cart after placing the order
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      saveCartToLocalStorage(state);
    },
  },
});

// Function to save the cart to local storage
const saveCartToLocalStorage = (state) => {
  localStorage.setItem('cart', JSON.stringify(state));
};

// Function to save orders to local storage
const saveOrdersToLocalStorage = (orders) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

// Export actions and reducer
export const { addToCart, removeFromCart, updateQuantity, clearCart, placeOrder } = cartSlice.actions;
export default cartSlice.reducer;
