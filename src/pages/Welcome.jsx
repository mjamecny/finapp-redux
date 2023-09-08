import styled from "styled-components"

const StyledWelcome = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 1.8rem;
  height: 100vh;
  gap: 2rem;
`

export default function Welcome() {
  return <StyledWelcome>Welcome</StyledWelcome>
}
