import styled from "styled-components"
import { useSelector } from "react-redux"

import useFetchRate from "../../hooks/useFetchRate"
import useFetchBtcPrice from "../../hooks/useFetchBtcPrice"
import { getCurrency } from "../../utils/helpers"

import SpinnerMini from "../../ui/SpinnerMini"

const StyledTotalAmount = styled.p`
  font-size: 3.6rem;
  font-weight: 600;
  color: var(--color-grey-font-900);
  text-align: center;
`

export default function TotalAmount() {
  const currency = useSelector((state) => state.user.currency)
  const accounts = useSelector((state) => state.account.accounts)
  const { btcPrice, isLoading: isLoadingPrice } = useFetchBtcPrice()
  const { rate, isLoading: isLoadingRate } = useFetchRate()

  const currencyLabel = getCurrency(currency)

  const btcConverted = btcPrice / rate

  const balancesSum = accounts?.reduce(
    (sum, account) =>
      account.type === "Bitcoin"
        ? sum + account.balance * btcConverted
        : sum + account.balance,
    0
  )

  return (
    <StyledTotalAmount>
      {isLoadingPrice || isLoadingRate ? (
        <SpinnerMini />
      ) : (
        `${Math.round(balancesSum).toLocaleString("cs-CZ")} ${currencyLabel}`
      )}
    </StyledTotalAmount>
  )
}
