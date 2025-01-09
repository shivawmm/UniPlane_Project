import React, { useState } from 'react';import '../../App.css';
import Sidebar from '../Sidebar';
import notification from '../resources/notification.png';
import profile from '../resources/profile_header.png'
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';


const Deployresources = () => {

  const { userName } = useUser();
  const [loading] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  // const accessToken = location.state?.accessToken;
  const accessToken = 45;
  const {setUserName } = useUser();
  const navigate = useNavigate();

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
    <div className='deployresources'>
      <Sidebar />
      <div className='deployresources-main'>
        <div className='navbar' id='deployresourceinstance-navbar'>
          <div className='page-title'>
                <h3>App Name</h3>
            </div>
          <div className='navbar-placeholder'>
            <form>
              <label htmlFor="searchforresource" className='enterprojectname'></label>
              <input type="text" id="searchforresource" name="username" placeholder='Search for resource and projects' className='navbar-placeholder'/>
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

        <div class="deployresources_container">
          <div class="deployresources_header">
            <div className='deployresourceinstances_heading'>
              <h2>Deploy Resource Instances</h2>
            </div>
            <div className='deployresource_button'>
              <button type="button" className='costanalysis'>Cost Analysis</button>
            </div>
          </div>
          <div class="form-group-dri">
            <div className='cloudtypediv'>
              <label for="resource-type" className='cloud-type'>Cloud Type</label>
              <select id="resource-type">
                <option value="">Select Cloud</option>
                <option value="Type 1">Amazon Web Services</option>
                <option value="Type 2">Google Cloud</option>
              </select>
            </div>
            <div className='regiontypediv'>
              <label for="resource-type" className='region-type'>Region</label>
              <select id="resource-type">
                <option value="">Select Region</option>
                <option value="Type 1">Region 1</option>
                <option value="Type 2">Region 2</option>
              </select>
            </div>
          </div>

          <div className='dr_span'>
            <span>Select the resources that you wanted to deploy</span>
          </div>

          <div className='deployresourceinstance_table'>
            <table>
              <tr class="table">
                <th>S.No</th>
                <th>Resource Type</th>
                <th>Name</th>
                <th>Template</th>
                <th>Status</th>
                <th>Deployed On</th>
                <th>Deploy Resource Instance</th>
                <th>Deploy Code</th>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input type="checkbox"  className='checkbox'/></td>
                <td><input type="checkbox"  className='checkbox'/></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input type="checkbox"  className='checkbox'/></td>
                <td><input type="checkbox"  className='checkbox'/></td>
              </tr>
            </table>
          </div>

          <div className='deployresource_button'>
            <button type="button" className='deploy_resourceinstance_button'>Deploy Resource Instance</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deployresources;

