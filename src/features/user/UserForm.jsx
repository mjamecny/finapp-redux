import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"

import Form from "../../ui/Form"
import Input from "../../ui/Input"
import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"
import Select from "../../ui/Select"

import { setUsername, setUserCurrency } from "./userSlice"

const currencyOptions = [
  { value: "czech-republic-koruna", label: "CZK" },
  { value: "eur", label: "EUR" },
  { value: "usd", label: "USD" },
]

export default function UserForm() {
  const [name, setName] = useState("")
  const [currency, setCurrency] = useState("usd")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  function handleSubmit(e) {
    e.preventDefault()
    if (!name) return
    dispatch(setUsername(name))
    dispatch(setUserCurrency(currency))
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
          required
          onChange={(e) => setName(e.target.value)}
        />
      </FormRow>
      <FormRow label="Currency">
        <Select
          options={currencyOptions}
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </FormRow>
      {name !== "" && (
        <Button size="small">{t("user_form.button_label")}</Button>
      )}
    </Form>
  )
}
