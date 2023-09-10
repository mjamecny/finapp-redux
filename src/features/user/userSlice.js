import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  username: JSON.parse(localStorage.getItem("username")) || "",
  currency: JSON.parse(localStorage.getItem("currency")) || "",
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

export const saveUsernameToLocalStorage = (state) => (next) => (action) => {
  const result = next(action)

  const username = state.getState().user.username
  localStorage.setItem("username", JSON.stringify(username))

  return result
}

export const saveCurrencyToLocalStorage = (state) => (next) => (action) => {
  const result = next(action)

  const currency = state.getState().user.currency
  localStorage.setItem("currency", JSON.stringify(currency))

  return result
}

export const { setUsername, setUserCurrency } = userSlice.actions

export default userSlice.reducer
