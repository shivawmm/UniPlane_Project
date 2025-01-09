import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import logo from '../components/resources/uniPlane_logo.png';
import appcluster_icon from '../components/resources/appcluster_icon.png';
import managecloud_icon from '../components/resources/managecloud_icon.png';
import manageusers_icon from '../components/resources/manageusers_icon.png';
import manageclusters_icon from '../components/resources/manageclusters_icon.png';
import audittrail_icon from '../components/resources/audittrail_icon.png';
import profile_icon from '../components/resources/profile_icon.png';
import setting_icon from '../components/resources/setting_icon.png';
import alert_icon from '../components/resources/alert_icon.png';
import project_icon from '../components/resources/project_icon.png';
import dashboard_icon from '../components/resources/dashboard_icon.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  // const userName = location.state?.userName || 'User';
  const { userName, userId, tenantId, accessToken } = location.state || {}; 

  const handleNavigation = (path, state = {}) => {
    navigate(path, { state });
  };

  return (
    <div>
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="UniPlane Logo" className="sidebar-img-logo" />
        </div>
        <ul className="sidebar-nav">
          <li 
            className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => handleNavigation('/dashboard')}
          >
            <img src={dashboard_icon} alt="mc" className="icon" width={20} height={20} />
            &nbsp;Dashboard
          </li>
          <li 
            className={`nav-item ${location.pathname === '/app-cluster' ? 'active' : ''}`}
            onClick={() => handleNavigation('/app-cluster')}
          >
            <img src={appcluster_icon} alt="ac" className="icon" />
            &nbsp;App Cluster
          </li>
          <li 
            className={`nav-item ${location.pathname === '/manage-clouds' ? 'active' : ''}`}
            onClick={() => handleNavigation('/manage-clouds')}
          >
            <img src={managecloud_icon} alt="mc" className="icon" />
            &nbsp;Manage Clouds
          </li>
          <li 
            className={`nav-item ${location.pathname === '/manage-users' ? 'active' : ''}`}
            onClick={() => handleNavigation('/manage-users')}
          >
            <img src={manageusers_icon} alt="ac" className="icon" />
            &nbsp;Manage Users
          </li>
          <li 
            className={`nav-item ${location.pathname === '/manage-clusters' ? 'active' : ''}`}
            onClick={() => handleNavigation('/manage-clusters')}
          >
            <img src={manageclusters_icon} alt="mc" className="icon" />
            &nbsp;Manage Clusters
          </li>
          <li 
            className={`nav-item ${location.pathname === '/projectlist' ? 'active' : ''}`}
            onClick={() => handleNavigation('/projectlist', { userName, userId, tenantId, accessToken})}
          >
            <img src={project_icon} alt="mc" className="icon" width={20} height={20} />
            &nbsp;Projects
          </li>
          <li 
            className={`nav-item ${location.pathname === '/alerts' ? 'active' : ''}`}
            onClick={() => handleNavigation('/alerts')}
          >
            <img src={alert_icon} alt="mc" className="icon" width={20} height={20}/>
            &nbsp;Alerts
          </li>
          <li 
            className={`nav-item ${location.pathname === '/audit-trail' ? 'active' : ''}`}
            onClick={() => handleNavigation('/audit-trail')}
          >
            <img src={audittrail_icon} alt="mc" className="icon" />
            &nbsp;Audit Trail
          </li>
          <li 
            className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
            onClick={() => handleNavigation('/settings')}
          >
            <img src={setting_icon} alt="mc" className="icon" width={15} height={15} />
            &nbsp;Settings
          </li>
          <li 
            className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
            id='nav-item-end'
            onClick={() => handleNavigation('/profile')}
          >
            <img src={profile_icon} alt="mc" className="footer" width={15} height={15} />
            Acme Corp
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
