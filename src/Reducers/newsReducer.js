let newList = [];
let favList = [];

export default function reducer(
  state = {
    items: [],
    route: "",
    query: "",
    loaded: false,
    fav: [],
  },
  action
) {
  switch (action.type) {
    case "select/fav":
      favList = [...state.fav];
      return {
        ...state,
        items: favList,
      };
    case "update/top":
      newList = action.items;
      return {
        ...state,
        items: newList,
        route: "/top",
      };
    case "update/all":
      newList = action.items;
      return {
        ...state,
        items: newList,
        route: "/all",
      };
    case "update/default":
      newList = action.items;
      return {
        ...state,
        items: newList,
        route: "default",
        query: "none",
      };
    case "add/fav":
      favList = [...state.fav];
      favList.push(action.item);
      return {
        ...state,
        fav: favList,
      };
    case "fetch/success":
      return {
        ...state,
        items: action.items,
        loaded: true,
      };
    case "fetch/error":
      return {
        ...state,
        loaded: false,
      };
    default:
      return state;
  }
}
