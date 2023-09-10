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
    updateTransaction(state, action) {
      const { accountType, transactionId, updatedData } = action.payload

      const account = state.accounts.find(
        (account) => account.type === accountType
      )

      if (account) {
        const transaction = account.transactions.find(
          (transaction) => transaction.id === transactionId
        )

        if (transaction) {
          Object.assign(transaction, updatedData)
        }
      }
    },
  },
})

export const getTransactions = (state) =>
  state.account.accounts.reduce((allTransactions, account) => {
    allTransactions.push(...account.transactions)
    return allTransactions
  }, [])

export const getWithdrawalsPerYear = (state) => {
  const currentDate = new Date()
  const daysAgo = new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000)

  const transactions = getTransactions(state)

  return transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.created_at)
      return transactionDate >= daysAgo && transactionDate <= currentDate
    })
    .filter((transaction) => transaction.amount < 0)
}
export const getDepositsPerYear = (state) => {
  const currentDate = new Date()
  const daysAgo = new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000)

  const transactions = getTransactions(state)

  return transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.created_at)
      return transactionDate >= daysAgo && transactionDate <= currentDate
    })
    .filter((transaction) => transaction.amount > 0)
}

export const getRecentTransactions = (state, numDays) => {
  const currentDate = new Date()
  const daysAgo = new Date(
    currentDate.getTime() - numDays * 24 * 60 * 60 * 1000
  )

  const transactions = getTransactions(state)

  return transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.created_at)
      return transactionDate >= daysAgo && transactionDate <= currentDate
    })
    .filter((transaction) => transaction.amount < 0)
}

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
  updateTransaction,
} = accountSlice.actions
export default accountSlice.reducer
