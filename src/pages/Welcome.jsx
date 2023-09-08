import styled from "styled-components"

import Logo from "../ui/Logo"
import Heading from "../ui/Heading"

const StyledWelcome = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 1.8rem;
  height: 100vh;
  gap: 2rem;
`

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
`

const WelcomeImage = styled.img`
  width: 60%;
`

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 2rem;
  gap: 1.2rem;
`

const Info = styled.p`
  font-size: 1.8rem;
  color: #868e96;
`

export default function Welcome() {
  return (
    <StyledWelcome>
      <Logo type="medium" />
      <ImageBox>
        <WelcomeImage src="./welcome_image.svg" alt="Person with graphs" />
      </ImageBox>
      <TextBox>
        <Heading as="h1">Easy way to manage your transactions</Heading>
        <Info>
          Track your financial transactions for three different accounts.
        </Info>
      </TextBox>
    </StyledWelcome>
  )
}
