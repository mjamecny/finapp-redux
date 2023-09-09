import { useTranslation } from "react-i18next"

const useAccountCategories = () => {
  const { t } = useTranslation()

  const accountCategories = [
    { value: "Bank", label: t("account_categories.bank") },
    { value: "Bitcoin", label: t("account_categories.bitcoin") },
    { value: "Cash", label: t("account_categories.cash") },
  ]

  return accountCategories
}

export default useAccountCategories
