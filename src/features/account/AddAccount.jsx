import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Select from "../../ui/Select"
import Input from "../../ui/Input"
import Button from "../../ui/Button"

import useAccountCategories from "../../hooks/useAccountCategories"
import { addAccount } from "./accountSlice"

const StyledAddAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
`

export default function AddAccount() {
  const accounts = useSelector((state) => state.account.accounts)
  const [accountType, setAccountType] = useState("Bank")
  const [initialBalance, setInitialBalance] = useState("")

  const accountCategories = useAccountCategories()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!initialBalance) return

    const newAccount = {
      id: crypto.randomUUID(),
      type: accountType,
      balance: Number(initialBalance),
      transactions: [],
    }

    const hasAddedAccount = accounts.some(
      (account) => account.type === newAccount.type
    )

    if (hasAddedAccount) {
      toast.error(t("add_account.account_exists_toast"))
      return
    }

    dispatch(addAccount(newAccount))

    toast.success(t("add_account.add_toast"))
    navigate("/dashboard")
  }

  return (
    <StyledAddAccount>
      <Form onSubmit={handleSubmit}>
        <FormRow label={t("add_account.account_label")}>
          <Select
            options={accountCategories}
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          />
        </FormRow>
        <FormRow label={t("add_account.initial_label")}>
          <Input
            id="initialBalance"
            type="number"
            step="any"
            value={initialBalance}
            required
            onChange={(e) => setInitialBalance(e.target.value)}
          />
        </FormRow>
        <Button size="small">{t("add_account.add_button")}</Button>
      </Form>
    </StyledAddAccount>
  )
}
