import {Link} from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
 const Favorites =  () =>{

    const {store, dispatch} = useGlobalReducer()


const removeFromFavorites = (item) =>{
    dispatch({type:"REMOVE_FROM_FAVORITES", payload:item})
    console.log("removido de favoritos", item.name)
}

 const getIcon = ( type ) =>{
        switch(type){
            case "people" : return "🏃‍♂️";
            case "vehicles" : return "🚓";
            case "planets" : return "🌏";
            default: return "✨"
        }
    }

if(store.favorites.length === 0){
    return(
        <div className="container text-center mt-5">
            <div className="mb-4">
              <span className="display-1">💔 </span>
            </div>
            <h2>No tienes favoritos todavia ni nadie que te comprenda</h2>
            <p className="text-muted">¡Vuelve a la pagina principal y agrega algun favorito!</p>
            <Link to={"/"} className="btn btn-primary btn-lg">
            🎇Vuelve a la galaxia en busca de tus favoritos!
            </Link>
        </div>
    )
}

    return (
        <div className="text-center mb-5">
            <h1 className="display-4">
                <span className="text-danger">🧡Mis Favoritos</span>
            </h1>
            <p className="lead">Tienes {store.favorites.length} elementos guardados </p>
        <div className="text-center mb-4">
            <Link to={"/"} className="btn btn-primary btn-lg">
           🎇 Vuelve a el Home en busca de mas favoritos
            </Link>
        </div>
        <div className="row">
            {store.favorites.map((item)=>(
         <div key={`fav-${item.type}-${item.uid}}`} className="col-md-6 col-lg-4 mb-4">
          <div className="card bg-dark text-ligth h-100 border-danger">
            <div className="card-body">
                 <div className="d-flex justify-content-between align-items-start">
             <div>
                 <span className="fs-2">{getIcon(item.type)}</span>
                 <span className="badge bg-secondary">{item.type}</span>
            </div>
            <span className="badge bg-danger">🧡Favorito</span>
            </div>
            <h5 className="card-title text-warning">{item.name}</h5>
            </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                 <Link
                 to={`detail/${item.type}/${item.uid}`}
                 className="btn btn-primary btn-sm"
                 >
                👁 Ver Detalles
                 </Link>
                 <button
                 onClick={()=>removeFromFavorites(item)}
                 className="btn btn-danger btn-sm">
                   ✂​ Quitar
                 </button>
           </div>
          </div>
         </div>
            ))}
        </div>
        </div>
    )
}
export default Favorites;