import React, { useState, useEffect } from 'react';  
import { useLocation, useNavigate } from 'react-router-dom';   
import '../../App.css';  
import Sidebar from '../Sidebar';  
import notification from '../resources/notification.png';  
import profile from '../resources/profile_header.png';  
import success_icon from '../resources/success-icon.png';  
import { useUser } from '../../UserContext';  
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  

const Createproject = () => {  
  const [showPopup, setShowPopup] = useState(false);  
  const [popupType, setPopupType] = useState('');  
  const [projectName, setProjectName] = useState('');  
  const location = useLocation();  
  const navigate = useNavigate();  
  const {setUserName } = useUser();   
  const [loading] = useState(false);   
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);  
  const { userName, userId, tenantId, accessToken } = location.state || {};   

  useEffect(() => {  
    const { showPopup } = location.state || {};  
    if (showPopup) {  
      setPopupType(showPopup);  
      setShowPopup(true);  
    }  
  }, [location.state]);  

  const handleSubmit = async (event) => {  
    event.preventDefault();  
    const enteredProjectName = event.target.elements.enterprojectname.value;  
    setProjectName(enteredProjectName);  

    const requestBody = {  
      projectName: enteredProjectName,  
      tenantId: tenantId,  
      ownerId: userId   
    };  

    try {  
      const response = await fetch(  
        `${process.env.REACT_APP_API_BASE_URL}projects/create`,  
        {  
          method: 'POST',  
          headers: {  
            'Content-Type': 'application/json',  
            'Authorization': `Bearer ${accessToken}`  
          },  
          body: JSON.stringify(requestBody)  
        }  
      );  

      if (response.ok) {  
        const data = await response.json();  
        console.log(data);  
        setPopupType('projectCreated');  
        setShowPopup(true);  
      } else {  
        console.error('Failed to create project');  
      }  
    } catch (error) {  
      console.error('Error:', error);  
    }  
  };  

  const handleYesClick = () => {  
    navigate('/createapp', { state: { projectName, userName, userId, tenantId, accessToken } });  
  };  

  const handleNoClick = () => {  
    navigate('/projectdetails', { state: { projectName, userName, userId, tenantId, accessToken } });  
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
      toast.success('Logout successfully!'); 
      navigate('/login'); 
    } catch (error) {  
      console.error('Error during logout:', error);  
    }  
  };   

  return (  
    <div className='createproject'>  
      <ToastContainer />  
      <Sidebar />  
      <div className='createproject-main'>  
        <div className='navbar'>  
          <div className='page-title'><h3>Create Project</h3></div>  
          <div className='navbar-placeholder'>  
            <form>  
              <label htmlFor="searchforresource" className='enterprojectname'></label>  
              <input type="text" id="searchforresource" name="userName" placeholder='Search for resource and projects' className='navbar-placeholder' />  
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
            Create Project
          </div>  
          <div className='innerdiv_form'>  
            <form onSubmit={handleSubmit}>  
              <label htmlFor="enterprojectname" className='enterprojectname'></label>  
              <input type="text" id="enterprojectname" name="enterprojectname" placeholder='Enter Project Name' className='center-placeholder custom-input-width' />  
              <div className='innerdiv_button'>  
                <button type="submit">Submit</button>  
              </div>  
            </form>  
          </div>  
          {showPopup && popupType === 'projectCreated' && (  
            <div className="createproject-popup">  
              <div className="popup-content">  
                <div className="section-content">  
                  <div className="success-icon"><img src={success_icon} alt="Icon" className="icon" height={30} width={30} /></div>  
                  <div className="confirmation-message-title">Project '{projectName}' created successfully.</div>  
                  <div className="confirmation">  
                    <div className="confirmation-message">Do you want to add application?</div>  
                    <div className="confirmation-buttons">  
                      <button className="confirmation-button active" id="yesButton" onClick={handleYesClick}>Yes</button>  
                      <button className="confirmation-button" id="noButton" onClick={handleNoClick}>No</button>  
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

export default Createproject;
