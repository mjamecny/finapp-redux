import { useSelector } from "react-redux"
import styled from "styled-components"

import Button from "../ui/Button"
import Heading from "../ui/Heading"
import Form from "../ui/Form"

const StyledExport = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  background-color: var(--color-grey-back-900);
  height: 100vh;
`
export default function UserAccount() {
  const user = useSelector((state) => state.user)
  const accounts = useSelector((state) => state.account.accounts)

  function handleExport(e) {
    e.preventDefault()
    const data = { username: user.username, currency: user.currency, accounts }
    const jsonData = JSON.stringify(data)
    const blob = new Blob([jsonData], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "data.json"
    link.click()
  }

  return (
    <StyledExport>
      <Heading as="h2">Export data</Heading>
      <Form onSubmit={handleExport}>
        <Button size="small">Export</Button>
      </Form>
    </StyledExport>
  )
}
