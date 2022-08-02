const express = require('express')
const app = express()
const cors = require('cors')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const lodashId = require('lodash-id')

const adapter = new FileSync('db.json')
const db = low(adapter)
db._.mixin(lodashId)

app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))
// GET /transactions
app.get('/transactions', (req, res) => {
  const transactions = db.get('transactions').value()
  //   console.log('transactions', transactions)
  res
    .status(200)
    .json(
      transactions.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
    )
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

app.post('/transactions', (req, res) => {
  const { name, amount, date, category, type } = req.body

  const createdTransaction = db
    .get('transactions')
    .insert({
      name,
      amount,
      date,
      category,
      type,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .write()
  res.status(200).json(createdTransaction)
})

app.put('/transactions/:id', (req, res) => {
  const { id } = req.params
  const { name, amount, date, category, type } = req.body

  const updatedTransaction = db
    .get('transactions')
    .updateById(id, {
      name,
      amount,
      date,
      category,
      type,
      updated_at: new Date(),
    })
    .write()
  console.log('updated transaction', updatedTransaction)

  if (updatedTransaction) {
    res.status(200).json(updatedTransaction)
  } else {
    res.status(400).json({ message: 'Wrong id, try again' })
  }
})

app.delete('/transactions/:id', (req, res) => {
  const { id } = req.params

  const deletedTransaction = db.get('transactions').removeById(id).write()

  console.log('deledtedTransaction', deletedTransaction)
  if (deletedTransaction) {
    res.status(200)
  } else {
    res.status(400).json({ message: 'Wrong id, try again' })
  }
})

app.listen(3001, () => console.log('Server listening on port 3001'))
