// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useShop } from '../context/ShopContext';
// import './Login.css';
// import { getlogin } from '../Api/CoreApi';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useShop();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulate login
//     login({
//       name: 'User',
//       email: formData.email
//     });
//     navigate(-1); // Go back to previous page
//   };
//   const handleChange = () =>{

//   }

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="login-header">
//           <h2>Login</h2>
//           <p>Get access to your Orders, Wishlist and Recommendations</p>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="submit-btn">
//             Login
//           </button>
//         </form>
//         <p className="toggle-form">
//           Don't have an account?
//           <button
//             className="toggle-btn"
//             onClick={() => navigate('/signup')}
//           >
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "./Login.css";
import { getlogin } from "../Api/CoreApi";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useShop();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with:", formData);
    navigate("/rohit");
  
    try {
      // Sending login request to the server
      const response = await getlogin(formData);
    
  
      // Check if login is successful
      if (response && response.success) {
        // Assuming `login` is a function from context to save user details
        login({ name: response.name, email: response.email });
       
  
        // Navigate to '/rohit' after successful login
       
      } else {
        // Show error message if login fails
        alert(response?.message || "Invalid credentials.");
      }
    } catch (error) {
      // Log any errors and show a generic error message
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  };
  
  

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Login</h2>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
        <p className="toggle-form">
          Don't have an account?{" "}
          <button className="toggle-btn" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
