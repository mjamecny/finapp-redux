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
  },
})

export const { addAccount } = accountSlice.actions
export default accountSlice.reducer
