import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  accounts: [],
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccounts(state, action) {
      state.accounts = action.payload
    },
    addAccount(state, action) {
      state.accounts.push(action.payload)
    },
    removeAccount(state, action) {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload
      )
    },
    addTransaction(state, action) {
      const account = state.accounts.find(
        (account) => account.type === action.payload.accountType
      )
      account.balance += action.payload.amount
      account.transactions.push(action.payload)
    },
    removeTransaction(state, action) {
      state.accounts.forEach((account) => {
        account.transactions = account.transactions.filter(
          (transaction) => transaction.id !== action.payload
        )
      })
    },
  },
})

export const getTransactions = (state) =>
  state.account.accounts.reduce((allTransactions, account) => {
    allTransactions.push(...account.transactions)
    return allTransactions
  }, [])

export const getTransaction = (state, id) => {
  let foundTransaction = null
  state.account.accounts.forEach((account) => {
    const transaction = account.transactions.find(
      (transaction) => transaction.id === id
    )
    if (transaction) {
      foundTransaction = transaction
    }
  })
  return foundTransaction
}

export const {
  addAccount,
  addTransaction,
  setAccounts,
  removeAccount,
  removeTransaction,
} = accountSlice.actions
export default accountSlice.reducer
