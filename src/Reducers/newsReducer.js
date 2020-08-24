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
    case 'select/fav':
      favList = [...state.fav]
      return{
        ...state,
        items: favList
      }
    case 'update/top':
      newList = action.items;
      return {
        ...state,
        items: newList,
        route: '/top',
        loaded: true
      }
    case 'update/all':
      newList = action.items;
      return{
        ...state,
        items: newList,
        route: '/all',
        loaded: true
      }
    case "update/items":
      newList = action.items;
      return {
        ...state,
        items: newList,
        route: "default",
        query: "none",
        loaded: true
      };
      case "add/fav":
      favList = [...state.fav];
      favList.push(action.item);
      return {
        ...state,
        fav: favList
      }
    default:
      return state;
  }
}
