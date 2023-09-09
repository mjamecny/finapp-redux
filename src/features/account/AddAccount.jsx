import { useState } from "react"
import styled from "styled-components"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Select from "../../ui/Select"
import Input from "../../ui/Input"
import Button from "../../ui/Button"

import useAccountCategories from "../../hooks/useAccountCategories"

const StyledAddAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
`

export default function AddAccount() {
  const [accountType, setAccountType] = useState("Bank")
  const [initialBalance, setInitialBalance] = useState("")

  const accountCategories = useAccountCategories()

  function handleSubmit(e) {
    e.preventDefault()
    if (!initialBalance) return
    console.log("account")
  }
  return (
    <StyledAddAccount>
      <Form onSubmit={handleSubmit}>
        <FormRow label="Account">
          <Select
            options={accountCategories}
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          />
        </FormRow>
        <FormRow label="Initial balance">
          <Input
            id="initialBalance"
            type="number"
            step="any"
            value={initialBalance}
            required
            onChange={(e) => setInitialBalance(e.target.value)}
          />
        </FormRow>
        <Button size="small">Add account</Button>
      </Form>
    </StyledAddAccount>
  )
}
