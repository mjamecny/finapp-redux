import { configureStore } from "@reduxjs/toolkit"

import userReducer from "./features/user/userSlice"
import accountReducer from "./features/account/accountSlice"

import { saveAccountsToLocalStorage } from "./features/account/accountSlice"
import {
  saveUsernameToLocalStorage,
  saveCurrencyToLocalStorage,
} from "./features/user/userSlice"

const store = configureStore({
  reducer: { user: userReducer, account: accountReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(saveAccountsToLocalStorage)
      .concat(saveUsernameToLocalStorage)
      .concat(saveCurrencyToLocalStorage),
})

export default store
