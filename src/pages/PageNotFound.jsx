import { useTranslation } from "react-i18next"
import styled from "styled-components"

import ButtonBack from "../ui/ButtonBack"

const StyledPageNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  height: 100vh;
  font-size: 3.6rem;
  color: #f8f9fa;
`

export default function PageNotFound() {
  const { t } = useTranslation()

  return (
    <StyledPageNotFound>
      <p>{t("notfound.message")}</p>
      <ButtonBack />
    </StyledPageNotFound>
  )
}
