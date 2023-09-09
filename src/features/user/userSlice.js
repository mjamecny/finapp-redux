import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  username: "",
  currency: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setUserCurrency: (state, action) => {
      state.currency = action.payload
    },
  },
})

export const { setUsername, setUserCurrency } = userSlice.actions

export default userSlice.reducer
