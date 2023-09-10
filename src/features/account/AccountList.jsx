import styled from "styled-components"
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa6"
import { useTranslation } from "react-i18next"

import Account from "./Account"
import Empty from "../../ui/Empty"
import Heading from "../../ui/Heading"

const StyledAccounts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

const AccountsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;

  & svg {
    width: 2rem;
    height: 2rem;
  }
`
const ActionButton = styled(Link)`
  color: var(--color-grey-font-900);
`

export default function AccountList({ accounts }) {
  const { t } = useTranslation()
  if (!accounts.length)
    return (
      <Empty
        message={t("empty.accounts")}
        buttonLabel={t("empty.add_account")}
        path="/account/add"
      />
    )

  return (
    <StyledAccounts>
      <Header>
        <Heading as="h2">{t("account_list.header")}</Heading>
        <ActionButtonsContainer>
          {accounts.length < 3 && (
            <ActionButton to="/account/add">
              <FaPlus />
            </ActionButton>
          )}
        </ActionButtonsContainer>
      </Header>
      <AccountsContainer>
        {accounts?.map((account) => (
          <Account key={account.id} account={account} />
        ))}
      </AccountsContainer>
    </StyledAccounts>
  )
}
