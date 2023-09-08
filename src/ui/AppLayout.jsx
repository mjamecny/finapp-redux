import styled from "styled-components"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  gap: 1.8rem;
`

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Outlet />
      <Footer />
    </StyledAppLayout>
  )
}
