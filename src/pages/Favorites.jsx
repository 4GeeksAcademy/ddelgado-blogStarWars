import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const Favorites = () => {
  const { store, dispatch } = useGlobalReducer();

  // si quieres permitir quitar favoritos desde aquí
  const removeFavorite = (item) => {
    const updatedFavorites = store.favorites.filter(
      fav => !(fav.uid === item.uid && fav.type === item.type)
    );
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: item });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (store.favorites.length === 0) {
    return (
      <div className="container mt-5">
        <h2>No tienes favoritos 💔</h2>
        <Link to="/" className="btn btn-primary mt-3">
          ⬅️ Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>💚 Mis Favoritos</h1>
      <div className="row">
        {store.favorites.map((item) => (
          <div key={`${item.type}-${item.uid}`} className="col-md-4 mb-3">
            <div className="card bg-dark text-light border-warning">
              <div className="card-body">
                <h5>{item.name}</h5>
                <p className="text-muted">{item.type}</p>
                <Link
                  to={`/detail/${item.type}/${item.uid}`}
                  className="btn btn-sm btn-info me-2"
                >
                  👁 Ver detalles
                </Link>
                <button
                  onClick={() => removeFavorite(item)}
                  className="btn btn-sm btn-danger"
                >
                  💔 Quitar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
