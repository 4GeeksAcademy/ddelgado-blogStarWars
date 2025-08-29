export const initialStore = () => {
  return {
    message: null,

    people:[],
    vehicles:[],
    planets:[],
    favorites:[],
    loading: false
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
   
    case "START_LOADING":
    return{
      ...store,
      loading: true

    } 
    case "STOP_LOADING":
      return{
        ...store,
        loading: false
      }
      case "SET_PEOPLE":
        return{
          ...store,
          people:action.payload
        }

        case "SET_VEHICLES":
        return{
          ...store,
          vehicles:action.payload
        }

        case "SET_PLANETS":
        return{
          ...store,
          planets:action.payload
        }


        case "ADD_TO_FAVORITES":
        return{
          ...store,
          favorites: [...store.favorites, action.payload] 
        }
        case "REMOVE_FROM_FAVORITES":
          return{
            ...store,
            favorites: store.favorites.filter(
              fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
            )
          }






    default:
      throw Error('Unknown action.');
  }
}