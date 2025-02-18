import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PropTypes from "prop-types";

const CalendarDay = ({ date, events = [], onAddEvent }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="border p-2 relative h-24 hover:bg-gray-100 transition"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="flex justify-between">
        <span className="font-bold">{date}</span>
        <button
          className="text-gray-500 hover:text-blue-500 transition"
          onClick={() => onAddEvent(date)}
        >
          <FaPlus />
        </button>
      </div>

      {/* Poprawiona obsługa wyświetlania wielu wydarzeń */}
      {events.length > 0 && (
        <div className="mt-1">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-blue-500 text-white text-xs rounded p-1 mt-1"
            >
              <span className="font-bold">{event.time}</span> - {event.content}
            </div>
          ))}
        </div>
      )}

      {/* Pełne informacje o wydarzeniach po najechaniu */}
      {showDetails && events.length > 0 && (
        <div className="absolute bg-white border p-2 shadow-lg rounded top-8 left-0 w-56">
          {events.map((event) => (
            <div key={event.id} className="mb-2">
              <p className="font-bold">{event.content}</p>
              <p className="text-xs text-gray-600">
                🕒 {event.time || "Brak godziny"}
              </p>
              <p className="text-xs text-gray-600">📅 {event.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CalendarDay.propTypes = {
  date: PropTypes.number.isRequired, // Numer dnia
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ),
  onAddEvent: PropTypes.func.isRequired, // Funkcja do obsługi dodawania wydarzenia
};

export default CalendarDay;
