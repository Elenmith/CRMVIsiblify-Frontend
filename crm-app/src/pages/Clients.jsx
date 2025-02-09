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

  const filteredClients = clients.filter((client) =>
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEditing = (client) => {
    setEditingClient(client.id);
    setEditedData({ ...client });
  };

  const handleEditChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const submitEdit = () => {
    dispatch(updateClient(editedData));
    setEditingClient(null);
  };

  return (
    <div className="ml-64 min-h-screen p-10 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Lista firm</h1>
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
      <ul className="space-y-4">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <li key={client.id} className="bg-white p-4 shadow-md rounded-lg">
              {editingClient === client.id ? (
                <div>
                  <input
                    type="text"
                    value={editedData.companyName}
                    onChange={(e) => handleEditChange(e, "companyName")}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="text"
                    value={editedData.streetAddress}
                    onChange={(e) => handleEditChange(e, "streetAddress")}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="text"
                    value={editedData.postalCode}
                    onChange={(e) => handleEditChange(e, "postalCode")}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="text"
                    value={editedData.addressLocality}
                    onChange={(e) => handleEditChange(e, "addressLocality")}
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
                  <input
                    type="text"
                    value={editedData.url}
                    onChange={(e) => handleEditChange(e, "url")}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="text"
                    value={editedData.sameAs}
                    onChange={(e) => handleEditChange(e, "sameAs")}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="text"
                    value={editedData.type}
                    onChange={(e) => handleEditChange(e, "type")}
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
                <div className="flex justify-between">
                  <span>
                    <strong>{client.companyName}</strong> <br />
                    📍 {client.streetAddress}, {client.postalCode},{" "}
                    {client.addressLocality} <br />
                    🌐 {client.url} <br />
                    🔗 {client.sameAs} <br />
                    ✉️ {client.email} <br />
                    📞 {client.phoneNumber} <br />
                    🏢 {client.type}
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
