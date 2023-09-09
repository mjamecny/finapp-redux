import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  accounts: [],
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addAccount(state, action) {
      state.accounts.push(action.payload)
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

export const { addAccount, addTransaction } = accountSlice.actions
export default accountSlice.reducer
