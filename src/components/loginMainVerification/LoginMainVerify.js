// Login.js
import React, { useState } from "react";

const Login = ({ onVerified }) => {
  const [password, setPassword] = useState("");

  const checkPw = (e) => {
    e.preventDefault();

    if (password === "sireprinting") {
      onVerified(true); // Call the function passed as a prop to indicate verification
    } else {
      alert("Sorry, that's not it");
    }
  };

  return (
    <form onSubmit={checkPw}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button type="submit">Open Sesame</button>
    </form>
  );
};

export default Login;
