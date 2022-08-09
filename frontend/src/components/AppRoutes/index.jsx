import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth';
import { NavBar } from '../NavBar';
import { TransactionList } from '../TransactionList';
import { Login } from '../Auth/Login';
import { Signup } from '../Auth/Signup';

export const AppRoutes = () => {
  const { auth } = useContext(AuthContext);
  console.log('auth', auth);
  if (auth) {
    //we have a logged in user
    return (
      <div className="layout">
        <NavBar />
        <main style={{ width: '100%' }}>
          <Routes>
            <Route path="transactions" element={<TransactionList />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
};
