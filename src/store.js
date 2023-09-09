import { configureStore } from "@reduxjs/toolkit"

import userReducer from "./features/user/userSlice"
import accountReducer from "./features/account/accountSlice"

const store = configureStore({
  reducer: { user: userReducer, account: accountReducer },
})

export default store
