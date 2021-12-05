import { CartItemInterface } from "../../interfaces";
import { Wrapper } from "./Item.styles";

function Item({
  item,
  handleAddToCart,
}: {
  item: CartItemInterface;
  handleAddToCart: (item: CartItemInterface) => void;
}) {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
    </Wrapper>
  );
}

export default Item;
