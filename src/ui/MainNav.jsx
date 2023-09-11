import { NavLink } from "react-router-dom"
import { styled } from "styled-components"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import HeaderMenu from "./HeaderMenu"

const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  background-color: var(--color-grey-back-900);
  padding: 2.4rem 1.6rem;
  position: absolute;
  top: 50px;
  z-index: 1000;
  border-radius: 10px;
  border: 1px solid var(--color-grey-font-900);
  width: 250px;
  right: 0;
`

const NavMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  list-style: none;
`

const NavItem = styled.li``

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--color-grey-font-900);

  &:active,
  &.active:link,
  &.active:visited {
    font-weight: 600;
  }
`

export default function MainNav({ setShowMenu }) {
  const username = useSelector((state) => state.user.username)

  const { t } = useTranslation()

  function closeMenu() {
    setShowMenu(false)
  }

  return (
    <StyledNav>
      <StyledNavLink to="/user" onClick={closeMenu}>
        <span>{`${t("main_nav.welcome")}, ${username}`}</span>
      </StyledNavLink>

      <NavMenu>
        <NavItem>
          <StyledNavLink to="/dashboard" onClick={closeMenu}>
            {t("main_nav.dashboard")}
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/transactions" onClick={closeMenu}>
            {t("main_nav.transactions")}
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/stats" onClick={closeMenu}>
            {t("main_nav.stats")}
          </StyledNavLink>
        </NavItem>
      </NavMenu>
      <HeaderMenu closeMenu={closeMenu} />
    </StyledNav>
  )
}
