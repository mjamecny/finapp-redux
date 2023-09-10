import styled, { css } from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"

import { convertToDDMMYYYY, getCurrency } from "../../utils/helpers"
import ActionButton from "../../ui/ActionButton"

import AccountIcon from "../../ui/AccountIcon"
import { removeTransaction } from "./accountSlice"

const StyledTransaction = styled.div`
  color: var(--color-grey-font-900);
  border: 1px solid var(--color-grey-font-900);
  font-size: 1.4rem;
  padding: 0.8rem 0.6rem;
  border-radius: 7px;
`

const Price = styled.p`
  font-size: 1.2rem;
  font-weight: 600;

  ${(props) =>
    props.type === "withdraw" &&
    css`
      color: red;
    `}
  ${(props) =>
    props.type === "deposit" &&
    css`
      color: green;
    `}
`

const TransactionRowHorizontal = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const TransactionRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  gap: 0.4rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: var(--color-grey-font-900);
`

const ActionButtonContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`

const CreatedAt = styled.p`
  font-size: 1rem;
  color: #868e96;
`

export default function Transaction({ transaction }) {
  const currency = useSelector((state) => state.user.currency)
  const currencyLabel = getCurrency(currency)
  const { accountType, description, amount, id, created_at } = transaction
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleRemove() {
    dispatch(removeTransaction(id))
    toast.success("Transaction removed")
  }

  return (
    <StyledTransaction>
      <TransactionRowHorizontal>
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
          <AccountIcon type={accountType} size="small" colored={true} />
          <TransactionRowVertical>
            <StyledLink to={`/transaction/${id}`}>{description}</StyledLink>
            <CreatedAt>
              {created_at === new Date()
                ? "Today"
                : convertToDDMMYYYY(created_at)}
            </CreatedAt>
          </TransactionRowVertical>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.8rem",
            marginLeft: "auto",
            alignItems: "center",
          }}
        >
          {amount < 0 ? (
            <Price type="withdraw">
              {accountType === "Bitcoin"
                ? amount
                : `${amount} ${currencyLabel}`}
            </Price>
          ) : (
            <Price type="deposit">
              {accountType === "Bitcoin"
                ? amount
                : `${amount} ${currencyLabel}`}
            </Price>
          )}

          <ActionButtonContainer>
            <>
              <ActionButton type="edit" size="small" />
              <ActionButton type="delete" size="small" onClick={handleRemove} />
            </>
          </ActionButtonContainer>
        </div>
      </TransactionRowHorizontal>
    </StyledTransaction>
  )
}
