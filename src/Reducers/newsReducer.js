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
      favList = [...state.fav].reverse();
      return {
        ...state,
        items: favList,
        route: action.route,
      };
    case "delete/fav":
      favList = [...state.fav].reverse();
      let targetI = favList.indexOf(action.item);
      favList.splice(targetI, 1);
      return {
        ...state,
        items: favList,
        fav: favList
      }
    case "add/fav":
      favList = [...state.fav];
      let isIncluded = favList.filter(x => x.url === action.item.url);
      console.log(isIncluded);
      if (isIncluded < 1) {
        console.log('entrou no if');
        favList.push(action.item);
      }
      return {
        ...state,
        fav: favList,
      };
    case "fetch/success":
      return {
        ...state,
        items: action.items,
        loaded: true,
        route: action.route,
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
