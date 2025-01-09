// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../../App.css';
// import Sidebar from '../Sidebar';
// import notification from '../resources/notification.png';
// import profile from '../resources/profile_header.png';
// import { useLocation, useNavigate } from 'react-router-dom';
// import success_icon from '../resources/success-icon.png';

// const Addresources = () => {
//   const [cloudProviders, setCloudProviders] = useState([]); 
//   const [resourceTypes, setResourceTypes] = useState([]);
//   const [templates, setTemplates] = useState([]);
//   const [resources, setResources] = useState([]);
//   const [resourceName, setResourceName] = useState('');
//   const [selectedResourceType, setSelectedResourceType] = useState('');
//   const [selectedTemplate, setSelectedTemplate] = useState('');
//   const [popupType, setPopupType] = useState(''); 
//   const [showPopup, setShowPopup] = useState(false); 
//   const navigate = useNavigate(); 
//   const location = useLocation();
//   const userName = location.state?.userName || 'User';
//   const projectName = location.state?.projectName || 'Project';

//   useEffect(() => {
//     const fetchResourceTypes = async () => {
//       try {
//         const response = await fetch(
//           'http://uniplane-stag-api-env.eba-r5pf4ea8.ap-south-1.elasticbeanstalk.com:8080/api/resourcetypes/list'
//         );
//         const data = await response.json();
//         setResourceTypes(data);
//       } catch (error) {
//         console.error('Error fetching resource types:', error);
//       }
//     };

//     fetchResourceTypes();
//   }, []);

//   const handleResourceTypeChange = async (event) => {
//     const resourceTypeId = event.target.value;
//     setSelectedResourceType(resourceTypeId);
//     if (resourceTypeId) {
//       try {
//         const response = await fetch(
//           `http://uniplane-stag-api-env.eba-r5pf4ea8.ap-south-1.elasticbeanstalk.com:8080/api/resourcetemplates/list`
//         );
//         const data = await response.json();
//         const filteredTemplates = data.filter(template => template.resourceTypeId === parseInt(resourceTypeId));
//         setTemplates(filteredTemplates);
//       } catch (error) {
//         console.error('Error fetching templates:', error);
//       }
//     } else {
//       setTemplates([]);
//     }
//   };

//   useEffect(() => {
//     if (location.state && location.state.showPopup) {
//       setPopupType(location.state.showPopup);
//       setShowPopup(true);
//     }
//   }, [location.state]);

//   const handleYesClick = () => {
//     navigate('/createapp', { state: { projectName, userName } }); 
//   };
  
//   const handleClosePopup = () => {
//     navigate('/projectdetails', { state: { projectName, userName } }); 
//     setShowPopup(false);
//   };

//   const handleResourceNameChange = (event) => {
//     setResourceName(event.target.value);
//   };

//   const handleTemplateChange = (event) => {
//     setSelectedTemplate(event.target.value);
//   };

//   // const handleCloudChange = (event) => {
//   //   const selectedCloud = event.target.value;
//   //   console.log('Selected Cloud:', selectedCloud);
//   // };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const requestBody = {
//       projectId: 1,
//       resourceName,
//       userId: 1,
//       templateId: parseInt(selectedTemplate)
//     };

