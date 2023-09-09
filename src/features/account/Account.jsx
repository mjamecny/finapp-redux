import { useSelector } from "react-redux"
import { AiOutlineClose } from "react-icons/ai"
import styled, { css } from "styled-components"

import useFetchRate from "../../hooks/useFetchRate"
import useFetchBtcPrice from "../../hooks/useFetchBtcPrice"
import { getCurrency } from "../../utils/helpers"

import AccountIcon from "../../ui/AccountIcon"
import SpinnerMini from "../../ui/SpinnerMini"

const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 1rem;
  height: 12rem;
  background-color: #fdb600;
  color: #212529;
  border-radius: 2rem;
  position: relative;

  ${(props) =>
    props.type === "Bitcoin" &&
    css`
      background-color: #fdb600;
    `}

  ${(props) =>
    props.type === "Cash" &&
    css`
      background-color: #23c246;
    `}

  ${(props) =>
    props.type === "Bank" &&
    css`
      background-color: #f8fd00;
    `}

    .close-button {
    position: absolute;
    right: 10px;
    top: 7px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`

const CloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 7px;

  & svg {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
`

const StyledAmount = styled.p`
  font-size: 2rem;
`

export default function Account({ account }) {
  const currency = useSelector((state) => state.user.currency)
  const { type, balance } = account
  const { btcPrice, isLoading: isLoadingPrice } = useFetchBtcPrice()
  const { rate, isLoading: isLoadingRate } = useFetchRate()

  const btcConverted = btcPrice / rate

  return (
    <StyledAccount type={type}>
      <CloseButton>
        <AiOutlineClose />
      </CloseButton>
      <AccountIcon type={type} size="medium" />

      {isLoadingPrice || isLoadingRate ? (
        <SpinnerMini />
      ) : (
        <Amount
          accountType={type}
          userCurrency={currency}
          sum={balance}
          btcConverted={btcConverted}
        />
      )}

      {type === "Bitcoin" && <p>{balance.toFixed(5)}</p>}
    </StyledAccount>
  )
}

function Amount({ sum, accountType, userCurrency, btcConverted }) {
  const currencyLabel = getCurrency(userCurrency)

  if (accountType === "Bitcoin") {
    return (
      <StyledAmount>
        {`${Math.round(sum * btcConverted).toLocaleString(
          "cs-CZ"
        )} ${currencyLabel}`}
      </StyledAmount>
    )
  }

  return (
    <StyledAmount>
      {`${Math.round(sum).toLocaleString("cs-CZ")} ${currencyLabel}`}
    </StyledAmount>
  )
}
