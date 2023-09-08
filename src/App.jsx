import { BrowserRouter, Route, Routes } from "react-router-dom"

import Welcome from "./pages/Welcome"
import GlobalStyles from "./styles/GlobalStyles"

export default function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
