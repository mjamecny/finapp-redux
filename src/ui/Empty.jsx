import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import Button from "./Button"

const StyledEmpty = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  font-size: 2rem;
  color: #f8f9fa;
  flex: 1;
`

export default function Empty({ type, message, buttonLabel, path }) {
  const navigate = useNavigate()
  return (
    <StyledEmpty>
      {message}
      {type !== "page" && (
        <Button size="small" onClick={() => navigate(path)}>
          {buttonLabel}
        </Button>
      )}
    </StyledEmpty>
  )
}
