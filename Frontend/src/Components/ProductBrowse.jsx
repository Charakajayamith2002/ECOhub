import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProductBrowsePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
      navigate('/login');
      return;
    };
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/products/fertilizers');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className='flex flex-wrap justify-between'>
        <h2 className=" font-bold text-center text-gray-800 mb-10 mt-10 text-4xl"><span className='text-green-500'>Browse</span> Products</h2>
       <div className='flex gap-x-5'>
        <Link to='/mycart'>
          <div>
            <button className='bg-green-600 px-5 py-2 rounded-lg font-semibold text-white mt-10'>My Cart</button>
          </div>
        </Link>
        <Link to='/orders'>
          <div>
            <button className='bg-green-600 px-5 py-2 rounded-lg font-semibold text-white mt-10'>My orders</button>
          </div>
        </Link>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 border mb-10 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product._id} to={`/productDetails/${product._id}`}>
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-gray-900 mt-2 font-bold">RS.{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductBrowsePage;
