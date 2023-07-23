import React, { createContext, useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export function AuthProvider({ children }) {
  const [isS3, setIsS3] = useState(1);  // 1 means it is s3 and 0 means it is cloud
  const [user, setUser] = useState(null);
  const [orderlist, setOrderlist] = useState([]);

  useEffect(() =>{
    const data = JSON.parse(localStorage.getItem('User'));
    const time= JSON.parse(localStorage.getItem('Time'));
    const cart = JSON.parse(localStorage.getItem('Cart'));
    if(data!=null) {
      let dt=+new Date();
      if(time > dt-24*60*60*1000) {
        setUser(data);
      }
    }
  },[]);

  const navigate = useNavigate();

  const signout = function (){
     setUser(null);
     localStorage.removeItem('User');
     navigate('/');
  }

  const userset = function (data) {
       setUser(data);
  }

  return (
    <AuthContext.Provider
      value={{
        isS3,
        setIsS3,
        user,
        userset,
        signout,
        orderlist,
        setOrderlist,
      }}
    >
      {(
        children
      )}
    </AuthContext.Provider>
  );
}

export default useAuth;
