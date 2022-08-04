import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { transactionsAPI } from '../../services/transactions';

import { v4 as uuidv4 } from 'uuid';

import { TransactionDrawer } from '../Drawer';

const Table = styled.table`
  text-align: left;
  padding: 32px;
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

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
// mode can be add or edit

export const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [mode, setMode] = useState('add');
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [search, setSearch] = useState('');

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const { data, status } = await transactionsAPI.all();
        if (status === 200) {
          setTransactions(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTransactions();
  }, []);

  // Using then/catch
  // transactionsAPI
  //   .all()
  //   .then(response => {
  //     const { data, status } = response;
  //     if (status === 200) {
  //       setTransactions(data);
  //     }
  //   })
  //   .catch(e => console.log(e));

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const addTransaction = async values => {
    // console.log('addTransactionvalues', values);
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
      name: values.name,
      date: values.date,
      amount: values.amount,
      category: values.category,
      type: values.type,
    };

    // setTransactions([...transactions, newTransaction]);

    try {
      const { data, status } = await transactionsAPI.create(newTransaction);

      if (status === 200) {
        setTransactions([...transactions, data]);
      }
    } catch (e) {
      console.log('add transaction error', e);
    }
  };

  const handleEdit = transaction => {
    // console.log('handleEdit transaction', transaction);
    setMode('edit');
    setIsOpenDrawer(true);
    setSelectedTransaction(transaction);
  };

  const editTransaction = async values => {
    // console.log('edit transaction', values);

    try {
      const { data, status } = await transactionsAPI.update(values);

      if (status === 200) {
        // 1. Find the transaction in the transactions array. findIndex
        const transactionIndex = transactions.findIndex(
          transaction => transaction.id === selectedTransaction.id
        );
        // console.log('transactionIndex', transactionIndex);

        // 2. We need to make a copy of our state
        const _transactions = [...transactions];
        // console.log('_transactions ', _transactions);

        // 3. Replace the transaction that we updated
        _transactions[transactionIndex] = data;
        // console.log('_transactions with updated element', _transactions);
        // 4. Update our state
        setTransactions(_transactions);
      }
    } catch (e) {
      console.log('edit transaction error', e);
    }
  };

  const handleDelete = id => {
    // console.log('id', id);
    // console.log('transactions', transactions);
    // we need to find the transaction that we need to delete on transactions

    // we open the dialog
    setIsDeleteDialogOpen(true);

    // we set the selected transaction to the one that we want to delete.

    setSelectedTransaction({ id });
  };

  const handleCloseDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTransaction({});
  };

  const deleteTransaction = async () => {
    try {
      console.log('selectedTransaction.id', selectedTransaction.id);
      const response = await transactionsAPI.delete(selectedTransaction.id);
      console.log('response', response);
      if (response.status === 200) {
        const _transactions = transactions.filter(
          tr => tr.id !== selectedTransaction.id
        );
        // console.log('del', _transactions);
        setTransactions(_transactions);
        handleCloseDialog();
      }
    } catch (e) {
      console.log('delete transaction error', e);
    }
  };

  useEffect(() => {
    const _transactions = transactions.filter(transaction =>
      transaction.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTransactions(_transactions);
  }, [search]);

  return (
    <>
      <ActionsWrapper>
        <FormControl variant="standard">
          <Input
            style={{ color: 'white' }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon style={{ color: 'white' }} />
              </InputAdornment>
            }
            onChange={e => {
              // console.log(e.target.value);
              setSearch(e.target.value);
            }}
            placeholder="Search something..."
          />
        </FormControl>
        <Button
          variant="contained"
          onClick={() => {
            setMode('add');
            setIsOpenDrawer(true);
          }}
        >
          + Add transaction
        </Button>
      </ActionsWrapper>
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
          {filteredTransactions.map(transaction => {
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
                  <EditIcon onClick={() => handleEdit(transaction)} />
                  <DeleteForeverIcon
                    style={{ color: '#FF7661' }}
                    onClick={() => handleDelete(transaction.id)}
                  ></DeleteForeverIcon>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <TransactionDrawer
        open={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        mode={mode}
        selectedTransaction={selectedTransaction}
        addTransaction={addTransaction}
        editTransaction={editTransaction}
      />
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          Are you sure you want to delete this transaction?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you delete it you won't be able to recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={deleteTransaction}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};;;
