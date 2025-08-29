import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const StarWarsHome = () => {
    const { store, dispatch } = useGlobalReducer();


      useEffect(() => {

         fetchAllData()
         
    }, [])
   
    const fetchAllData = async () => {

        dispatch({ type: "START_LOADING" })
        try {

            console.log("Buscando datos de la api")
            const [peopleResponse, vehiclesResponse, planetsResponse] = await Promise.all([
                fetch("https://www.swapi.tech/api/people"),
                fetch("https://www.swapi.tech/api/vehicles"),
                fetch("https://www.swapi.tech/api/planets")
            ])
            const peopleData = await peopleResponse.json()
            const vehiclesData = await vehiclesResponse.json()
            const planetsData = await planetsResponse.json()


            console.log("Datos Recibidos", {
                people: peopleData.results.length,
                vehicles: vehiclesData.results.length,
                planets: planetsData.results.length
            })

            const peopleWithType = peopleData.results.map(person => ({
                ...person,
                type: "people"
            }))
            const vehiclesWithType = vehiclesData.results.map(vehicle => ({
                ...vehicle,
                type: "vehicles"
            }))
            const planetsWithType = planetsData.results.map(planet => ({
                ...planet,
                type: "planets"
            }))
            dispatch({ type: "SET_PEOPLE", payload: peopleWithType })

            dispatch({ type: "SET_VEHICLES", payload: vehiclesWithType })

            dispatch({ type: "SET_PLANETS", payload: planetsWithType })

        } catch (error) {
              console.error("Error al hacer la peticion a la SWAPI", error)
        }finally{
            dispatch({ type: "STOP_LOADING"})
        }
    }

     const toogleFavorite = (item) => {
      const isAlreadyFavorite = store.favorites.find(  
   fav => fav.uid === item.uid && fav.type === item.type
    )  
    if(isAlreadyFavorite){
        dispatch({type: "REMOVE_FROM_FAVORITES", payload:item})
        console.log(" ♥️ Removido de favoritos:", item.name)
     }else {
        dispatch({type: "ADD_TO_FAVORITES", payload: item})
        console.log("♥️ Removido de favoritos", item.name)
     } 
  }
    const isFavorite = (item) =>{
        return store.favorites.find( fav => fav.uid ===item.uid && fav.type === item.type)
    }

    const getIcon = (type) => {
        switch(type){
            case "people" : return "🏃‍♂️";
            case "vehicles": return "🚗";
            case "planets": return "🌏";
            default: return "✨"
        }
    }
 












    if(store.loading){  
        return(
        <div className="">
             <div className="">
            <span className="">Loading.............</span>
             </div>
             <h3 className="mt-3">Cargando datos desde la Api de Star Wars</h3>
              <p className="text-muted">Un momento..</p>

        </div>    
    )
    }

    const allItems = [
    ...store.people,
    ...store.vehicles,
    ...store.planets
    ]



    return (

        <div className="mt-4">
        <div className="estilo-texto"></div>
        <h1 className="display-4">
        <span className="text-warning">✨Star Wars Database✨</span>
             </h1>
             <p className="lead">
              Personajes: <span className="badge bg-primary">{store.people.length}</span>
              Vehiculos:  <span className="badge bg-secondary">{store.vehicles.length}</span>
              Planetas:  <span className="badge bg-info">{store.planets.length}</span>
              Favoritos:  <span className="badge bg-warning">{store.favorites.length}</span>
             </p>
     
            <div className="text-center mb-5">
                <Link to="/favorites" className="btn btn-warning btn-lg">
                ♥️ Ver mis favoritos ({store.favorites.length})
                </Link>
               
            </div>



         <div className="row">
            {allItems.map((item)=>(
                <div key={`${item.type}-${item.uid}}`} className="col-md-6 col-lg-4 mb-4">

                <div className="card bg-dark text-ligth h-100 border-warning">
                    <div className="card-body"> 
                      <div className="d-flex justify-content-between align-items-start">
                       <div>
                        <span className="fs-2">{getIcon(item.type)}</span>
                        <span className="badge bg-secondary">{item.type}</span>
                        </div>
                        <span className="badge bg-info">#{item.uid}</span>
                        <h4 className="card-title- text-waning">{item.name}</h4>
                       <div className="d-flex justify-content-between align-items-center mt-3">
                        <Link
                        to={`detail/${item.type}/${item.uid}`}
                        className="btn btn-primary btn-sm"
                        > 
                       👁️‍🗨️ Ver Detalles
                        </Link>
                       <button onClick={() =>toogleFavorite(item)}
                       className={`btn btn-sm ${isFavorite(item) ? "btn-danger": "btn-outline-danger"}`}>
                        {isFavorite(item) ? "♥️ Quitar el favorito" : "💚 Agregar a favoritos"}
                       </button>
                       </div>
                       
                        </div>
                      </div>
                   
                    </div>
                    </div>
            ))
            
            }
         </div>


        </div>



    )
}