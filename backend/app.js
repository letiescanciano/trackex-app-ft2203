const express = require('express')
const app = express()

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const lodashId = require('lodash-id')

const adapter = new FileSync('db.json')
const db = low(adapter)
db._.mixin(lodashId)

// GET /transactions
app.get('/transactions', (req, res) => {
  const transactions = db.get('transactions').value()
  //   console.log('transactions', transactions)
  res.status(200).json(transactions)
})

app.get('/transactions/:id', (req, res) => {
  const id = req.params.id
  const transaction = db.get('transactions').getById(id).value()
  console.log('transaction', transaction)
  if (transaction) {
    res.status(200).json(transaction)
  } else {
    res.status(404).json({ message: 'Wrong id. Resource not found' })
  }
})
app.listen(3001, () => console.log('Server listening on port 3001'))
