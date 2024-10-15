import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    useEffect(() => {
        // Cargar los contactos cuando el componente se monte
        actions.loadContacts();
    }, []);

    const handleDeleteClick = (contactId) => {
        setContactToDelete(contactId);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (contactToDelete !== null) {
            actions.deleteContact(contactToDelete);
            setShowModal(false);
            setContactToDelete(null);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Lista de Contactos</h1>
            <ul className="list-group">
                {store.contacts.map((contact, index) => {
                    return (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{contact.full_name}</h5>
                                <p>Email: {contact.email}</p>
                                <p>Teléfono: {contact.phone}</p>
                                <p>Dirección: {contact.address}</p>
                            </div>
                            <div>
                                <Link to={"/add-contact/" + contact.id}>
                                    <button className="btn btn-warning mx-2">Editar</button>
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDeleteClick(contact.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <br />
            <Link to="/add-contact">
                <button className="btn btn-success">Agregar Contacto</button>
            </Link>
            <br />
            <Link to="/">
                <button className="btn btn-primary mt-3">Back home</button>
            </Link>

            {/* Modal para confirmar eliminación */}
            {showModal && (
                <div className="modal d-block" tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar Eliminación</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>¿Estás seguro de que deseas eliminar este contacto?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};