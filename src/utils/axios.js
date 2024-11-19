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

const products = axios.create({
  baseURL: `${baseURL}/products`, // Ensure this is the correct endpoint for products
});

const getquote = axios.create({
  baseURL: `${baseURL}/getquote`, // Ensure this is the correct endpoint for getting quotes
});

const orderdescription = axios.create({
  baseURL: `${baseURL}/orderdescription`, // Ensure this is the correct endpoint for order descriptions
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
products.interceptors.request.use(requestInterceptor, errorInterceptor);
getquote.interceptors.request.use(requestInterceptor, errorInterceptor);
orderdescription.interceptors.request.use(requestInterceptor, errorInterceptor);

export { register, products, getquote, orderdescription,login };
