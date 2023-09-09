import styled from "styled-components"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

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

  const [accountType, setAccountType] = useState("Bank")
  const [category, setCategory] = useState("home")
  const [amount, setAmount] = useState("")
  const [transactionType, setTransactionType] = useState("withdraw")
  const [description, setDescription] = useState("")
  const [to, setTo] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!amount || !description || !to) return

    const newTransaction = {
      id: crypto.randomUUID(),
      accountType,
      category,
      amount: Number(transactionType === "withdraw" ? -amount : amount),
      description,
      to,
    }

    dispatch(addTransaction(newTransaction))
  }

  return (
    <StyledAddTransaction>
      <Form onSubmit={handleSubmit}>
        <FormRow label="Account">
          <SelectAlternative
            accounts={accounts}
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          />
        </FormRow>
        <FormRow label="Category">
          <Select
            options={categories}
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormRow>
        <FormRow label="Amount">
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
        <FormRow label="Description">
          <Input
            type="text"
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormRow>
        <FormRow label="To">
          <Input
            type="text"
            id="to"
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </FormRow>
        <Button size="small">Add</Button>
      </Form>
    </StyledAddTransaction>
  )
}
