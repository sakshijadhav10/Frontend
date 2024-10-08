export const addDecimals = num => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = state => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => {
      const itemFinalprice = item.price - item.price * (item.discount / 100);
      return acc + itemFinalprice * item.qty;
    }, 0)
    .toFixed(2));
  
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)
  state.taxPrice = addDecimals((state.itemsPrice * 0.15).toFixed(2))
  state.totalPrice = (
    +state.itemsPrice +
    +state.shippingPrice +
    +state.taxPrice
  ).toFixed(2)

  localStorage.setItem("cart", JSON.stringify(state))

  return state
}
