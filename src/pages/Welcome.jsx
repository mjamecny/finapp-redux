import styled from "styled-components"
import { useTranslation } from "react-i18next"

import Logo from "../ui/Logo"
import Heading from "../ui/Heading"
import Locale from "../ui/Locale"
import UserForm from "../features/user/userForm"

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

const LocaleContainer = styled.div`
  display: flex;
  justify-content: center;
`

export default function Welcome() {
  const { t } = useTranslation()

  return (
    <StyledWelcome>
      <Logo type="medium" />
      <ImageBox>
        <WelcomeImage src="./welcome_image.svg" alt="Person with graphs" />
      </ImageBox>
      <TextBox>
        <Heading as="h1">{t("welcome.heading")}</Heading>
        <Info>{t("welcome.info")}</Info>
      </TextBox>
      <UserForm />
      <LocaleContainer>
        <Locale type="welcome" />
      </LocaleContainer>
    </StyledWelcome>
  )
}
