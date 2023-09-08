import { BrowserRouter, Route, Routes } from "react-router-dom"

import Welcome from "./pages/Welcome"
import GlobalStyles from "./styles/GlobalStyles"
import Dashboard from "./pages/Dashboard"
import AppLayout from "./ui/AppLayout"

export default function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route index element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
