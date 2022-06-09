import React, { useEffect, useState } from 'react';

import { Logo } from './Logo';
import './App.css';
import data from './data';

import styled from 'styled-components';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SideNavBar = styled.div`
  width: 250px;
  padding: 16px;
`;

const LogoTitle = styled.h1`
  margin-left: 8px;
  color: #ff7661;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

//     color: ${props => {
//   console.log('props', props);
//   if (props.isActive === true) {
//     return '#FF7661';
//   } else {
//     return 'white';
//   }
// }};
const ListItem = styled.li`
  padding: 16px 32px;
  a {
    color: ${props => (props.isActive ? '#FF7661' : 'white')};
    font-weight: ${props => (props.isActive ? '500' : '200')};
    text-decoration: none;
  }
`;

const Table = styled.table`
  width: 80%;
  text-align: left;
  padding: 64px;
`;

const THeadCell = styled.th`
  padding: 16px 0;
`;

const Td = styled.td`
  padding: 8px 0;
`;

// color: ${props => {
//   console.log('props', props);
//   if (props.type === 'income') {
//     return 'green';
//   }
//   return 'white';
// }};

const AmountCell = styled.td`
  padding: 8px 0;
  color: ${props => (props.type === 'income' ? '#00E4C6' : '#FF7661')};
`;
function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(data);
  }, []);

  return (
    <div className="layout">
      <SideNavBar>
        <LogoWrapper>
          <Logo></Logo>
          <LogoTitle>TrackEx</LogoTitle>
        </LogoWrapper>
        <nav>
          <List>
            <ListItem>
              <a href="/">Dashboard</a>
            </ListItem>
            <ListItem>
              <a href="/">Calendar</a>
            </ListItem>
            <ListItem isActive={true}>
              <a href="/">Transactions</a>
            </ListItem>
            <ListItem>
              <a href="/">Settings</a>
            </ListItem>
          </List>
        </nav>
      </SideNavBar>
      <main style={{ width: '100%' }}>
        <Table>
          <thead>
            <tr>
              <THeadCell>Date</THeadCell>
              <THeadCell>Name</THeadCell>
              <THeadCell>Category</THeadCell>
              <THeadCell>Amount</THeadCell>
              <THeadCell>Type</THeadCell>
              <THeadCell>Actions</THeadCell>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr>
                  <Td>{transaction.date}</Td>
                  <Td>{transaction.name}</Td>
                  <Td>{transaction.category}</Td>
                  <AmountCell type={transaction.type}>
                    {transaction.amount}
                  </AmountCell>
                  <Td>{transaction.type}</Td>
                  <Td>Edit/Delete</Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </main>
    </div>
  );
}

export default App;
