import styled from "styled-components"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import { Select } from "../../ui/Select"

import useAccountCategories from "../../hooks/useAccountCategories"

const StyledAddAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
`

export default function AddAccount() {
  const accountCategories = useAccountCategories()
  return (
    <StyledAddAccount>
      <Form>
        <FormRow label="Account">
          <Select options={accountCategories} />
        </FormRow>
      </Form>
    </StyledAddAccount>
  )
}
