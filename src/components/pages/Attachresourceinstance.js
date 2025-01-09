import React, { useState } from 'react';
import '../../App.css';
import Sidebar from '../Sidebar';
import notification from '../resources/notification.png';
import profile from '../resources/profile_header.png';
// import { useUser } from '../../UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';

const Attachresourceinstance = () => {
    const location = useLocation();
    const userName = location.state?.userName || 'User';
    const projectName = location.state?.projectName || 'Project';
    const appId = location.state?.appId;
    const accessToken = location.state?.accessToken;
    const {setUserName } = useUser();
    const navigate = useNavigate();
    const [loading] = useState(false);
    const [showLogoutMenu, setShowLogoutMenu] = useState(false);

    const handleLogout = async () => {  
      try {  
        await fetch(`${process.env.REACT_APP_API_BASE_URL}auth/logout`, {  
          method: 'POST',  
          headers: {  
            'Authorization': `Bearer ${accessToken}`,  
            'Content-Type': 'application/json'  
          }  
        });  
        setUserName('');   
        navigate('/login');
      } catch (error) {  
        console.error('Error during logout:', error);  
      }  
    }; 
  
  return (
    <div className='createproject'>
      <Sidebar />
      <div className='createproject-main' id='attachresourceinstance-main'>
        <div className='navbar' id='attachresourceinstance_navbar'>
          <div className='page-title'><h3>{projectName}</h3></div>
          <div className='navbar-placeholder'>
            <form>
              <label htmlFor="searchforresource" className='enterprojectname'></label>
              <input type="text" id="searchforresource" name="username" placeholder='Search for resource and projects' className='navbar-placeholder' />
            </form>
          </div>
          <div className='navbar-icon'>
            <img src={notification} alt="Navbar notification" className="navbar_notification" />
          </div>
          <div className='navbar-identity'>  
            <img src={profile} alt="Identity Dropdown" className="profile" />  
            {loading ? (  
              <div className="loading-indicator">Loading...</div>  
            ) : (  
              <div>   
                <button className='name' id='user-name' onClick={() => setShowLogoutMenu(!showLogoutMenu)}>  
                  {userName}  
                </button>  
                {showLogoutMenu && (  
                  <div className='logout-menu'>  
                    <button onClick={handleLogout} id='logout-button'>Logout</button>  
                  </div>  
                )}  
              </div>  
            )}  
          </div>
        </div>
      </div>

        <div class="deployresources_container" id='attachresourceinstance'>
          <div class="attachresourceinstance_header">
            <div className='attachresourceinstance_heading'>
              <h2>Attach Resource Instance to App.</h2>
            </div>
            <div className='attachresourceinstance_button'>
              <button type="button">Attach</button>
            </div>
          </div>

          <div className='attachresourceinstance_table' id='attachresourceinstance_table'>
            <table>
              <tr class="table">
                <th>S.No</th>
                <th>Resource Type</th>
                <th>Resource Instances Name</th>
                <th>Template</th>
                <th>Status</th>
                <th>Added On</th>
                <th>Deployed On</th>
                <th>Select</th>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input type="checkbox"  /></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input type="checkbox"  /></td>
              </tr>
            </table>
          </div>
        </div>
    </div>
  );
};

export default Attachresourceinstance;
