import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';
import Sidebar from '../Sidebar';
import notification from '../resources/notification.png';
import profile from '../resources/profile_header.png';
import { useLocation, useNavigate } from 'react-router-dom';
import success_icon from '../resources/success-icon.png';
import edit from '../resources/edit.png';
import deleteicon from '../resources/delete.png';
import { useUser } from '../../UserContext';  

const Addresourceinstance = () => {
  const [resourceInstanceTypes, setResourceInstanceTypes] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [resources, setResources] = useState([]);
  const [resourceInstanceName, setResourceInstanceName] = useState('');
  const [selectedResourceInstanceType, setSelectedResourceInstanceType] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [version, setVersion] = useState(''); 
  const [codePath, setCodePath] = useState(''); 
  const [popupType, setPopupType] = useState(''); 
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate(); 
  const location = useLocation();
  const userName = location.state?.userName || 'User';
  const projectName = location.state?.projectName || 'Project';
  const appId = location.state?.appId;
  const accessToken = location.state?.accessToken;
  const appName = location.state?.appName;
  const userId = location.state?.userId;
  const tenantId = location.state?.tenantId;
  const {setUserName } = useUser();  
  const [loading] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [resourceHeading, setResourceHeading] = useState('Add Resource Instance');
  // const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  useEffect(() => {
    const fetchResourceInstanceTypes = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}resourcetypes/list`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        const data = await response.json();
        setResourceInstanceTypes(Array.isArray(data) ? data : []); 
      } catch (error) {
        console.error('Error fetching resource types:', error);
        setResourceInstanceTypes([]);
      }
    };
  
    const fetchTemplates = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}resourcetemplates/list`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        const data = await response.json();
        setTemplates(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching templates:', error);
        setTemplates([]);
      }
    };
  
    fetchResourceInstanceTypes();
    fetchTemplates();
  }, [accessToken]);
  

  useEffect(() => {
    if (location.state && location.state.showPopup) {
      setPopupType(location.state.showPopup);
      setShowPopup(true);
    }
  }, [location.state]);

  const handleYesClick = () => {
    setResourceInstanceName('');
    setSelectedResourceInstanceType('');
    setSelectedTemplate('');
    setVersion('');
    setCodePath('');
    setShowPopup(false);
  };
  
  const handleNoClick = () => {
    navigate('/appdetails', { state: {appName, projectName, userName, appId, accessToken, userId, tenantId } }); 
    setShowPopup(false);
  };

  const handleResourceInstanceNameChange = (event) => {
    setResourceInstanceName(event.target.value);
  };

  const handleResourceInstanceTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedResourceInstanceType(selectedType);

    // Show additional fields if "EC2" is selected
    // setShowAdditionalFields(selectedType === 'Storage');
    const selectedTypeText = event.target.options[event.target.selectedIndex].text;
    setResourceHeading(`${selectedTypeText} Resource Instance`);
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const handleVersionChange = (event) => {
    setVersion(event.target.value);
  };

  const handleCodePathChange = (event) => {
    setCodePath(event.target.value);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
  
    const requestBody = {
      resourceInstanceName,
      templateId: parseInt(selectedTemplate),
      appId: appId,
    };
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}resourceinstances/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        const selectedResourceType = document.getElementById('resource-type').selectedOptions[0].text;
        setResources([...resources, {
          id: data.resourceInstanceId,
          resourceInstanceType: selectedResourceType,
          resourceInstanceName: data.resourceInstanceName,
          template: templates.find(template => template.templateId === parseInt(selectedTemplate))?.templateDesc,
          status: data.status,
          addedOn: new Date(data.createdOn).toISOString().split('T')[0],
        }]);
        toast.success('Resource Instance added successfully');
  
        setPopupType('resourceadded');
        setShowPopup(true);
      } else {
        console.error('Failed to add Resource Instance');
        toast.error('Failed to add Resource Instance');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error adding Resource Instance');
    }
  };

  const handleDelete = async (resourceInstanceId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}resourceinstances/${resourceInstanceId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
  
      if (response.ok) {
        const newResources = resources.filter(resource => resource.id !== resourceInstanceId);
        setResources(newResources); // Update the resources state correctly
        toast.success('Resource Instance deleted successfully');
      } else {
        console.error('Failed to delete Resource Instance');
        toast.error('Failed to delete Resource Instance');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error deleting Resource Instance');
    }
  };

  const handleEdit = async ({ resourceInstanceId, resourceInstanceName, version, templateId }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}resourceinstances/${resourceInstanceId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resourceInstanceId,
            resourceInstanceName,
            version,
            templateId,
          }),
        }
      );
  
      if (response.ok) {
        const updatedResource = await response.json(); // Assuming the API returns the updated resource
        const updatedResources = resources.map((resource) =>
          resource.id === resourceInstanceId ? updatedResource : resource
        );
        setResources(updatedResources); // Update the resources state correctly
        toast.success('Resource Instance updated successfully');
      } else {
        console.error('Failed to update Resource Instance');
        toast.error('Failed to update Resource Instance');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error updating Resource Instance');
    }
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
    <div className='addresources'>
      <Sidebar />
      <div className='addresources-main'>
        <ToastContainer />
        <div className='navbar'>
          <div className='page-title' id='page-title-addresources'>
            <h3>{projectName}</h3>
          </div>
          <div className='navbar-placeholder'>
            <form>
              <label htmlFor="searchforresource" className='enterprojectname'></label>
              <input
                type="text"
                id="searchforresource"
                name="username"
                placeholder='Search for resource and projects'
                className='navbar-placeholder'
              />
            </form>
          </div>
          <div className='navbar-icon'>
            <img
              src={notification}
              alt="Navbar notification"
              className="navbar_notification"
            />
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

        <div className={`addresources_container ${showPopup ? 'overlay' : ''}`}>
          <div className='addresourceinstance_innerdiv_heading'>{resourceHeading}</div>
          <div className='addresources_container_forms'>
            <div className="form-group">
              <label htmlFor="resource-name" id='resourceinstancename-label'>Resource Instance Name</label>
              <input
                type="text"
                id="resource-name"
                placeholder="Resource Instance Name"
                value={resourceInstanceName}
                onChange={handleResourceInstanceNameChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="resource-type" id='resourcetype-label'>Resource Type</label>
              <select id="resource-type" onChange={handleResourceInstanceTypeChange} value={selectedResourceInstanceType}>
                <option value="">Select Resource Type</option>
                {resourceInstanceTypes.map((type) => (
                  <option key={type.resourceInstanceTypeId} value={type.resourceInstanceTypeId}>
                    {type.resourceTypeDesc}
                  </option>
                ))}
              </select>
            </div>
            {/* EC2 */}
            {selectedResourceInstanceType === 'Compute Engine' && (
              <>
                <div className="form-group">
                  <label htmlFor="region" id='region-label'>Region</label>
                  <input
                    type="text"
                    id="region"
                    placeholder="Select Region"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="instancetype" id='instancetype-label'>Instance Type</label>
                  <input
                    type="text"
                    id="instancetype"
                    placeholder="Select Instance Type"
                  />
                </div>
              </>
            )}
            {/* RDS */}
            {selectedResourceInstanceType === 'Relational Database' && (
              <>
                <div className="form-group">
                  <label htmlFor="dbname" id='dbname-label'>DB Name</label>
                  <input
                    type="text"
                    id="dbname"
                    placeholder="DB Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="engine" id='engine-label'>Engine</label>
                  <input
                    type="text"
                    id="engine"
                    placeholder="Engine"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="engineversion" id='engineversion-label'>Engine Version</label>
                  <input
                    type="text"
                    id="engineversion"
                    placeholder="Engine Version"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="instanceclass" id='instanceclass-label'>Instance Class</label>
                  <input
                    type="text"
                    id="instanceclass"
                    placeholder="Instance Class"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username" id='username-label'>Username</label>
                  <input 
                    type="text"
                    id="username"
                    placeholder="Username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="region" id='region-label'>Region</label>
                  <input
                    type="text"
                    id="region"
                    placeholder="Region"
                  />
                </div>

                <div id='password-secret-div'><h4 id='password-secret'>Password Secret ref</h4></div>
                <div id='password-secret-div'></div>
                <div className="form-group">
                  <label htmlFor="key" id='key-label'>Key</label>
                  <input
                    type="text"
                    id="key"
                    placeholder="Key"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name" id='ari-name'>Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                  />
                </div>
              </>
            )}

            {selectedResourceInstanceType !== 'Relational Database' && (
              <>
                <div className="form-group">
                  <label htmlFor="version" id='version-label'>Version</label>
                  <input
                    type="text"
                    id="version"
                    placeholder="Select Version"
                    value={version}
                    onChange={handleVersionChange}
                  />
                </div>
            
                <div className="form-group">
                  <label htmlFor="template" id='selecttemplate'>Template</label>
                  <select id="template" onChange={handleTemplateChange} value={selectedTemplate}>
                    <option value="">Select Template</option>
                    {templates.map((template) => (
                      <option key={template.templateId} value={template.templateId}>
                        {template.templateDesc}
                      </option>
                    ))}
                  </select>
                </div>
                  
                <div className="form-group">
                  <label htmlFor="codepath" id='codepath-label'>Code Path</label>
                  <input
                    type="text"
                    id="codepath"
                    placeholder="Enter Code Path"
                    value={codePath}
                    onChange={handleCodePathChange}
                  />
                </div>
                <div></div>
              </>
            )}

            <div className='addresources_container_button1'>
              <button type="button" className='addbutton-addresourceinstance' onClick={handleAdd}>Save</button>
            </div>
          </div>

          <div className="resource-table" id='resource-table'>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Resource Type</th>
                  <th>Resource Instance Name</th>
                  <th>Template</th>
                  <th>Status</th>
                  <th>Added On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource, index) => (
                  <tr key={resource.id}>
                    <td>{index + 1}</td>
                    <td>{resource.resourceInstanceType}</td>
                    <td>{resource.resourceInstanceName}</td>
                    <td>{resource.template}</td>
                    <td>{resource.status}</td>
                    <td>{resource.addedOn}</td>
                    <td>
                      <div className="action-buttons">
                        <img src={edit} alt="Edit" className="edit-icon" onClick={() => handleEdit(resource.id)} />
                        <img src={deleteicon} alt="Delete" className="delete-icon" onClick={() => handleDelete(resource.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showPopup && (
          <div className='addresources-popup'>
            <img src={success_icon} alt='Success Icon' className='popup-success-icon' width={25} height={25}/>
            <h3>Resource Instance Added Successfully.</h3>
            <h5>Do you want to add more Resource Instances?</h5>
            <div className='popup-buttons'>
              <button type='button' className='addresourceinstance-popupbutton' onClick={handleYesClick}>Yes</button>
              <button type='button' className='addresourceinstance-popupnobutton' onClick={handleNoClick}>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Addresourceinstance;

















