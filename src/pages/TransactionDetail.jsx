import styled, { css } from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import { convertToDDMonthTime, getCurrency } from "../utils/helpers"
import useCategories from "../hooks/useCategories"
import {
  getTransaction,
  removeTransaction,
} from "../features/account/accountSlice"

import Heading from "../ui/Heading"
import AccountIcon from "../ui/AccountIcon"
import ActionButton from "../ui/ActionButton"
import CategoryIcon from "../ui/CategoryIcon"
import ButtonBack from "../ui/ButtonBack"
import toast from "react-hot-toast"

const StyledTransactionDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
`

const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--color-grey-font-900);
  border-radius: 7px;
  padding: 1.2rem 1.6rem;
`

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  margin-top: 2.4rem;
`

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const DetailLabel = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
`

const DetailInfo = styled.p`
  font-size: 1.4rem;
`

const Amount = styled.p`
  font-size: 2.4rem;
  font-weight: 600;
  margin-top: 0.8rem;
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

const Description = styled.p`
  font-size: 2rem;
`

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.2rem 1.6rem;
`

export default function TransactionDetail() {
  const { transactionId } = useParams()
  const transaction = useSelector((state) =>
    getTransaction(state, transactionId)
  )

  const currency = useSelector((state) => state.user.currency)
  const currencyLabel = getCurrency(currency)

  const { t } = useTranslation()
  const categories = useCategories()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    amount,
    accountType,
    description,
    created_at,
    category: categoryName,
    id,
    to,
  } = transaction

  function handleRemove() {
    dispatch(removeTransaction(id))
    toast.success(t("delete_transaction.delete_toast"))
    navigate("/dashboard")
  }

  return (
    <StyledTransactionDetail>
      <Heading as="h2">{t("transaction_details.header")}</Heading>
      <DetailsBox>
        <AccountIcon type={accountType} size="big" colored={true} />
        {amount < 0 ? (
          <Amount type="withdraw">
            {accountType === "Bitcoin"
              ? Math.abs(amount)
              : `${Math.abs(amount)} ${currencyLabel}`}
          </Amount>
        ) : (
          <Amount type="deposit">
            {accountType === "Bitcoin" ? amount : `${amount} ${currencyLabel}`}
          </Amount>
        )}

        <Description>{description}</Description>

        <DetailsContainer>
          <DetailContainer>
            <DetailLabel>{t("transaction_details.created_label")}</DetailLabel>
            <DetailInfo>{convertToDDMonthTime(created_at)}</DetailInfo>
          </DetailContainer>
          <DetailContainer>
            <DetailLabel>{t("transaction_details.category_label")}</DetailLabel>
            <DetailInfo>
              <span style={{ display: "flex", gap: "0.4rem" }}>
                <CategoryIcon category={categoryName} />
                <span>
                  {categories.map((category, i) => {
                    if (category.value === categoryName) {
                      return category.label
                    }
                  })}
                </span>
              </span>
            </DetailInfo>
          </DetailContainer>
          <DetailContainer>
            <DetailLabel>{t("transaction_details.to_label")}</DetailLabel>
            <DetailInfo>{to}</DetailInfo>
          </DetailContainer>
        </DetailsContainer>
        <ActionContainer>
          <ActionButton type="edit" size="medium" />
          <ActionButton type="delete" size="medium" onClick={handleRemove} />
        </ActionContainer>
      </DetailsBox>
      <ButtonBack />
    </StyledTransactionDetail>
  )
}
