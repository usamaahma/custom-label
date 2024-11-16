import axios from "axios";

const url = process.env.REACT_APP_API_URL; // Ensure this is set correctly in your .env file

const login = axios.create({
  baseURL: `${url}authentication`, // Ensure this is the correct endpoint for login
});

const products = axios.create({
  baseURL: `${url}/products`, // Ensure this is the correct endpoint for products
});
const getquote = axios.create({
  baseURL: `${url}/getquote`, // Ensure this is the correct endpoint for products
});
const orderdescription = axios.create({
  baseURL: `${url}/orderdescription`, // Ensure this is the correct endpoint for products
});

// Request interceptor for products
getquote.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// Request interceptor for products
products.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
orderdescription.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { login, products, getquote, orderdescription };
