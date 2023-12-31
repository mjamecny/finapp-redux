import styled from "styled-components"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import SelectAlternative from "../../ui/SelectAlternative"
import Select from "../../ui/Select"
import Input from "../../ui/Input"
import Button from "../../ui/Button"

import useCategories from "../../hooks/useCategories"
import { addTransaction } from "./accountSlice"

const StyledAddTransaction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
`

export default function AddTransaction() {
  const accounts = useSelector((state) => state.account.accounts)
  const categories = useCategories()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [accountType, setAccountType] = useState("")
  const [category, setCategory] = useState("home")
  const [amount, setAmount] = useState("")
  const [transactionType, setTransactionType] = useState("withdraw")
  const [description, setDescription] = useState("")
  const [to, setTo] = useState("")

  useEffect(() => {
    if (accounts.length) {
      setAccountType(accounts[0].type)
    }
  }, [accounts])

  function handleSubmit(e) {
    e.preventDefault()
    if (!amount || !description || !to) return

    const newTransaction = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      accountType,
      category,
      amount: Number(transactionType === "withdraw" ? -amount : amount),
      description,
      to,
    }

    dispatch(addTransaction(newTransaction))
    toast.success(t("add_transaction.add_toast"))
    navigate("/dashboard")
  }

  return (
    <StyledAddTransaction>
      <Form onSubmit={handleSubmit}>
        <FormRow label={t("add_transaction.account_label")}>
          <SelectAlternative
            accounts={accounts}
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          />
        </FormRow>
        <FormRow label={t("add_transaction.category_label")}>
          <Select
            options={categories}
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormRow>
        <FormRow label={t("add_transaction.amount_label")}>
          <Input
            type="number"
            id="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormRow>
        <FormRow type="horizontal">
          <Input
            type="radio"
            id="transactionType"
            value="withdraw"
            checked={transactionType === "withdraw"}
            onChange={(e) => setTransactionType(e.target.value)}
          />
          -
          <Input
            type="radio"
            id="transactionType"
            value="deposit"
            checked={transactionType === "deposit"}
            onChange={(e) => setTransactionType(e.target.value)}
          />
          +
        </FormRow>
        <FormRow label={t("add_transaction.description_label")}>
          <Input
            type="text"
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormRow>
        <FormRow label={t("add_transaction.to_label")}>
          <Input
            type="text"
            id="to"
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </FormRow>
        <Button size="small">{t("add_transaction.add_button")}</Button>
      </Form>
    </StyledAddTransaction>
  )
}
