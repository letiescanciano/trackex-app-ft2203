import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import data from './data';

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

const AmountCell = styled.td`
  padding: 8px 0;
  color: ${props => (props.type === 'income' ? '#00E4C6' : '#FF7661')};
`;

export const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  useEffect(() => {
    setTransactions(data);
  }, []);
  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          console.log('onclick');
          setIsOpenDrawer(true);
        }}
      >
        + Add transaction
      </Button>
      <Table>
        <thead>
          <tr>
            <THeadCell>Date</THeadCell>
            <THeadCell>Name</THeadCell>
            <THeadCell>Category</THeadCell>
            <THeadCell>Amount</THeadCell>
            <THeadCell>Type</THeadCell>
            <THeadCell></THeadCell>
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
                <Td>
                  <EditIcon
                    onClick={() => {
                      console.log('edit transaction', transaction.id);
                    }}
                  />
                  <DeleteForeverIcon
                    style={{ color: '#FF7661' }}
                    onClick={() => {
                      console.log('delete transaction', transaction.id);
                    }}
                  ></DeleteForeverIcon>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Drawer
        anchor="right"
        open={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
      >
        <h1> New transaction</h1>
        <Button
          variant="outlined"
          onClick={() => {
            console.log('onclick');
            setIsOpenDrawer(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            console.log('onclick');
            setIsOpenDrawer(false);
          }}
        >
          Save
        </Button>
      </Drawer>
    </>
  );
};
