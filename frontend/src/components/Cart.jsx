import toast from "react-hot-toast";
import { buyProducts } from "../../misc/api/api";
import CartItem from "./CartItem";
import useProducts from "./hooks/useProducts";
import { useMemo } from "react";

export default function Cart({ state, dispatch }) {
  const { products, mutate } = useProducts();

  const cartElements = useMemo(
    () => state.map((c) => <CartItem key={c.id} {...c} dispatch={dispatch} />),
    [state]
  );
  const sumTotal = state.reduce((sum, item) => {
    return sum + item.quantity * item.value;
  }, 0);
  return (
    <div className="col-span-2">
      <ul className="grid grid-flow-row gap-4">
        {state.length > 0 ? cartElements : <CartItem id="-1" />}
      </ul>
      <div className="divider success" />
      <p>Total ${sumTotal}</p>
      <button
        className="btn solid success sm pill h-6 w-full"
        onClick={async () => {
          let cart = state.map((p) => ({
            id: p.id,
            quantity: p.quantity,
          }));
          cart = cart.sort((a, b) => a.id - b.id);
          const idsInCart = state.map((p) => p.id);

          buyProducts(cart).then((res) => {
            let cartIdx = 0;
            let updatedProducts = [];
            for (let i = 0; i < products.length; i++) {
              let product = products[i];
              if (idsInCart.indexOf(product.id) != -1) {
                updatedProducts.push(res.data[cartIdx]);
                cartIdx++;
              } else {
                updatedProducts.push(product);
              }
            }
            // console.log(updatedProducts);
            mutate(updatedProducts, false);
            toast.success("Successful purchase. Total: ", sumTotal);
            dispatch({ type: "CART.RESET" });
          });
        }}
        disabled={state.length < 1}
      >
        Buy
      </button>
    </div>
  );
}
