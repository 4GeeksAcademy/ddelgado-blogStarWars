import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const StarWarsDetail = () => {
    const { type, id } = useParams()

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {
        fetchDetails()
    }, [type, id])

    const fetchDetails = async () => {
        setLoading(true)
        setError(null)

        try {
            console.log(`Buscando detalles de ${type} ${id}`)

            const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`)
            const data = await response.json()
            setDetails({ ...data.result, type: type })

        } catch (error) {
            console.error("Error haciendo el fetch de details:", error)

            setError(error.message)
        } finally {
            setLoading(false)

        }
    }



    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border- text-warning" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">......Loading</span>
                </div>)
                <h3 className="mt-3">Cargando detalles.... </h3>
            </div>
        )
    }

    return (


        <div className="container mt-4">
            <div className="mb-4">
                <Link to="/" className="btn btn-outline-warning">
                    - Volver al inicio -
                </Link>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card bg-dark text-light border-warning">
                        <div className="card-header d-flex justify-content-between align-item-center">
                            <div>
                                <span className="fs-1- me-3">{details.type}</span>
                                <span className="h2 text-warning">{details.properties.name}</span>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="text-warning mb-3">Informacion</h5>
                                        <ul className="list-unstyled">
                                            {Object.entries(details.properties).map(([key, value])=>{
                                                if (["name", "created", "edited", "url"].includes(key)){
                                                    return null
                                                }
                                                return (
                                                    <li key={key}className="mb-2">
                                                       <strong className="text-info">
                                                        {key.replace(/_/g, "").toUpperCase()}
                                                </strong>
                                                <span className="ms-2">{Array.isArray(value) ? value.join (" , ") : value }

                                                </span>
                                                    </li>
                                                )
                                        })}
                                    </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="text-warning mb-3">
                                            ❤ Data:
                                            <ul className="list-unstyled">
                                                <li className="mb-2">
                                                    <strong className="text-info">TIPO:</strong>
                                                    <span className="badge bg-secondary">{details.type}</span>
                                                </li>
                                                <li className="mb-2">
                                                    <strong className="text-">ID:</strong>
                                                    <span className="ms badge bg-info">{details.uid}</span>
                                                </li>
                                            </ul>
                                        </h5>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            </div>
            )
}