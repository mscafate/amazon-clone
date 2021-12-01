export const initialState = {
  menu: [],
  basket: [],
  user: null,
  search: "",
};

export const stripePrice = (basket) => {
  basket.map((item) => {
    item.price *= 100;
  });
};

export const basketPrice = (basket) => {
  basket.map((item) => {
    item.price /= 100;
  });
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0); //basket? optional chaining?

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "CHANGE_SEARCH":
      return {
        ...state,
        search: action.item,
      };
    case "ADD_TO_MENU":
      return {
        ...state,
        menu: [...state.menu, action.item],
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as it is not in the basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
