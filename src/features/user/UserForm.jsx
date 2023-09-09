import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"

import Form from "../../ui/Form"
import Input from "../../ui/Input"
import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"

import { setUsername } from "./userSlice"

export default function UserForm() {
  const [name, setName] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  function handleSubmit(e) {
    e.preventDefault()
    if (!name) return
    dispatch(setUsername(name))
    setName("")
    navigate("/dashboard")
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label={t("user_form.username_label")}>
        <Input
          id="initialBalance"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormRow>
      <Button size="small">{t("user_form.button_label")}</Button>
    </Form>
  )
}
