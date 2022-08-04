import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth';
import { NavBar } from '../NavBar';
import { TransactionList } from '../TransactionList';
import { Login } from '../Auth/Login';
export const AppRoutes = () => {
  const { auth } = useContext(AuthContext);
  console.log('auth', auth);
  if (auth) {
    //we have a logged in user
    return (
      <div className="layout">
        <NavBar />
        <main style={{ width: '100%' }}>
          <TransactionList />
        </main>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  );
};
