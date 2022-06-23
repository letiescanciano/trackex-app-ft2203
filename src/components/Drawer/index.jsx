import React from 'react';

import styled from 'styled-components';

import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';

import { Formik, Form } from 'formik';

import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { DebugFormik } from '../aux/DebugFormik';

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
export const TransactionDrawer = ({
  open,
  onClose,
  addTransaction,
  mode,
  selectedTransaction,
  editTransaction,
}) => {
  console.log('TransactionDrawer props');
  console.log('mode', mode);
  console.log('selectedTransaction', selectedTransaction);

  const categories = [
    { label: 'Eating out', value: 'eating_out' },
    {
      label: 'Clothes',
      value: 'clothes',
    },
    {
      label: 'Electronics',
      value: 'electronics',
    },
    {
      label: 'Groceries',
      value: 'groceries',
    },
    {
      label: 'Salary',
      value: 'salary',
    },
  ];

  const types = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ];

  const initialValues =
    mode === 'add'
      ? {
          name: '',
          date: '',
          amount: 0,
          category: 'eating_out',
          type: 'expense',
        }
      : selectedTransaction;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <FormWrapper>
        <h1> {mode === 'add' ? 'New' : 'Edit'} transaction</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={transactionSchema}
          onSubmit={values => {
            console.log('formik values', values);
            mode === 'add' ? addTransaction(values) : editTransaction(values);
            onClose();
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
                <div>
                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <RadioGroup
                      aria-labelledby="category"
                      name="category"
                      defaultValue="eating_out"
                      value={values.category}
                      onChange={handleChange}
                    >
                      {categories.map(category => {
                        return (
                          <FormControlLabel
                            key={category.value}
                            value={category.value}
                            label={category.label}
                            control={<Radio />}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Type</FormLabel>
                    <RadioGroup
                      aria-labelledby="type"
                      name="type"
                      defaultValue="expense"
                      value={values.type}
                      onChange={handleChange}
                    >
                      {types.map(type => {
                        return (
                          <FormControlLabel
                            key={type.value}
                            value={type.value}
                            label={type.label}
                            control={<Radio />}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </div>
                <ActionsWrapper>
                  <Button variant="outlined" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" disabled={!isValid}>
                    {mode === 'add' ? 'Create' : 'Update'}
                  </Button>
                </ActionsWrapper>
              </Form>
              <DebugFormik />
            </>
          )}
        </Formik>
      </FormWrapper>
    </Drawer>
  );
};
