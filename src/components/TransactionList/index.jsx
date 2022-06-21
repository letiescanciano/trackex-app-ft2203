import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Button from '@mui/material/Button';
import data from './data';

import { v4 as uuidv4 } from 'uuid';

import { AddTransactionDrawer } from '../Drawer';

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

  const addTransaction = values => {
    console.log('addTransactionvalues', values);
    //Don't do this. We shouldn't update the state directly
    //transactions.push(values);

    //Instead we should use setTransacions to update it.
    // Option 1
    // const _transactions = [...transactions];
    // _transactions.push(values);
    // setTransactions(_transactions);
    // Option 2
    // setTransactions([...transactions, values]);

    //Option 3
    const newTransaction = {
      id: uuidv4(),
      name: values.name,
      date: values.date,
      amount: values.amount,
      category: values.category,
      type: values.type,
    };

    setTransactions([...transactions, newTransaction]);
  };

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
              <tr key={transaction.id}>
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
      <AddTransactionDrawer
        open={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        addTransaction={addTransaction}
      />
    </>
  );
};
