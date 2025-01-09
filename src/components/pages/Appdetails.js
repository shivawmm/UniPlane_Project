import React, { useState, useEffect } from 'react';
import '../../App.css';
import Sidebar from '../Sidebar';
import notification from '../resources/notification.png';
import profile from '../resources/profile_header.png';
import aws_icon from '../resources/aws_icon.png';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../UserContext'; 

const Appdetails = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [resourceInstances, setResourceInstances] = useState([]); 
  const location = useLocation();
  const userName = location.state?.userName || 'User';
  const projectName = location.state?.projectName || 'Project Name';
  const appId = location.state?.appId;
  const accessToken = location.state?.accessToken;
  const userId = location.state?.userId;
  const tenantId = location.state?.tenantId;
  const appName = location.state?.appName || 'App';
  const {setUserName } = useUser();  
  const [loading] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const navigate = useNavigate();
  const [selectedResource, setSelectedResource] = useState(null);
  useEffect(() => {
    const fetchResourceInstances = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}resourceinstances/list/${appId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}` 
          }
        });
        const instances = response.data;
        setResourceInstances(instances); 

        // Set the first resource instance as the default selected resource
        if (instances.length > 0) {
          setSelectedResource(instances[0]);
        }
      } catch (error) {
        console.error("Error fetching resource instances:", error);
      }
    };
    fetchResourceInstances();
  }, [appId, accessToken]);

  const handleAttachClick = () => {
    navigate('/attachresourceinstance', { state: { appName, projectName, userName, appId, accessToken, userId, tenantId } });
  };

  const handleManageResource = () => {
    navigate('/manageresourceinstance', { state: { appName, projectName, userName, appId, accessToken, userId, tenantId } });
  }

  const handleDetachClick = () => {
    setPopupType('detachResource');
    setShowPopup(true);
  };

  const handleAddResourceInstanceClick = () => {
    navigate('/addresourceinstance', { state: { appName, projectName, userName, appId, accessToken, userId, tenantId } });
  };

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDetachResourceClick = () => {
    console.log("Detaching Resource...");
    setShowPopup(false);
  };

  // const handleAddResourceInstance = () => {
  //   console.log("Adding ResourceInstance...");
  //   setShowPopup(false);
  // };

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
    <div className='appdetails'>
      <Sidebar />
      <div className='appdetails-main'>
        <div className='navbar' id='appdetails-main-navbar'>
          <div className='page-title' id='appdetails-main-title'><h3>{projectName}</h3></div>
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

        <div className={`appdetails_container ${showPopup ? 'overlay' : ''}`}>
          <div className='appdetails_first'>
            <div className='appdetails_header'>
              <div className='appdetails_heading'>
                <div className='appdetails_heading_custom'>App: {appName}</div>
              </div>
              <div className='appdetails_button'>
                <button type='button' onClick={handleAddResourceInstanceClick}>+ Add Resource Instance</button>
                <button type='button' onClick={handleAttachClick}>+ Attach Resource Instance</button>
              </div>
            </div>
            <div className='appdetails_first_body'>
              <div className='adfb1'>
                Resource Instances in {appName}
              </div>
              <div className='adfb2'>
                {resourceInstances.length > 0 ? (
                  resourceInstances.map((instance, index) => (
                    <div key={index} className='adfb2_icon' onClick={() => handleResourceClick(instance)}>
                      {instance.icon ? (
                        <img src={instance.icon} alt="Resource Icon" className="resource" />
                      ) : (
                        <span className='resource' id='resource_id'>Icon</span>
                      )}
                      <span id='instance_name'>{instance.resourceInstanceName}</span>
                    </div>
                  ))
                ) : (
                  <div className='resourceinstance_empty'>No resource instance available.</div>
                )}
              </div>
            </div>
          </div>

          <div className='appdetails_second'>
            <div className='appdetails_second_header'>
              <div>
                {selectedResource?.resourceInstanceName || 'Resource Instance Name'}
              </div>
              <button type='button' className='detachfromapp_button' onClick={handleDetachClick}>Detach From App</button>
            </div>
            <div className='appdetails_second_body'>
              {/* <div className='adsb1'>
                <div className='adsb1_sub'>
                  <div className='sub1'>
                    Primary App
                  </div>
                  <div className='sub2'>
                    ClearPath
                  </div>
                </div>
                <div className='adsb1_sub'>
                  <div className='sub1'>
                    Created By
                  </div>
                  <div className='sub2'>
                    Danielle Campbell
                  </div>
                </div>
                <div className='adsb1_sub'>
                  <div className='sub1'>
                    Linked apps
                  </div>
                  <div className='sub2'>
                    Synapse
                  </div>
                  <div className='sub2'>
                    RRP
                  </div>
                </div>
                <div className='adsb1_sub'>
                  <div className='sub1'>
                    Cloud
                  </div>
                  <div className='sub2'>
                    <img src={aws_icon} alt="Icon" className="icon" height={30} width={30}/>
                  </div>
                </div>
                <div className='adsb1_sub'>
                  <div className='sub1'>
                    Created on
                  </div>
                  <div className='sub2'>
                    22/02/2024 08:54pm
                  </div>
                </div>
                <div className='adsb1_sub'>
                  <div className='sub1'>
                    Version Number
                  </div>
                  <div className='sub2'>
                    2.1.17
                  </div>
                </div>
                <div className='adsb1_sub'>
                  <div className='sub1'>
                    Deployment Status
                  </div>
                  <div className='sub2'>
                    Healthy
                  </div>
                </div>
                <div className='adsb1_sub'>
                  <div className='sub1'>
                    Deployed Since
                  </div>
                  <div className='sub2'>
                    02/12/2024 05:55pm
                  </div>
                </div>
              </div> */}

<div className='adsb1'>
                {selectedResource ? (
                  <>
                    <div className='adsb1_sub'>
                      <div className='sub1'>Primary App</div>
                      <div className='sub2'>{appName}</div>
                    </div>
                    <div className='adsb1_sub'>
                      <div className='sub1'>Created By</div>
                      <div className='sub2'>{userName}</div>
                    </div>
                    <div className='adsb1_sub'>
                      <div className='sub1'>Linked Apps</div>
                      <div className='sub2'>{appName}</div>
                    </div>
                    <div className='adsb1_sub'>
                      <div className='sub1'>Cloud</div>
                      <div className='sub2'>
                        <img src={aws_icon} alt="Icon" className="icon" height={30} width={30} />
                      </div>
                    </div>
                    <div className='adsb1_sub'>
                      <div className='sub1'>Created on</div>
                      <div className='sub2'>22/02/2024 08:54pm</div>
                    </div>
                    <div className='adsb1_sub'>
                      <div className='sub1'>Version Number</div>
                      <div className='sub2'>2.1.17</div>
                    </div>
                    <div className='adsb1_sub'>
                      <div className='sub1'>Deployment Status</div>
                      <div className='sub2'>Healthy</div>
                    </div>
                    <div className='adsb1_sub'>
                      <div className='sub1'>Deployed Since</div>
                      <div className='sub2'>02/12/2024 05:55pm</div>
                    </div>
                  </>
                ) : (
                  <div>Select a resource instance to see details.</div>
                )}
              </div>

              <div className='adsb2'>
                <button type='button' onClick={handleManageResource}>Manage Resource Instance</button>
              </div>
            </div>
          </div> 
        </div> 


        {showPopup && (
          <div className="appdetails-popup">
            <div className="popup-content">
              <div className="section-content">

                {popupType === 'detachResource' && (
                  <>
                    <div className="confirmation-message-title">Detach from App</div>
                    <div className="confirmation-message-title">This action will permanently remove this resource instance from the app.</div>
                    
                    <div className='confirmation'>
                    <div className="confirmation-message">Do you want to proceed?</div>
                    <div className="confirmation-buttons">
                      <button className="confirmation-button active" id="yesButton" onClick={handleDetachResourceClick}>Yes</button>
                      <button className="confirmation-button" id="noButton" onClick={handleClosePopup}>No</button>
                    </div>

                    </div>
                  </>
                )}

                {/* {popupType === 'addResourceInstance' && (
                  <>
                    <div className="confirmation-message-title">Resource Instances attached.</div>
                    <div className='confirmation'>
                    <div className="confirmation-message">Do you want to attach?</div>
                    <div className="confirmation-buttons">
                      <button className="confirmation-button active" id="yesButton" onClick={handleAddResourceInstance}>Yes</button>
                      <button className="confirmation-button" id="noButton" onClick={handleClosePopup}>No</button>
                    </div>
                    </div>
                  </>
                )} */}
            </div>
            </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Appdetails;
