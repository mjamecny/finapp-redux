import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import { setAccounts } from "../features/account/accountSlice"
import { setUsername, setUserCurrency } from "../features/user/userSlice"

import Button from "../ui/Button"
import Heading from "../ui/Heading"
import FormRow from "../ui/FormRow"
import FileInput from "../ui/FileInput"
import Form from "../ui/Form"
import ButtonHome from "../ui/ButtonHome"

const StyledImport = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  background-color: var(--color-grey-back-900);
  height: 100vh;
`

export default function Import() {
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleImport = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target.result)
        if (!data.username || !data.currency || !data.accounts) {
          throw new Error()
        }
        dispatch(setUsername(data.username))
        dispatch(setUserCurrency(data.currency))
        dispatch(setAccounts(data.accounts))
        navigate("/dashboard")
        toast.success(t("import.toast"))
      } catch (error) {
        toast.error(t("import.toast_error"))
        setData(null)
      }
    }
    reader.readAsText(data)
  }

  return (
    <StyledImport>
      <Heading as="h2">{t("import.heading")}</Heading>
      <Form onSubmit={handleImport}>
        <FormRow label={t("import.user_data_label")} id="userData">
          <FileInput
            id="userData"
            accept="json"
            onChange={(e) => setData(e.target.files[0])}
          />
        </FormRow>
        <Button size="small">{t("import.button_label")}</Button>
      </Form>
      <ButtonHome />
    </StyledImport>
  )
}
