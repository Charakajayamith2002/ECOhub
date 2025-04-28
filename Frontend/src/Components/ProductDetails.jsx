import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/Cart/cartSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();  // Get the product ID from the URL
  const [product, setProduct] = useState(null);  // Store product details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  console.log(cartItems)

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setSuccessMessage('Product added to cart successfully!');
    // Automatically hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  useEffect(() => {
    if(!user){
      navigate('/login');
      return;
    };
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products/getsingleFertilizer/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load product details');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="container mx-auto p-6 h-auto mt-32 mb-40">
      <div className="flex flex-col md:flex-row gap-x-12">
        {/* Product Image */}
        <div className="">
          <img 
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.title} 
            className="w-full h-auto object-cover rounded-lg shadow-lg" 
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 md:pl-6">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 text-lg mb-4">{product.des}</p>

          {/* Product Price */}
          <p className="text-xl font-semibold text-gray-800">Price: RS.{product.price}</p>

          {/* Product Stock Status */}
          <p className={`text-lg ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </p>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart} 
            className='bg-green-600 mt-5 px-3 py-2 rounded-lg text-white font-semibold'
          >
            Add to Cart
          </button>

          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
