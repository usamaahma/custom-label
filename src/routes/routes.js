import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Firstnavbar from "../components/navbars/firstnav.js";
import Mainnavbar from "../components/navbars/mainnavbar.js";
import Footer1 from "../components/footer.js";
import Landingpage from "../pages/landingpage.js";
import ScrollToTop from "../components/scrolltop.js";
import Allclothingpage from "../pages/allclothinglabelspage.js";
import Login from "../components/login/loginregister.js";
import Create from "../components/login/createaccount.js";
import Contactus from "../components/contact/contactus.js";
import Getaquote1 from "../components/getaquote.js";
import Expressclothing from "../pages/expressclothing.js";
import Checkoutbelow1 from "../components/checkout/checkoutbelow.js";
import CustomWovenPage from "../pages/customwovenpage.js";
import Vieweditcart from "../components/checkout/vieweditcart.js";
import Simplehangtagspage from "../pages/simplehangtagspage.js";
import Wovenlabelpage from "../pages/wovenlabel.js";
import Satinwovenpage from "../pages/satinwovenpage.js";
import Fancyhangtagspage from "../pages/fancyhangtagspage.js";
import Aboutpage from "../pages/aboutpage.js";
import CustomCareLabelPage from "../pages/customcarelabelpage.js";
import Screenprintedlabels from "../pages/screensprintedlabels.js";
import Customcottonpage from "../pages/customcottonpage.js";
import Customsublimationpage from "../pages/customsublimationpage.js";
import Customtyvekpage from "../pages/customtyvekpage.js";
import Tpulabelspage1 from "../pages/tpulabelspage.js";
import Faq1 from "../components/faq.js";
import Customheatpage from "../pages/customheatpage.js";
import Privacypolicy1 from "../components/privacypolicy.js";
import PrivateRoute from "./privateroute";
import Myaccountpage from "../pages/myaccountpage.js";
import Dashboard from "../components/myaccount/dashboard.js";
import PendingApprovals from "../components/myaccount/pendingapprovals.js";
import OrderHistory from "../components/myaccount/orderhistory.js";
import Addresses from "../components/myaccount/addresses.js";
import NewsletterSubscriptions from "../components/myaccount/newslettersub.js";
import AccountDetails from "../components/myaccount/accountdetails.js";
import PaymentOptions from "../components/myaccount/paymentoption.js";
import ProductDetail from "../components/productdetail/productDetail.js";
import ThankYouPage from "../components/thankyou/thankyou.js";
import Blog from "../components/blog/blog.js";
import Customblog from "../components/blog/customwoven.js";
import Blogdetail1 from "../components/blog/blogdetail.js";
import Drawerviewedit from "../components/checkout/drawerviewedit.js";
import Hangtags from "../components/clothingsection/Hangtags.js";
import HangtagDetail from "../components/productdetail/hangtagDetail.js";
import Thankyou1 from "../components/thankyou.js";
import MainSearch from "../components/mainsearch/mainsearch.js";
import ForgotPassword1 from "../components/login/forgetpassword.js";
import ResetPassword from "../components/login/resetpassword.js";
import Gallery from "../components/navbars/gallery.js";
import "./routes.css";

const AppRoutes = () => {
  return (
    <Router>
      <Firstnavbar />
      <Mainnavbar />
      <>
        <ScrollToTop />
        <div className="routes-margin">
          {" "}
          <Routes>
            <Route
              path="/my-account"
              element={
                <PrivateRoute>
                  <Myaccountpage />
                </PrivateRoute>
              }
            >
              <Route
                path="account-dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="pending-approvals"
                element={
                  <PrivateRoute>
                    <PendingApprovals />
                  </PrivateRoute>
                }
              />
              <Route
                path="order-history"
                element={
                  <PrivateRoute>
                    <OrderHistory />
                  </PrivateRoute>
                }
              />
              <Route
                path="addresses"
                element={
                  <PrivateRoute>
                    <Addresses />
                  </PrivateRoute>
                }
              />
              <Route
                path="newsletter"
                element={
                  <PrivateRoute>
                    <NewsletterSubscriptions />
                  </PrivateRoute>
                }
              />
              <Route
                path="account-details"
                element={
                  <PrivateRoute>
                    <AccountDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="payment-options"
                element={
                  <PrivateRoute>
                    <PaymentOptions />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword1 />} />
            <Route path="/create-account" element={<Create />} />
            <Route path="/home" element={<Landingpage />} />
            <Route path="/all-clothing-labels" element={<Allclothingpage />} />
            <Route
              path="/contact-us"
              element={
                <div style={{ marginTop: "8rem" }}>
                  <Contactus />
                </div>
              }
            />
            <Route path="/get-quote" element={<Getaquote1 />} />
            <Route path="/express-clothing" element={<Expressclothing />} />
            <Route path="/checkout" element={<Checkoutbelow1 />} />
            <Route path="/customwoven" element={<CustomWovenPage />} />
            <Route path="/view-and-edit-cart" element={<Vieweditcart />} />
            <Route path="/custom-hangtags" element={<Hangtags />} />
            <Route path="/simple-hangtags" element={<Simplehangtagspage />} />
            <Route path="/woven-text-label" element={<Wovenlabelpage />} />
            <Route path="/satin-woven" element={<Satinwovenpage />} />
            <Route path="/fancy-hangtags" element={<Fancyhangtagspage />} />
            <Route path="/about-us" element={<Aboutpage />} />
            <Route path="/thank-you" element={<Thankyou1 />} />
            <Route
              path="/custom-care-label"
              element={<CustomCareLabelPage />}
            />
            <Route
              path="/screen-printed-label"
              element={<Screenprintedlabels />}
            />
            <Route path="/custom-cotton-label" element={<Customcottonpage />} />
            <Route
              path="/custom-sublimation-label"
              element={<Customsublimationpage />}
            />
            <Route path="/custom-tyvek-label" element={<Customtyvekpage />} />
            <Route path="/tpu-labels" element={<Tpulabelspage1 />} />
            <Route path="/faqs" element={<Faq1 />} />
            <Route path="/custom-heat-labels" element={<Customheatpage />} />
            <Route path="/privacy-policy" element={<Privacypolicy1 />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/mainsearch" element={<MainSearch />} />
            <Route path="/custom-blogs" element={<Customblog />} />
            <Route path="/product/:productName" element={<ProductDetail />} />
            <Route path="/drawer-view-edit" element={<Drawerviewedit />} />
            <Route path="/hangtag/:productName" element={<HangtagDetail />} />
            <Route path="/blog/:blogname" element={<Blogdetail1 />} />
            <Route path="/instagram-posts" element={<Gallery />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer1 />
      </>
    </Router>
  );
};

export default AppRoutes;
