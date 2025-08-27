export const initialStore = () => {
  return {
    message: null,
    people:[],
    vehicles:[],
    planets:[],
    favorites:[],
    loading: false,
  }
}
// Cambie el store por state en los parametros
export default function storeReducer(state, action = {}) {
  switch (action.type) {
    case "START_LOADING":
    return{
      ...state,
      loading: true
    }
    case "STOP_LOADING":
      return{
        ...state,
        loading: false
      }
      case "SET_PEOPLE":
        return{
          ...state,
          people:action.payload
        }
        case "SET_VEHICLES":
        return{
          ...state,
          vehicles:action.payload
        }
        case "SET_PLANETS":
        return{
          ...state,
          planets:action.payload
        }
        case "ADD_TO_FAVORITES":
        return{
          ...state,
          favorites: [...state.favorites, action.payload]
        }
        case "REMOVE_FROM_FAVORITES":
          return{
            ...state,
            favorites: state.favorites.filter(
              fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
            )
          }
        case "SET_FAVORITES":
          return {
          ...state,
          favorites: action.payload
        
        };

    default:
      throw Error('Unknown action.');
  }
}