import { BrowserRouter, Route, Routes } from "react-router-dom"

import Welcome from "./pages/Welcome"
import GlobalStyles from "./styles/GlobalStyles"
import Dashboard from "./pages/Dashboard"
import AppLayout from "./ui/AppLayout"
import AddAccount from "./features/account/AddAccount"

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
            </Route>
            <Route index element={<Welcome />} />
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </>
  )
}
