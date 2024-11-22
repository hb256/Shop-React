import { useState } from "react";
import toast from "react-hot-toast";
const ProductItem = ({ id, name, value, quantity, dispatch }) => {
  const [isAdded, setIsAdded] = useState(false);
  // console.log("Render ProductItem: " + name);

  const cartButton = (classes) => {
    return (
      <button
        onClick={() => {
          setIsAdded(!isAdded);
          toast.success("Added to cart " + name, { id: id });
          dispatch({
            type: "CART.ADD",
            payload: {
              id: id,
              name: name,
              value: value,
            },
          });
        }}
        className={`btn xs solid ${classes}`}
      >
        <p>ADD</p>
      </button>
    );
  };
  const addButton = cartButton("info");
  const addedButton = cartButton("info outline");
  return (
    <div key={id} className="grid grid-rows-3 justify-center h-18 w-20">
      <h3 className="">{name}</h3>
      <p className="text-xs">${value}</p>
      <p className="text-xs">x{quantity}</p>
      {!isAdded ? addButton : addedButton}
    </div>
  );
};

export default ProductItem;
