import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Firstnavbar from './components/navbars/firstnav';
import Mainnavbar from './components/navbars/mainnavbar';
import Footer1 from './components/footer';
import Landingpage from './pages/landingpage';
import ScrollToTop from './components/scrolltop';
import Allclothingpage from './pages/allclothinglabelspage';
import Login from './components/login/loginregister';
import Create from './components/login/createaccount';
import Contactus from './components/contact/contactus';
import Getaquote1 from './components/getaquote';
import Expressclothing from './pages/expressclothing';
import Checkoutbelow1 from './components/checkout/checkoutbelow';
 

const AppRoutes = () => {
    return (
        <Router>
            <Firstnavbar />
            <Mainnavbar />
            <>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Landingpage />} />
                    <Route path="/home" element={<Landingpage />} />
                    <Route path="/all-clothing-labels" element={<Allclothingpage />} />
                    <Route path="/login" element={< Login />} />
                    <Route path="/create-account" element={< Create />} />
                    <Route path="/contact-us" element={< Contactus />} />
                    <Route path="/get-quote" element={< Getaquote1 />} />
                    <Route path='/express-clothing' element={<Expressclothing />} />
                    <Route path="/checkout" element={< Checkoutbelow1 />} />
                </Routes>
                <Footer1 />
            </>
        </Router>
    );
};

export default AppRoutes;
