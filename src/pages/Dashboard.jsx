import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

import Empty from "../ui/Empty"
import Row from "../ui/Row"
import AccountList from "../features/account/AccountList"
import TransactionList from "../features/account/TransactionsList"
import TotalAmount from "../features/account/TotalAmount"

import { getTransactions } from "../features/account/accountSlice"

export default function Dashboard() {
  const accounts = useSelector((state) => state.account.accounts)
  const transactions = useSelector(getTransactions)
  const { t } = useTranslation()

  return (
    <>
      {accounts.length === 0 ? (
        <Empty
          message={t("empty.accounts")}
          buttonLabel={t("empty.add_account")}
          path="/account/add"
        />
      ) : (
        <Row type="vertical">
          <TotalAmount />
          <AccountList accounts={accounts} />
          <TransactionList transactions={transactions} />
        </Row>
      )}
    </>
  )
}
