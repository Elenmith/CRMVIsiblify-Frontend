import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

const EventModal = ({ onClose, onSave, userId, date }) => {
  const [event, setEvent] = useState({
    content: "",
    time: "",
    color: "#3498db",
  });

  const handleInputChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("🔍 Aktualny stan event:", event);

    if (!event.content || !event.time) {
      alert("Treść i godzina są wymagane!");
      return;
    }

    const newEvent = {
      user: { id: userId }, // Pobiera ID użytkownika dynamicznie
      date: `2025-02-${String(date).padStart(2, "0")}`, // Formatowanie daty
      time: event.time || "00:00", // Domyślna godzina jeśli pusta
      content: event.content,
      color: event.color,
    };

    console.log("📤 Wysyłane dane:", JSON.stringify(newEvent, null, 2));

    axios
      .post("http://localhost:8080/api/calendar", newEvent)
      .then((res) => {
        console.log("✅ Odpowiedź z API:", res.data);
        onSave(res.data);
      })
      .catch((err) => {
        console.error("❌ Błąd zapisu wydarzenia:", err);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-96">
        <h3 className="text-lg font-bold mb-2">Dodaj wydarzenie</h3>
        <label className="block text-sm font-semibold mt-2">
          Treść wydarzenia
        </label>
        <input
          type="text"
          name="content" // <-- Zmienione z `title`
          placeholder="Wpisz treść wydarzenia"
          className="border p-2 w-full mt-1"
          onChange={handleInputChange}
        />

        <label className="text-lg font-bold mb-2">Godzina:</label>
        <input
          type="time"
          name="time"
          value={event.time}
          onChange={handleInputChange} // Obsługa zmiany przez funkcję handleInputChange
          className="border p-2 w-full"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-gray-300 p-2 rounded" onClick={onClose}>
            Anuluj
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleSave}
          >
            Zapisz
          </button>
        </div>
      </div>
    </div>
  );
};

EventModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
};

export default EventModal;
