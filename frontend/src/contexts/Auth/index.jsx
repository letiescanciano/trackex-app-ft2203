import { createContext, useState } from 'react';
import firebase from './firebaseConfig';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  const login = async values => {
    console.log('login', values);
    try {
      const { user } = await firebase.login(values.email, values.password);

      user.getIdToken().then(token => {
        localStorage.setItem('token', token);
      });
      setAuth(user);
      navigate('/transactions');
    } catch (e) {
      console.log('login error', e);
    }
  };
  const logout = async () => {
    try {
      await firebase.logout();
      setAuth(null);
      localStorage.removeItem('token');
      navigate('/');
    } catch (e) {
      console.log('login error', e);
    }
  };

  const signup = async values => {
    console.log('values', values);
    try {
      const { user } = await firebase.signup(values.email, values.password);
      user.getIdToken().then(token => {
        localStorage.setItem('token', token);
      });
      setAuth(user);
      navigate('/transactions');
    } catch (e) {
      console.log('signup error', e);
    }
  };
  return (
    <AuthContext.Provider value={{ auth, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
