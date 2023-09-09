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
