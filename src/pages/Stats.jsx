import { styled } from "styled-components"

import RecentSpending from "../features/account/RecentSpending"
import WithDepoGraph from "../features/account/WithDepoGraph"

const StyledStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export default function Stats() {
  return (
    <StyledStats>
      <WithDepoGraph />
      <RecentSpending />
    </StyledStats>
  )
}
