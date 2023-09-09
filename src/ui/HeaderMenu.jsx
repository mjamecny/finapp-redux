import { styled } from "styled-components"

import Locale from "./Locale"
import DarkModeToggle from "./DarkModeToggle"

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  list-style: none;
`

export default function HeaderMenu({ closeMenu }) {
  return (
    <StyledHeaderMenu>
      <li onClick={() => closeMenu()}>
        <DarkModeToggle />
      </li>
      <li onClick={() => closeMenu()}>
        <Locale />
      </li>
    </StyledHeaderMenu>
  )
}
