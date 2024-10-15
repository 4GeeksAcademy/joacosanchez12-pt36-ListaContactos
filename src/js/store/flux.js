const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [
                {
                    id: 1,
                    full_name: "Simon Lopez",
                    email: "simon.lopez@example.com",
                    agenda_slug: "my_agenda",
                    address: "123 Main St, Madrid",
                    phone: "+34 600 123 456"
                },
                {
                    id: 2,
                    full_name: "Paula De Leon",
                    email: "paulade.leon@example.com",
                    agenda_slug: "my_agenda",
                    address: "456 Elm St, Barcelona",
                    phone: "+34 611 654 321"
                }
            ]
        },
        actions: {
            // Crear un nuevo contacto
            addContact: async (contact) => {
                try {
                    const response = await fetch('https://playground.4geeks.com/apis/fake/contact/agenda/my_agenda/contacts', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(contact)
                    });

                    if (response.ok) {
                        const newContact = await response.json();
                        const store = getStore();
                        setStore({ contacts: [...store.contacts, newContact] });
                    } else {
                        console.error("Error al crear el contacto");
                    }
                } catch (error) {
                    console.error("Error en addContact:", error);
                }
            },

            // Actualizar un contacto existente
            updateContact: async (contactId, updatedData) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/my_agenda/contacts/${contactId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updatedData)
                    });

                    if (response.ok) {
                        const updatedContact = await response.json();
                        const store = getStore();
                        const updatedContacts = store.contacts.map((contact) =>
                            contact.id === contactId ? updatedContact : contact
                        );
                        setStore({ contacts: updatedContacts });
                    } else {
                        console.error("Error al actualizar el contacto");
                    }
                } catch (error) {
                    console.error("Error en updateContact:", error);
                }
            },

            // Eliminar un contacto existente
            deleteContact: async (contactId) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/my_agenda/contacts/${contactId}`, {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        const store = getStore();
                        const updatedContacts = store.contacts.filter(contact => contact.id !== contactId);
                        setStore({ contacts: updatedContacts });
                    } else {
                        console.error("Error al eliminar el contacto");
                    }
                } catch (error) {
                    console.error("Error en deleteContact:", error);
                }
            },

            // Cargar los contactos desde la API
            loadContacts: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/apis/fake/contact/agenda/my_agenda/contacts');
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ contacts: data });
                    } else {
                        console.error("Error al cargar los contactos");
                    }
                } catch (error) {
                    console.error("Error en loadContacts:", error);
                }
            }
        }
    };
};

export default getState;