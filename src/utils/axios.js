import axios from "axios";

// Base URL from environment variables
const baseURL = process.env.REACT_APP_API_URL; // Make sure your .env file is correctly set

// Create instances with consistent base URLs for each service
const register = axios.create({
  baseURL: `${baseURL}/auth`, // Ensure this is the correct endpoint for login
});
const login = axios.create({
  baseURL: `${baseURL}/auth`, // Ensure this is the correct endpoint for login
});
const google = axios.create({
  baseURL: `${baseURL}/auth`, // Ensure this is the correct endpoint for login
});

const products = axios.create({
  baseURL: `${baseURL}/products`, // Ensure this is the correct endpoint for products
});
const hangtag = axios.create({
  baseURL: `${baseURL}/hangtag`, // Ensure this is the correct endpoint for products
});

const getquote = axios.create({
  baseURL: `${baseURL}/getquote`, // Ensure this is the correct endpoint for getting quotes
});

const orderdescription = axios.create({
  baseURL: `${baseURL}/orderdescription`, // Ensure this is the correct endpoint for order descriptions
});
const blog = axios.create({
  baseURL: `${baseURL}/blogs`, // Ensure this is the correct endpoint for order descriptions
});
const requestquote = axios.create({
  baseURL: `${baseURL}/requestquote`, // Ensure this is the correct endpoint for order descriptions
});
const pendingcheckout = axios.create({
  baseURL: `${baseURL}/pendingcheckout`, // Ensure this is the correct endpoint for order descriptions
});
const checkout = axios.create({
  baseURL: `${baseURL}/checkout`, // Ensure this is the correct endpoint for order descriptions
});

const designquote = axios.create({
  baseURL: `${baseURL}/designQuote`, // Ensure this is the correct endpoint for order descriptions
});

const manageaddresses = axios.create({
  baseURL: `${baseURL}/accountaddress`, // Ensure this is the correct endpoint for order descriptions
});

const newsletteremail = axios.create({
  baseURL: `${baseURL}/newsletter`, // Ensure this is the correct endpoint for order descriptions
});

const resetpassword = axios.create({
  baseURL: `${baseURL}/auth/res-password`, // Ensure this is the correct endpoint for order descriptions
});

const forgetPassword = axios.create({
  baseURL: `${baseURL}/auth/forgot-password`, // Correct the baseURL to point to `/auth`
});
const orderhistory = axios.create({
  baseURL: `${baseURL}/completedorder/usercompletedorder`, // Ensure this is the correct endpoint for order descriptions
});
const Seo = axios.create({
  baseURL: `${baseURL}/seo`, // Ensure this is the correct endpoint for order descriptions
});


// Generic request interceptor for all instances
const requestInterceptor = (req) => {
  // Optionally add authorization headers or custom logic
  // req.headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  return req;
};

const errorInterceptor = (err) => {
  console.error("Request failed:", err);
  return Promise.reject(err);
};

// Apply interceptors for each axios instance
register.interceptors.request.use(requestInterceptor, errorInterceptor);
login.interceptors.request.use(requestInterceptor, errorInterceptor);
google.interceptors.request.use(requestInterceptor, errorInterceptor);
products.interceptors.request.use(requestInterceptor, errorInterceptor);
hangtag.interceptors.request.use(requestInterceptor, errorInterceptor);
getquote.interceptors.request.use(requestInterceptor, errorInterceptor);
orderdescription.interceptors.request.use(requestInterceptor, errorInterceptor);
blog.interceptors.request.use(requestInterceptor, errorInterceptor);
requestquote.interceptors.request.use(requestInterceptor, errorInterceptor);
pendingcheckout.interceptors.request.use(requestInterceptor, errorInterceptor);
checkout.interceptors.request.use(requestInterceptor, errorInterceptor);
designquote.interceptors.request.use(requestInterceptor, errorInterceptor);
manageaddresses.interceptors.request.use(requestInterceptor, errorInterceptor);
newsletteremail.interceptors.request.use(requestInterceptor, errorInterceptor);
resetpassword.interceptors.request.use(requestInterceptor, errorInterceptor);
forgetPassword.interceptors.request.use(requestInterceptor, errorInterceptor);
orderhistory.interceptors.request.use(requestInterceptor, errorInterceptor);
Seo.interceptors.request.use(requestInterceptor, errorInterceptor);

export {
  register,
  products,
  getquote,
  orderdescription,
  login,
  hangtag,
  google,
  blog,
  requestquote,
  pendingcheckout,
  checkout,
  designquote,
  manageaddresses,
  newsletteremail,
  resetpassword,
  forgetPassword,
  orderhistory,
  Seo,
};
