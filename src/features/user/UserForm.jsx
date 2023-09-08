import { useState } from "react"

import Form from "../../ui/Form"
import Input from "../../ui/Input"
import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"

export default function UserForm() {
  const [username, setUsername] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    console.log(username)
    setUsername("")
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Username">
        <Input
          id="initialBalance"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormRow>
      <Button size="small">Go to app</Button>
    </Form>
  )
}
