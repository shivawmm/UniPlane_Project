import React from 'react';
import '../../App.css';
import Sidebar from '../Sidebar';
import notification from '../resources/notification.png';
import dropdown from '../resources/down-arrow.png';
import profile from '../resources/profile_header.png'
// import { useLocation } from 'react-router-dom';
import { useUser } from '../../UserContext';


const Deployresources = () => {

  const { userName } = useUser();

  return (
    <div className='deployresources'>
      <Sidebar />
      <div className='deployresources-main'>
        <div className='navbar'>
          <div className='page-title'>
            <h3>App Cluster</h3>
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
            <div className='name'>{userName}</div>
            <img src={dropdown} alt="Identity Dropdown" className="dropdown" />
          </div>
        </div>

        <div class="deployresources_container">
          <div class="deployresources_header">
            <div className='deployresource_heading'>
              <h1>Deploy Resources</h1>
            </div>
            <div className='deployresource_button'>
              <button type="button">Deploy Resources</button>
            </div>
          </div>
          <div class="form-group">
            <label for="resource-type" className='cloud-type'>Cloud Type:</label>
            <select id="resource-type">
              <option value="">Select Cloud</option>
              <option value="Type 1">Amazon Web Services</option>
              <option value="Type 2">Google Cloud</option>
            </select>
          </div>
          <div className='dr_span'>
            <span>Select the resources that you wanted to deploy</span>
          </div>

          <div className='dr_table'>
            <table>
              <tr class="table">
                <th>S.No</th>
                <th>Cloud</th>
                <th>Resource Type</th>
                <th>Resource Name</th>
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
                <td></td>
                <td><input type="checkbox"  /></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deployresources;

