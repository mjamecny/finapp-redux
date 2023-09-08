import styled from "styled-components"

import Logo from "../ui/Logo"

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

export default function Welcome() {
  return (
    <StyledWelcome>
      <Logo type="medium" />
      <ImageBox>
        <WelcomeImage src="./welcome_image.svg" alt="Person with graphs" />
      </ImageBox>
    </StyledWelcome>
  )
}
