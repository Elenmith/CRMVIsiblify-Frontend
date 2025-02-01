import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClients,
  deleteClient,
  updateClient,
} from "../store/clientsSlice";

const Clients = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.clients);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingClient, setEditingClient] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  // Filtrowanie klientów według wpisanej nazwy
  const filteredClients = clients.filter((client) =>
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funkcja rozpoczynająca edycję
  const startEditing = (client) => {
    setEditingClient(client.id);
    setEditedData({ ...client });
  };

  // Funkcja do edytowania wartości
  const handleEditChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  // Zatwierdzenie edycji
  const submitEdit = () => {
    dispatch(updateClient(editedData));
    setEditingClient(null);
  };

  return (
    <div className="ml-64 min-h-screen p-10 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Lista firm</h1>

      {/* Wyszukiwanie klientów */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Wyszukaj firmę..."
          className="border p-2 rounded flex-1"
        />
      </div>

      {loading && <p>Ładowanie...</p>}
      {error && <p className="text-red-500">Błąd: {error}</p>}

      {/* Lista klientów */}
      <ul className="space-y-4">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <li key={client.id} className="bg-white p-4 shadow-md rounded-lg">
              {editingClient === client.id ? (
                // Formularz edycji
                <div>
                  <input
                    type="text"
                    value={editedData.companyName}
                    onChange={(e) => handleEditChange(e, "companyName")}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="text"
                    value={editedData.address}
                    onChange={(e) => handleEditChange(e, "address")}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="email"
                    value={editedData.email}
                    onChange={(e) => handleEditChange(e, "email")}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="text"
                    value={editedData.phoneNumber}
                    onChange={(e) => handleEditChange(e, "phoneNumber")}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={submitEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Zapisz
                    </button>
                    <button
                      onClick={() => setEditingClient(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Anuluj
                    </button>
                  </div>
                </div>
              ) : (
                // Widok normalny klienta
                <div className="flex justify-between">
                  <span>
                    <strong>{client.companyName}</strong> <br />
                    📍 {client.address} <br />
                    ✉️ {client.email} <br />
                    📞 {client.phoneNumber}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(client)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edytuj
                    </button>
                    <button
                      onClick={() => dispatch(deleteClient(client.id))}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500">Brak wyników dla {searchTerm}</p>
        )}
      </ul>
    </div>
  );
};

export default Clients;
