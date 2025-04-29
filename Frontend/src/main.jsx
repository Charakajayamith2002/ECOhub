import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import Header from './shared/Header.jsx';
import Footer from './shared/Footer.jsx';
import DiseaseResult from './Components/DiseaseResult.jsx';
import FileUpload from './Components/FileUpload.jsx';

//Yasasi
import FertilizerList from './Components/FertilizerList.jsx';
import AddFertilizerForm from './Components/AddFertilizerForm.jsx';
import UpdateFertilizerForm from './Components/UpdateFertilizerForm.jsx';

//Kavishka
import DashBoard from "./Components/Inventory/Admin/DashBoard/DashBoard";
import Additem from "./Components/Inventory/Admin/AddItem/Additem";
import UpdateItem from "./Components/Inventory/Admin/UpdateItem/UpdateItem";
import DetailsDash from "./Components/Inventory/User/DetailsDash/DetailsDash";
import DiseaseDetails from './Components/DiseaseDetails.jsx';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';

//react-redux
import store from './redux/store.js';
import { Provider } from 'react-redux';
import Profile from './Components/Profile.jsx';
import SellerProfile from './Components/SellerProfile.jsx';
import AboutUs from './Components/AboutUs.jsx';
import MoreDetails from './Components/Inventory/User/MoreDetails/MoreDetails.jsx';
import ProductBrowsePage from './Components/ProductBrowse.jsx';
import ProductDetailPage from './Components/ProductDetails.jsx';
import CartPage from './Components/Cart.jsx';
import OrderList from './Components/OrderList.jsx';
import OrderDetails from './Components/OrderDetails.jsx';

import AddCropForm from './Components/AddCropForm.jsx';
import AllCrops from './Components/CropList.jsx';
import EditCrop from './Components/edit-crop/[id]/page.jsx';
import CropsDetails from './Components/CropsDetails'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/diseaseResult' element={<DiseaseResult />} />
            <Route path='/detectDisease' element={<FileUpload />} />
            <Route path='/disease-details' element={<DiseaseDetails />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/sellerProfile' element={<SellerProfile/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>

            {/*Yasasi*/}
            <Route path='/manageFertilizers' element={<FertilizerList />}/>
            <Route path='/addFertilizers' element={<AddFertilizerForm />}/>
            <Route path='/updateFertilizer/:id' element={<UpdateFertilizerForm />}/>
            <Route path='/allProducts' element={<ProductBrowsePage />}/>
            <Route path='/productDetails/:id' element={<ProductDetailPage />}/>
            <Route path='/mycart' element={<CartPage />}/>
            <Route path='/orders' element={<OrderList />}/>
            <Route path='/orders/:orderId' element={<OrderDetails />}/>

            {/*Kavishka*/}
             {/*Admin Side*/}
          <Route path="/inventory" element={<DashBoard />} />
          <Route path="/additem" element={<Additem />} />
          <Route path="/updateitem/:id" element={<UpdateItem />} />
          {/*User Side*/}
          <Route path="/allPosts" element={<DetailsDash />} />
          <Route path="/moreDetails" element={<MoreDetails />} />



          <Route path='/AddCrop' element={<AddCropForm/>}/>
          <Route path='/Allcrops' element={<AllCrops/>} />
          <Route path="/edit-crop/:id" element={<EditCrop />} />
          <Route path="/crop-details/:cropId" element={<CropsDetails />} />



          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </Provider>
  </StrictMode>
);
