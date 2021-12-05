import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { CartItemInterface } from "../../interfaces";

function Cart({
  cartItems,
  addToCart,
  removeFromCart,
}: {
  cartItems: CartItemInterface[];
  addToCart: (item: CartItemInterface) => void;
  removeFromCart: (id: number) => void;
}) {
  function calculateTotal(items: CartItemInterface[]) {
    return items.reduce((ack, item) => ack + item.amount * item.price, 0);
  }
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {!cartItems.length ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
}

export default Cart;
