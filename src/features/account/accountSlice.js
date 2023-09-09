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
  },
})

export const getTransactions = (state) =>
  state.account.accounts.reduce((allTransactions, account) => {
    allTransactions.push(...account.transactions)
    return allTransactions
  }, [])

export const { addAccount, addTransaction, setAccounts, removeAccount } =
  accountSlice.actions
export default accountSlice.reducer
