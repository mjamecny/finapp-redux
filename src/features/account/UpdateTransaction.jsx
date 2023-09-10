import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"

import useCategories from "../../hooks/useCategories"
import { getTransaction, updateTransaction } from "./accountSlice"

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import ButtonBack from "../../ui/ButtonBack"
import Select from "../../ui/Select"

const StyledAddTransaction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
`

export default function UpdateTransaction() {
  const { transactionId } = useParams()
  const transaction = useSelector((state) =>
    getTransaction(state, transactionId)
  )
  const categories = useCategories()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [to, setTo] = useState("")
  const [transactionType, setTransactionType] = useState("")

  useEffect(() => {
    if (transaction) {
      const { amount, description, to, category } = transaction

      setCategory(category)
      setAmount(Math.abs(amount))
      setDescription(description)
      setTo(to)
      setTransactionType(amount < 0 ? "withdraw" : "deposit")
    }
  }, [transaction])

  function handleUpdate() {
    if (!amount || !description || !to) return

    dispatch(
      updateTransaction({
        accountType: transaction.accountType,
        transactionId: transaction.id,
        updatedData: {
          amount: Number(transactionType === "withdraw" ? -amount : amount),
          category,
          description,
          to,
        },
      })
    )

    navigate("/dashboard")
  }

  return (
    <StyledAddTransaction>
      <Form>
        <FormRow label={t("update_transaction.category_label")}>
          <Select
            options={categories}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormRow>
        <FormRow label={t("update_transaction.amount_label")}>
          <Input
            type="number"
            step="any"
            value={amount}
            required
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
        <FormRow label={t("update_transaction.description_label")}>
          <Input
            type="text"
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormRow>
        <FormRow label={t("update_transaction.to_label")}>
          <Input
            type="text"
            id="to"
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </FormRow>
        <Button size="small" onClick={handleUpdate}>
          {t("update_transaction.update_button")}
        </Button>
      </Form>
      <ButtonBack />
    </StyledAddTransaction>
  )
}
