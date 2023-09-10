import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import Welcome from "./pages/Welcome"
import GlobalStyles from "./styles/GlobalStyles"
import Dashboard from "./pages/Dashboard"
import AppLayout from "./ui/AppLayout"
import AddAccount from "./features/account/AddAccount"
import AddTransaction from "./features/account/AddTransaction"
import TransactionDetail from "./pages/TransactionDetail"

import { DarkModeProvider } from "./context/DarkModeContext"

export default function App() {
  return (
    <>
      <DarkModeProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="account/add" element={<AddAccount />} />
              <Route path="transaction/add" element={<AddTransaction />} />
              <Route
                path="transaction/:transactionId"
                element={<TransactionDetail />}
              />
            </Route>
            <Route index element={<Welcome />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
            },
          }}
        />
      </DarkModeProvider>
    </>
  )
}
