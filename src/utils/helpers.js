export function getCurrency(currency) {
  switch (currency) {
    case "usd":
      return "USD"
    case "czech-republic-koruna":
      return "CZK"
    case "eur":
      return "EUR"
    default:
      return "USD"
  }
}

export function convertToDDMMYYYY(timestamp) {
  const dateObj = new Date(timestamp)

  const day = String(dateObj.getDate()).padStart(2, "0")
  const month = String(dateObj.getMonth() + 1).padStart(2, "0")
  const year = dateObj.getFullYear()

  return `${day}/${month}/${year}`
}
