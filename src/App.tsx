import { useState, useEffect } from "react";

import AddShoppingCartRounded from "@material-ui/icons/AddShoppingCartRounded";
import Badge from "@material-ui/core/Badge";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

import Cart from "./Components/Cart/Cart";
import Item from "./Components/Item/Item";

import { getProducts, getTotalItemCount } from "./Utils/utilities";

import { Wrapper, StyledButton } from "./App.styles";
import { CartItemInterface } from "./interfaces";

function App() {
  const [isLoading, setisLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemInterface[]>(
    [] as CartItemInterface[]
  );
  const [items, setItems] = useState<CartItemInterface[]>(
    [] as CartItemInterface[]
  );

  function handleRemoveFromCart(id: number): void {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemInterface[])
    );
  }

  function handleAddToCart(item: CartItemInterface): void {
    setCartItems((prev) => {
      const isItemInCart = prev.find((prevItem) => prevItem.id === item.id);

      if (isItemInCart) {
        return prev.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, amount: prevItem.amount + 1 }
            : prevItem
        );
      }
      // First time the item is added
      return [...prev, { ...item, amount: 1 }];
    });
  }

  useEffect(() => {
    getProducts(process.env.REACT_APP_API_URL!)
      .then((data) => {
        setisLoading(false);
        setItems(data);
      })
      .catch((err) => {
        setisLoading(false);
        console.log(err.message);
      });
  }, []);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Wrapper>
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={getTotalItemCount(cartItems)} color="error">
          <AddShoppingCartRounded />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {items?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={() => handleAddToCart(item)} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
