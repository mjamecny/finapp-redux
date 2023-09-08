import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import Form from "../../ui/Form"
import Input from "../../ui/Input"
import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"

import { setUsername } from "./userSlice"

export default function UserForm() {
  const [name, setName] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(setUsername(name))
    setName("")
    navigate("/dashboard")
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Username">
        <Input
          id="initialBalance"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormRow>
      <Button size="small">Go to app</Button>
    </Form>
  )
}
