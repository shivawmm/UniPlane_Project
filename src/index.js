// import React from 'react';
// import ReactDOM from 'react-dom'; // Correct import statement
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { UserProvider } from './UserContext';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();


// import React from 'react';
// import ReactDOM from 'react-dom'; // Correct import statement
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { UserProvider } from './UserContext';

// ReactDOM.render(
//   <React.StrictMode>
//     <UserProvider>
//       <App />
//     </UserProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './UserContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot in React 18

root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
