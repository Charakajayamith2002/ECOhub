import  { useEffect, useState } from 'react';
import LandingPage from '../Components/LandingPage';
import Details from '../Components/Details';
import CropResource from '../Components/CropResource.jsx';

const Homepage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  return (
    <div>
      <LandingPage />
      <Details />
      {(user?.userType === 'Buyer' || user?.userType === 'Seller') && <CropResource />} {/* Show for both Buyer and Seller */}
    </div>
  );
};

export default Homepage;
