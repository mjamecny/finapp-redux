import styled from "styled-components"

import Form from "../../ui/Form"
import { Select } from "../../ui/Select"

const StyledAddAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
`

export default function AddAccount() {
  return (
    <StyledAddAccount>
      <Form></Form>
    </StyledAddAccount>
  )
}