//     try {
//       const response = await fetch(
//         'http://uniplane-stag-api-env.eba-r5pf4ea8.ap-south-1.elasticbeanstalk.com:8080/api/resources/create',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(requestBody)
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setResources([...resources, {
//           id: data.resourceId,
//           resourceType: resourceTypes.find(type => type.resourceTypeId === parseInt(selectedResourceType))?.resourceTypeDesc,
//           resourceName: data.resourceName,
//           template: templates.find(template => template.templateId === parseInt(selectedTemplate))?.templateDesc,
//           status: data.status,
//           addedOn: new Date(data.createdOn).toISOString().split('T')[0]
//         }]);
//         toast.success('Resource added successfully');
//       } else {
//         console.error('Failed to add resource');
//         toast.error('Failed to add resource');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Error adding resource');
//     }
//   };

//   const handleSave = () => {
//     setPopupType('resourceadded');
//     setShowPopup(true);
//     // toast.success('Resource saved successfully');
//   };

//   const handleDelete = async (resourceId) => {
//     try {
//       const response = await fetch(
//         `http://uniplane-stag-api-env.eba-r5pf4ea8.ap-south-1.elasticbeanstalk.com:8080/api/resources/${resourceId}`,
//         {
//           method: 'DELETE'
//         }
//       );

//       if (response.ok) {
//         setResources(resources.filter(resource => resource.id !== resourceId));
//         toast.success('Resource deleted successfully');
//       } else {
//         console.error('Failed to delete resource');
//         toast.error('Failed to delete resource');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Error deleting resource');
//     }
//   };

//   const fetchCloudProviders = async () => {
//     try {
//       const response = await fetch(
//         'http://uniplane-stag-api-env.eba-r5pf4ea8.ap-south-1.elasticbeanstalk.com:8080/api/cloudprovider/list'
//       );
//       const data = await response.json();
//       setCloudProviders(data); // Set the fetched cloud providers in the state
//     } catch (error) {
//       console.error('Error fetching cloud providers:', error);
//     }
//   };
  
//   useEffect(() => {
//     fetchCloudProviders();
//   }, []);

//   // const [selectedCloudProvider, setSelectedCloudProvider] = useState('');
//   const [selectedCloudProvider, setSelectedCloudProvider] = useState('');

//   const handleCloudChange = (event) => {
//     const selectedCloud = event.target.value;
//     setSelectedCloudProvider(selectedCloud);
//     console.log('Selected Cloud:', selectedCloud);
//   };
  

  

//   return (
//     <div className='addresources'>
//       <Sidebar />
//       <div className='addresources-main'>
//         <ToastContainer />
//         <div className='navbar'>
//           <div className='page-title' id='page-title-addresources'>
//             <h3>{projectName}</h3>
//           </div>
//           <div className='navbar-placeholder'>
//             <form>
//               <label htmlFor="searchforresource" className='enterprojectname'></label>
//               <input
//                 type="text"
//                 id="searchforresource"
//                 name="username"
//                 placeholder='Search for resource and projects'
//                 className='navbar-placeholder'
//               />
//             </form>
//           </div>
//           <div className='navbar-icon'>
//             <img
//               src={notification}
//               alt="Navbar notification"
//               className="navbar_notification"
//             />
//           </div>
//           <div className='navbar-identity'>
//             <img src={profile} alt="Identity Dropdown" className="profile" />
//             <div className='name'>{userName}</div>
//           </div>
//         </div>

//         <div className={`addresources_container ${showPopup ? 'overlay' : ''}`}>
//           <h1 className='addresource_innerdiv_heading'>Add Resource</h1>
//           <div className='addresources_container_forms'>
//             <div className="form-group">
//               <label htmlFor="resource-name">Resource Name:</label>
//               <input
//                 type="text"
//                 id="resource-name"
//                 placeholder="Resource Name"
//                 value={resourceName}
//                 onChange={handleResourceNameChange}
//               />
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="cloud">Select Cloud:</label>
//               <select id="cloud" onChange={handleCloudChange}>
//                 <option value="">Select Cloud</option>
//                 {cloudProviders.map((provider) => (
//                   <option key={provider.cloudProviderId} value={provider.cloudProviderName}>
//                     {provider.cloudProviderName}
//                   </option>
//                 ))}
//               </select>
//             </div>

            
//             <div className="form-group">
//               <label htmlFor="resource-type">Resource Type:</label>
//               <select id="resource-type" onChange={handleResourceTypeChange}>
//                 <option value="">Select Resource Type</option>
//                 {resourceTypes.map((type) => (
//                   <option key={type.resourceTypeId} value={type.resourceTypeId}>
//                     {type.resourceTypeDesc}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="template">Select Template:</label>
//               <select id="template" onChange={handleTemplateChange}>
//                 <option value="">Select Template</option>
//                 {templates.map((template) => (
//                   <option key={template.templateId} value={template.templateId}>
//                     {template.templateDesc}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className='addresources_container_button1'>
//             <button type="button" onClick={handleSubmit}>Add</button>
//             <button type="button" onClick={handleSave}>Save</button>
//           </div>

//           <div className="container table-container">
//             <table>
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Resource Type</th>
//                   <th>Resource Name</th>
//                   <th>Template</th>
//                   <th>Status</th>
//                   <th>Added On</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {resources.map((resource, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{resource.resourceType}</td>
//                     <td>{resource.resourceName}</td>
//                     <td>{resource.template}</td>
//                     <td>{resource.status}</td>
//                     <td>{resource.addedOn}</td>
//                     <td>
//                       <div className="action-buttons">
//                         <button className="edit-button">Edit</button>
//                         <button className="delete-button" onClick={() => handleDelete(resource.id)}>Delete</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {showPopup && popupType === 'resourceadded' && (
//             <div className="addresources-popup">
//               <div className="popup-content">
//                 <div className="section-content">
//                   <div className="success-icon"><img src={success_icon} alt="Icon" className="icon" height={30} width={30} /></div>
//                   <div className="confirmation-message-title">Resource saved successfully.</div>
//                   <div className="confirmation">
//                     <div className="confirmation-message">Do you want to add apps to it?</div>
//                     <div className="confirmation-buttons">
//                       <button className="confirmation-button active" id="yesButton" onClick={handleYesClick}>Yes</button>
//                       <button className="confirmation-button" id="noButton" onClick={handleClosePopup}>No</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//       </div>
//     </div>
//   );
// };

// export default Addresources;











        //   <div className='projectdetails_first'>
        //     <div className='projectdetails_header'>
        //       <div className='projectdetails_heading'>
        //         <h1>Resources</h1>
        //       </div>
        //       <div className='projectdetails_button'>
        //         <button type='button' id='addresourcesbutton'>+ Add Resources</button>
        //       </div>
        //     </div>
        //     <div className='projectdetails_first_body'>
        //       <div className='pdfb1'>
        //         <h2>Resources in 'Project Name'</h2>
        //       </div>
        //       <div className='pdfb2'>
        //         <div className='pdfb2_icon'>
        //           <img src={resource1} alt="Identity Dropdown" className="resource" />
        //           <span>Resource 1</span>
        //         </div>
        //         <div className='pdfb2_icon'>
        //           <img src={resource2} alt="Identity Dropdown" className="resource" />
        //           <span>Resource 2</span>
        //         </div>
        //         <div className='pdfb2_icon'>
        //           <img src={resource3} alt="Identity Dropdown" className="resource" />
        //           <span>Resource 3</span>
        //         </div>
        //         <div className='pdfb2_icon'>
        //           <img src={resource4} alt="Identity Dropdown" className="resource" />
        //           <span>Resource 4</span>
        //         </div>
        //         <div className='pdfb2_icon'>
        //           <img src={resource5} alt="Identity Dropdown" className="resource" />
        //           <span>Resource 5</span>
        //         </div>
        //       </div>    
        //     </div> 
        //   </div> 