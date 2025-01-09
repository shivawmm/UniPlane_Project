
import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import notification from '../resources/notification.png';
import profile from '../resources/profile_header.png';
import '../../App.css';
import { useUser } from '../../UserContext'; 

const Projectdetails = () => {
  const { userName, setUserName } = useUser();
  const location = useLocation();
  const projectName = location.state?.projectName || 'Project';
  const navigate = useNavigate();
  const accessToken = location.state?.accessToken; // Access token from location state  
  const [loading, setLoading] = useState(true);   
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const userId = location.state?.userId;
  const tenantId = location.state?.tenantId;  
  const projectId = location.state?.projectId;
  const [apps, setApps] = useState([]);

  // Fetch the list of apps associated with the projectId
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}apps/list/${projectId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setApps(data);
      } catch (error) {
        console.error('Error fetching apps:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [projectId, accessToken]);

  const handleAddAppClick = () => {
    navigate('/createapp', {state: {projectName, userName, accessToken, userId, tenantId}}); 
  };

  // Handle navigation to the Appdetails page
  const handleAppClick = (appId, appName) => {
    navigate('/appdetails', { 
      state: { 
        projectName, userName, appId, accessToken, userId, tenantId, appName
      } 
    });
  };

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
    <div className='projectdetails'>
      <Sidebar />
      <div className='projectdetails-main'>
        <div className='navbar' id='projectdetails-main-navbar'>
          <div className='page-title' id='projectdetails-page-title'><h3>{projectName}</h3></div>
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

        <div className='projectdetails_container'>
          <div className='projectdetails_second' id='projectdetails_second'>
            <div className='pdsb2'></div>
            <div className='projectdetails_second_header'>
              <h2>Apps</h2>
              <button className='button' type='button' id='addapp_button' onClick={handleAddAppClick}>+ Add App</button>
            </div>
            <div className='projectdetails_second_body'>
              <div className='adfb1'>
                <div>Apps in Project '{projectName}'</div>
              </div>
              <div className='adfb2'>
                {apps.length > 0 ? (
                  apps.map((app, index) => (
                    <div key={index} className='adfb2_icon' onClick={() => handleAppClick(app.appId, app.appName)}>
                      {app.appIconPath ? (
                        <img src={app.appIconPath} alt="App Icon" className="app" />
                      ) : (
                        <span className='apps' id='app_id'>Icon</span>
                      )}
                      <span id='instance_name'>{app.appName}</span>
                    </div>
                  ))
                ) : (
                  <div className='resourceinstance_empty'>No apps available.</div>
                )}
              </div>
            </div>
          </div> 

          <div className='dr_span'>
            <span>Select the resources that you wanted to deploy</span>
          </div>

          <div className='projectdetails_table'>
            <table>
              <thead>
                <tr className="table" id='projectdetails_table_th'>
                  <th>S.No</th>
                  <th>Cloud</th>
                  <th>Resource Instance Type</th>
                  <th>Resource Instance Name</th>
                  <th>Template</th>
                  <th>Status</th>
                  <th>Added On</th>
                  <th>Deployed On</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Projectdetails;
