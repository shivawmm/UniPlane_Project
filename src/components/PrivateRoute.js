// // src/components/PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const isAuthenticated = localStorage.getItem('authToken') !== null;

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
//     />
//   );
// };

// export default PrivateRoute;


// src/components/PrivateRoute.js















// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const PrivateRoute = () => {
//   const isAuthenticated = localStorage.getItem('authToken') !== null;

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;
