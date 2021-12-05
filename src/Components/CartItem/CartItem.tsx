import Button from "@material-ui/core/Button";
import { CartItemInterface } from "../../interfaces";
import { Wrapper } from "./CartItem.styles";

function CartItem({
  item,
  addToCart,
  removeFromCart,
}: {
  item: CartItemInterface;
  addToCart: (item: CartItemInterface) => void;
  removeFromCart: (id: number) => void;
}) {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="info">
          <img src={item.image} alt={item.title} />
          <div className="priceInfo">
            <p>${item.price}</p>
            <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
          </div>
          <div className="amountContainer">
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => removeFromCart(item.id)}
            >
              -
            </Button>
            <p>{item.amount}</p>
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => addToCart(item)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default CartItem;
