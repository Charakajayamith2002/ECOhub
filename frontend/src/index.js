import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';





import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import Header from './shared/Header.jsx';
import Footer from './shared/Footer.jsx';



import store from './redux/store.js';
import { Provider } from 'react-redux';
import Profile from './Components/Profile.jsx';
import SellerProfile from './Components/SellerProfile.jsx';
import AboutUs from './Components/AboutUs.jsx';








const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

<Router>
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <Routes>

        <Route path='/' element={<App />} />

        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/sellerProfile' element={<SellerProfile/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>

        

       
      </Routes>
    </main>
    <Footer />
  </div>
</Router>
</Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

