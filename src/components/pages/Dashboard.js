import React, {useEffect } from 'react';
import '../../App.css';
import Sidebar from '../Sidebar';
import notification from '../resources/notification.png';
import profile from '../resources/profile_header.png';
import { useUser } from '../../UserContext';
import { useLocation } from 'react-router-dom';

const Createproject = () => {

    const { userName, setUserName } = useUser(); 
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.userName) {
          setUserName(location.state.userName);
        }
      }, [location.state, setUserName]);

  return (
    <div className='createproject'>
      <Sidebar />
      <div className='createproject-main'>
        <div className='navbar'>
          <div className='page-title'><h3>Dashboard</h3></div>
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
            <div className='name'>{userName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createproject;