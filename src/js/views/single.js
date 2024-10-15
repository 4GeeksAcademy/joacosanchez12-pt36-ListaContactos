import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const contactId = parseInt(params.theid); // Convertimos el id a entero para comparar

    // Buscar el contacto en el store usando el id
    const contact = store.contacts.find(contact => contact.id === contactId);

    useEffect(() => {
        // En caso de que el contacto no esté en el store, cargar los contactos (si no se han cargado previamente)
        if (!contact) {
            actions.loadContacts();
        }
    }, [contact]);

    return (
        <div className="jumbotron">
            {contact ? (
                <>
                    <h1 className="display-4">Detalles del Contacto: {contact.full_name}</h1>
                    <p className="lead">Email: {contact.email}</p>
                    <p className="lead">Teléfono: {contact.phone}</p>
                    <p className="lead">Dirección: {contact.address}</p>
                </>
            ) : (
                <p>Cargando datos del contacto...</p>
            )}

            <hr className="my-4" />

            <Link to="/">
                <span className="btn btn-primary btn-lg" role="button">
                    Volver a Inicio
                </span>
            </Link>
        </div>
    );
};

Single.propTypes = {
    match: PropTypes.object
};