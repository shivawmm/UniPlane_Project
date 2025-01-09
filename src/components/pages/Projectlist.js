import React, { useState, useEffect } from 'react';  
import '../../App.css';  
import Sidebar from '../Sidebar';  
import notification from '../resources/notification.png';  
import profile from '../resources/profile_header.png';  
import { useUser } from '../../UserContext';  
import { useLocation, useNavigate } from 'react-router-dom';  

const Projectlist = () => {  
  const { userName, setUserName } = useUser();   
  const location = useLocation();  
  const navigate = useNavigate();  
  const [projects, setProjects] = useState([]);  
  const accessToken = location.state?.accessToken;  
  const userId = location.state?.userId;
  const tenantId = location.state?.tenantId;
  const [loading] = useState(false);   
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);  

  useEffect(() => {  
    if (location.state && location.state.userName) {  
      setUserName(location.state.userName);  
    }  

    const fetchProjects = async () => {  
      if (!accessToken) {  
        console.error('No access token available');  
        return; 
      }  
      try {  
        const response = await fetch(  
          `${process.env.REACT_APP_API_BASE_URL}projects/list`,  
          {  
            headers: {  
              'Authorization': `Bearer ${accessToken}`,  
              'Content-Type': 'application/json',  
            }  
          }  
        );  
        if (!response.ok) {  
          throw new Error(`HTTP error! status: ${response.status}`); 
        }  
        const data = await response.json();  
        setProjects(data);  
      } catch (error) {  
        console.error('Error fetching projects:', error);  
      }  
    };  

    fetchProjects();  
  }, [location.state, setUserName, accessToken]);  

  const handleCreateProject = () => {  
    navigate('/createproject', { state: { userName, accessToken, userId, tenantId } });  
  };  

  const handleProjectClick = (projectId, projectName) => {  
    navigate('/projectdetails', { state: { projectId, projectName, userName, accessToken, userId, tenantId } });  
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
      <div className='createproject-main' id='projectlist-main'>  
        <div className='navbar'>  
          <div className='page-title'><h3>Project List</h3></div>  
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

      <div className='innerdiv1-projectlist'>  
        <div className='projectlist'>  
          <div className='projectlist_button'>  
            <button onClick={handleCreateProject} className='projectlist_createproject_button'>Create Project</button>  
          </div>  
          <div className='innerdiv_title-projectlist'>  
            <h2>List of Projects</h2>  
          </div>  
          <div className='projectlist_list'>  
            {projects.map((project) => (  
              <div   
                key={project.projectId}   
                className='project-item'   
                onClick={() => handleProjectClick(project.projectId, project.projectName)} // Pass projectName  
              >  
                <p>{project.projectName}</p>  
              </div>  
            ))}  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default Projectlist;