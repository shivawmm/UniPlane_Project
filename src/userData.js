// src/userData.js
let userData = {
    email: '',
  };
  
  export const setUserData = (data) => {
    userData = { ...userData, ...data };
  };
  
  export const getUserData = () => userData;
  