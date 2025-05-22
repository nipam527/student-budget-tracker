// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App.jsx';
// import './index.css';

// export const AuthContext = React.createContext();

// function Main() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setUser({ token });
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </AuthContext.Provider>
//   );
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Main />
//   </React.StrictMode>,
// );


import React, { useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

export const AuthContext = createContext();

function Main() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user from localStorage", error);
      setAuthError("Invalid session");
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthError(null);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser: login, logout, isLoading, authError }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
