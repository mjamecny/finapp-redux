import { BrowserRouter, Route, Routes } from "react-router-dom"

import Welcome from "./pages/Welcome"
import GlobalStyles from "./styles/GlobalStyles"
import Dashboard from "./pages/Dashboard"

export default function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
