const CartItem = ({ id, name, value, quantity, dispatch }) => {
  // console.log("Render CartItem: " + name);

  if (id == -1) {
    return <li>No items</li>;
  }
  const cartButton = (actionSufix, innerHTML, classes) => {
    return (
      <button
        className={`btn sm solid  w-2 h-6 ${classes}`}
        onClick={() => {
          dispatch({
            type: "CART." + actionSufix,
            payload: { id: id, quantity: quantity },
          });
        }}
      >
        {innerHTML}
      </button>
    );
  };

  const decreaseButton = cartButton(
    "DECREASE",
    "-",
    quantity == 1 ? "danger" : "warn"
  );
  const increaseButton = cartButton("INCREASE", "+", "info");
  return (
    <li
      key={id}
      className="grid grid-cols-6 px-2 mx-2 outline rounded-xl content-end h-6"
    >
      <span className="">{name}</span>
      {decreaseButton}x{quantity}
      {increaseButton}
      <div className="divider vertical" />
      <span>${value * quantity}</span>
    </li>
  );
};

export default CartItem;
