import React, { useState, useEffect } from 'react';  
import '../../App.css';  
import Sidebar from '../Sidebar';  
import notification from '../resources/notification.png';  
import profile from '../resources/profile_header.png';  
import { useLocation, useNavigate } from 'react-router-dom';  
import { useUser } from '../../UserContext';   
import success_icon from '../resources/success-icon.png';  

const Createapp = () => {  
  const [showPopup, setShowPopup] = useState(false);  
  const [popupType, setPopupType] = useState('');  
  const [appName, setAppName] = useState('');  
  const [projectName, setProjectName] = useState('Project Name');   
  const [loading, setLoading] = useState(false);  
  const {setUserName } = useUser();  
  const location = useLocation();  
  const navigate = useNavigate();  
  const [appId, setAppId] = useState(null);   
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);  
  const { accessToken, userId, tenantId } = location.state || {};  
  const userName = location.state?.userName || 'User';
  // const projectName = location.state?.projectName || 'Project Name'

  useEffect(() => {  
    if (location.state) {  
      const fetchedAppName = location.state.appName || '';  
      setAppName(fetchedAppName);  
      const fetchedProjectName = location.state.projectName || 'Project Name';   
      setProjectName(fetchedProjectName);  
      const fetchedUserName = location.state.userName || 'User';  
      setUserName(fetchedUserName);  
    }  
  }, [location.state, setUserName]);  

  const handleClosePopup = () => {  
    setShowPopup(false);  
  };  

  const fetchProjectId = async (projectName) => {  
    try {  
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}projects/list`, {  
        headers: {  
          'Authorization': `Bearer ${accessToken}`,  
          'Content-Type': 'application/json'  
        }  
      });  

      if (response.ok) {  
        const projects = await response.json();  
        const project = projects.find(proj => proj.projectName === projectName);  
        return project ? project.projectId : null;  
      } else {  
        console.error('Failed to fetch projects');  
        return null;  
      }  
    } catch (error) {  
      console.error('Error:', error);  
      return null;  
    }  
  };  

  const handleSubmit = async (event) => {  
    event.preventDefault();  
    setLoading(true);  
    const enteredAppName = event.target.elements.enterappname.value;  
    setAppName(enteredAppName);  

    const projectId = await fetchProjectId(projectName);   

    if (!projectId) {  
      console.error('Project not found');  
      setLoading(false);  
      return;  
    }  

    const requestBody = {  
      appName: enteredAppName,  
      projectId: projectId   
    };  

    try {  
      const response = await fetch(  
        `${process.env.REACT_APP_API_BASE_URL}apps/create`,  
        {  
          method: 'POST',  
          headers: {  
            'Authorization': `Bearer ${accessToken}`,   
            'Content-Type': 'application/json'  
          },  
          body: JSON.stringify(requestBody)  
        }  
      );  

      if (response.ok) {  
        const data = await response.json();  
        console.log(data);  
        setPopupType('appCreated');  
        setAppId(data.appId); 
        setShowPopup(true);
      } else {  
        console.error('Failed to create app');  
      }  
    } catch (error) {  
      console.error('Error:', error);  
    } finally {  
      setLoading(false);   
    }  
  };  

  const handleYesClick = () => {  
    navigate('/addresourceinstance', { state: { appName, userName, projectName, appId, accessToken, userId, tenantId } });  
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
    <div className='createproject'>  
      <Sidebar />  
      <div className='createproject-main'>  
        <div className='navbar'>  
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
        <div className={`innerdiv1 ${showPopup ? 'overlay' : ''}`}>  
          <div className='innerdiv_title'>  
            Create App 
          </div>  
          <div className='innerdiv_form'>  
            <form onSubmit={handleSubmit}>  
              <label htmlFor="enterappname" className='enterprojectname'></label>  
              <input type="text" id="enterappname" name="enterappname" placeholder='Enter App Name' className='center-placeholder custom-input-width' />  
              <div className='innerdiv_button'>  
                <button type="submit">Submit</button>  
              </div>  
            </form>  
          </div>  
          {showPopup && popupType === 'appCreated' && (  
            <div className="createproject-popup">  
              <div className="popup-content">  
                <div className="section-content">  
                  <div className="success-icon"><img src={success_icon} alt="Icon" className="icon" height={30} width={30} /></div>  
                  <div className="confirmation-message-title">App '{appName}' created successfully.</div>  
                  <div className="confirmation">  
                    <div className="confirmation-message">Do you want to add resourceInstance to it?</div>  
                    <div className="confirmation-buttons">  
                      <button className="confirmation-button active" id="yesButton" onClick={handleYesClick}>Yes</button>  
                      <button className="confirmation-button" id="noButton" onClick={handleClosePopup}>No</button>  
                    </div>  
                  </div>  
                </div>  
              </div>  
            </div>  
          )}  
        </div>  
      </div>  
    </div>  
  );  
};  

export default Createapp;