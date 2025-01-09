import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';  
import '../../App.css';  
import logo from '../resources/uniPlane_logo.png';  

const Login = () => {  
  const [email, setEmail] = useState('');  
  const [tenant, setTenant] = useState('');  
  const [password, setPassword] = useState('');  
  const [tenants, setTenants] = useState([]);  
  const [error, setError] = useState('');  
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate(); 

  useEffect(() => {  
    const fetchTenants = async () => {  
      try {  
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}tenants/list`);      
        if (response.status === 200) {  
          setTenants(response.data || []);  
        } else {  
          console.error('Failed to fetch tenant list');  
          setTenants([]);  
        }  
      } catch (error) {  
        console.error('Error during fetching tenant list:', error);  
        setTenants([]);  
      }  
    };  

    fetchTenants();  
  }, []);  

  const decodeJWT = (token) => {  
    const base64Url = token.split('.')[1];  
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');  
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {  
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);  
    }).join(''));  

    return JSON.parse(jsonPayload);  
  };  

  const handleTokenRefresh = async (refreshToken) => {  
    try {  
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}auth/refresh-token`, {  
        token: refreshToken  
      });  
  
      if (response.status === 200) {  
        const { accessToken } = response.data;  
        const newaccessToken = accessToken;
        const userDetails = decodeJWT(newaccessToken);  
        navigate('/createproject', {  
          state: {  
            userId: userDetails.userid,  
            userName: userDetails.username,  
            tenantId: userDetails.tenantid || tenant,  
            newaccessToken
          }  
        });  
      } else {    
        console.error('Failed to refresh token');  
        setError('Failed to refresh token. Please try again.');  
      }  
    } catch (error) {  
      console.error('Error during token refresh:', error);  
      setError('An error occurred while refreshing the token.');  
    }  
  };  

  const handleLogin = async (event) => {  
    event.preventDefault();  
    setError('');  
    setLoading(true);  
  
    try {  
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}auth/login`, {  
        email,  
        password  
      });  
  
      if (response.status === 200) {  
        console.log('Login successful', response.data);  
        const { refreshToken } = response.data; 
        localStorage.setItem('refreshToken', refreshToken);  
        await handleTokenRefresh(refreshToken);  
      } else {  
        setError('Login failed. Please check your credentials.');  
      }  
    } catch (error) {  
      console.error('Error during login:', error);  
      if (error.response) {  
        setError(error.response.data.message || 'An error occurred during login. Please try again later.');  
      } else if (error.request) {  
        setError('No response received from the server. Please check your network connection.');  
      } else {  
        setError('An error occurred during login. Please try again later.');  
      }  
    } finally {  
      setLoading(false);  
    }  
  };  

  return (  
    <div className="login_page">  
      <div className="login-container">  
        <div className="logo-container">  
          <img src={logo} alt="UniPlane Logo" className="logo" />  
        </div>  
        <form onSubmit={handleLogin}>  
          <label htmlFor="tenant" className='tenant'>Tenant</label>  
          <select  
            id="tenant"  
            name="tenant"  
            value={tenant}  
            onChange={(e) => setTenant(e.target.value)}  
          >  
            <option value="">Select Tenant</option>  
            {tenants.map((tenantItem) => (  
              <option key={tenantItem.tenantId} value={tenantItem.tenantId}>  
                {tenantItem.tenantName}  
              </option>  
            ))}  
          </select>  

          <label htmlFor="email" className='email'>User ID</label>  
          <input  
            type="email"  
            id="email"  
            name="email"  
            placeholder='User ID'  
            value={email}  
            onChange={(e) => setEmail(e.target.value)}  
          />  

          <label htmlFor="password" className='password'>Password</label>  
          <input  
            type="password"  
            id="password"  
            name="password"  
            placeholder='Password'  
            value={password}  
            onChange={(e) => setPassword(e.target.value)}  
          />  

          {error && <p className="error-message">{error}</p>}  
          {loading ? <p>Loading...</p> : <button type="submit">Login</button>}  
        </form>  
      </div>  
    </div>  
  );  
};  

export default Login;







