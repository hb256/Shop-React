import toast from "react-hot-toast";

const initialState = [];
const cartReducer = (state, action) => {
  switch (action.type) {
    case "CART.ADD": {
      // console.log(action.type + "! " + JSON.stringify(action.payload));
      // if(state action.payload.id)
      const { id, name } = action.payload;
      const itemIdx = state.findIndex((item) => item.id == id);
      if (itemIdx != -1) {
        // console.log("Item is added");
        toast.success("Item is in cart " + name, {
          id: id,
        });
        return [...state];
      }
      return [
        ...state,
        {
          ...action.payload,
          quantity: 1,
        },
      ];
    }
    case "CART.INCREASE": {
      // console.log(action.type + "! " + JSON.stringify(action.payload));

      return state.map((c) => {
        if (c.id === action.payload.id) {
          return { ...c, quantity: action.payload.quantity + 1 };
        } else {
          return c;
        }
      });
    }
    case "CART.DECREASE": {
      // console.log(action.type + "! " + JSON.stringify(action.payload));
      if (action.payload.quantity < 2)
        return state.filter((c) => c.id !== action.payload.id);

      return state.map((c) => {
        if (c.id === action.payload.id) {
          return { ...c, quantity: action.payload.quantity - 1 };
        } else {
          return c;
        }
      });
    }
    case "CART.REMOVE": {
      // console.log(action.type + "! " + JSON.stringify(action.payload));
      return state.filter((c) => c.id !== action.payload.id);
    }

    case "CART.RESET": {
      return initialState;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export { cartReducer, initialState };
