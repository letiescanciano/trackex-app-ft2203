import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import data from './data';

import { Formik, Form } from 'formik';

import TextField from '@mui/material/TextField';
import * as Yup from 'yup';

import { DebugFormik } from '../aux/DebugFormik';
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

const FormWrapper = styled.div`
  padding: 16px;
  width: 380px;
  height: 100vh;
  overflow: scroll;
  background-color: white;
  color: black;
`;

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const ActionsWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
`;

const transactionSchema = Yup.object().shape({
  name: Yup.string()
    .required('This is a required field')
    .min('4', 'Name should have at least 4 characters'),
  date: Yup.string().min('10').max('10').required('This is a required field'),
  amount: Yup.number().required('This is a required field'),
});
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
        <FormWrapper>
          <h1> New transaction</h1>
          <Formik
            initialValues={{ name: '', date: '', amount: 0 }}
            validationSchema={transactionSchema}
            onSubmit={values => {
              console.log('formik values', values);
              setIsOpenDrawer(false);
            }}
          >
            {({ values, handleChange, touched, errors, isValid }) => (
              <>
                <Form>
                  <FieldsWrapper>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      error={Boolean(errors.date)}
                      helperText={errors.date}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Amount"
                      type="number"
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      error={Boolean(errors.amount)}
                      helperText={errors.amount}
                    />
                  </FieldsWrapper>
                  <ActionsWrapper>
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
                      type="submit"
                      variant="contained"
                      disabled={!isValid}
                    >
                      Save
                    </Button>
                  </ActionsWrapper>
                </Form>
                <DebugFormik />
              </>
            )}
          </Formik>
        </FormWrapper>
      </Drawer>
    </>
  );
};
