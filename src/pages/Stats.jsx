import { styled } from "styled-components"

import RecentSpending from "../features/account/RecentSpending"

const StyledStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export default function Stats() {
  return (
    <StyledStats>
      <RecentSpending />
    </StyledStats>
  )
}
