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
import CustomWovenPage from './pages/customwovenpage.js';
import Vieweditcart from './components/checkout/vieweditcart';
import Hang1 from './components/hantagsection/hang';
import Simplehangtagspage from './pages/simplehangtagspage';
import Wovenlabelpage from './pages/wovenlabel.js';
 import Satinwovenpage from './pages/satinwovenpage.js';
import Fancyhangtagspage from './pages/fancyhangtagspage.js';
import Aboutpage from './pages/aboutpage.js';
import CustomCareLabelPage from './pages/customcarelabelpage.js';
import Screenprintedlabels from './pages/screensprintedlabels.js';
import Customcottonpage from './pages/customcottonpage.js';
import Customsublimationpage from './pages/customsublimationpage.js';
import Customtyvekpage from './pages/customtyvekpage.js';
import Tpulabelspage1 from './pages/tpulabelspage.js';
import Faq1 from './components/faq.js';
import Customheatpage from './pages/customheatpage.js';
import Privacypolicy1 from './components/privacypolicy.js';
 

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
                    <Route path="/customwoven" element={<CustomWovenPage />} />
                    <Route path="/view and edit cart" element={< Vieweditcart />} />
                    <Route path="/custom-hangtags" element={< Hang1 />} />
                    <Route path="/simple-hangtags" element={< Simplehangtagspage />} />
                    <Route path="/woven-text-label" element={< Wovenlabelpage />} />
                    <Route path="/satin-woven" element={< Satinwovenpage />} />
                    <Route path="/fancy-hangtags" element={< Fancyhangtagspage />} />
                    <Route path="/about-us" element={< Aboutpage />} />
                    <Route path="/custom-care-label" element={< CustomCareLabelPage />} />
                    <Route path="/screen-printed-label" element={< Screenprintedlabels />} />
                    <Route path="/custom-cotton-label" element={< Customcottonpage />} />
                    <Route path="/custom-sublimation-label" element={< Customsublimationpage />} />
                    <Route path="/custom-tyvek-label" element={< Customtyvekpage />} />
                    <Route path="/tpu-labels" element={< Tpulabelspage1 />} />
                    <Route path="/faqs" element={< Faq1 />} />
                    <Route path="/privacy-policy" element={< Privacypolicy1 />} />
                    <Route path="/custom-heat-labels" element={< Customheatpage />} />
                </Routes>
                <Footer1 />
            </>
        </Router>
    );
};

export default AppRoutes;
